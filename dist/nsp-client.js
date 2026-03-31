/**
 * Nokia NSP REST API Client
 * Uses node-fetch for proper SSL verification control (self-signed certs support)
 */
import fetch from 'node-fetch';
import https from 'https';
export class NspClient {
    config;
    accessToken = null;
    refreshToken = null;
    tokenExpiry = 0;
    agent;
    constructor(config) {
        this.config = config;
        this.agent = new https.Agent({
            rejectUnauthorized: config.sslVerify !== false,
        });
    }
    get baseUrl() {
        return this.config.server.replace(/\/$/, '');
    }
    async doFetch(url, options = {}) {
        return fetch(url, { ...options, agent: this.agent });
    }
    async fetchJson(url, options = {}) {
        const response = await this.doFetch(url, options);
        const text = await response.text();
        let body;
        try {
            body = JSON.parse(text);
        }
        catch {
            body = text;
        }
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}: ${JSON.stringify(body)}`);
        }
        return body;
    }
    async authenticate() {
        const url = `${this.baseUrl}/rest-gateway/rest/api/v1/auth/token`;
        const credentials = Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64');
        const response = await this.doFetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${credentials}` },
            body: JSON.stringify({ grant_type: 'client_credentials' }),
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Authentication failed: HTTP ${response.status} - ${text}`);
        }
        const data = await response.json();
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    }
    async refreshAccessToken() {
        if (!this.refreshToken) {
            await this.authenticate();
            return;
        }
        const url = `${this.baseUrl}/rest-gateway/rest/api/v1/auth/token`;
        const credentials = Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64');
        const response = await this.doFetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${credentials}` },
            body: JSON.stringify({ grant_type: 'refresh_token', refresh_token: this.refreshToken }),
        });
        if (!response.ok) {
            await this.authenticate();
            return;
        }
        const data = await response.json();
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    }
    async ensureToken() {
        if (!this.accessToken || Date.now() >= this.tokenExpiry) {
            if (this.refreshToken && this.accessToken) {
                await this.refreshAccessToken();
            }
            else {
                await this.authenticate();
            }
        }
        return this.accessToken;
    }
    async get(path, params) {
        const token = await this.ensureToken();
        let url = `${this.baseUrl}${path}`;
        if (params && Object.keys(params).length > 0) {
            const filtered = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== ''));
            const hasStream = Object.values(params).some(v => v === '');
            let qs = new URLSearchParams(filtered).toString();
            if (hasStream)
                qs = qs ? `${qs}&stream` : 'stream';
            if (qs)
                url += `?${qs}`;
        }
        return this.fetchJson(url, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        });
    }
    async post(path, body, params) {
        const token = await this.ensureToken();
        let url = `${this.baseUrl}${path}`;
        if (params && Object.keys(params).length > 0)
            url += `?${new URLSearchParams(params).toString()}`;
        return this.fetchJson(url, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body),
        });
    }
    async patch(path, body) {
        const token = await this.ensureToken();
        return this.fetchJson(`${this.baseUrl}${path}`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body),
        });
    }
    async delete(path) {
        const token = await this.ensureToken();
        const response = await this.doFetch(`${this.baseUrl}${path}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status} ${response.statusText}: ${text}`);
        }
        const text = await response.text();
        if (!text)
            return { success: true };
        try {
            return JSON.parse(text);
        }
        catch {
            return { success: true, message: text };
        }
    }
    async logout() {
        if (!this.accessToken)
            return;
        try {
            const credentials = Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64');
            await this.doFetch(`${this.baseUrl}/rest-gateway/rest/api/v1/auth/revocation`, {
                method: 'POST',
                headers: { 'Authorization': `Basic ${credentials}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: this.accessToken }),
            });
        }
        finally {
            this.accessToken = null;
            this.refreshToken = null;
            this.tokenExpiry = 0;
        }
    }
}
//# sourceMappingURL=nsp-client.js.map