/**
 * Nokia NSP REST API Client
 * Handles authentication and all API calls to NSP server
 */
export class NspClient {
    config;
    accessToken = null;
    refreshToken = null;
    tokenExpiry = 0;
    constructor(config) {
        this.config = config;
    }
    get baseUrl() {
        return this.config.server.replace(/\/$/, '');
    }
    async fetchJson(url, options = {}) {
        const response = await fetch(url, {
            ...options,
            // @ts-ignore - node-fetch specific option for SSL
            ...(this.config.sslVerify === false ? { agent: await this.getInsecureAgent() } : {}),
        });
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
    async getInsecureAgent() {
        const https = await import('https');
        return new https.Agent({ rejectUnauthorized: false });
    }
    /**
     * Authenticate and get access token using client credentials (basic auth)
     */
    async authenticate() {
        const url = `${this.baseUrl}/rest-gateway/rest/api/v1/auth/token`;
        const credentials = Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`,
            },
            body: JSON.stringify({ grant_type: 'client_credentials' }),
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Authentication failed: HTTP ${response.status} - ${text}`);
        }
        const data = await response.json();
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        // Set expiry with 60s buffer
        this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    }
    /**
     * Refresh the access token
     */
    async refreshAccessToken() {
        if (!this.refreshToken) {
            await this.authenticate();
            return;
        }
        const url = `${this.baseUrl}/rest-gateway/rest/api/v1/auth/token`;
        const credentials = Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`,
            },
            body: JSON.stringify({
                grant_type: 'refresh_token',
                refresh_token: this.refreshToken,
            }),
        });
        if (!response.ok) {
            // Fallback to full auth
            await this.authenticate();
            return;
        }
        const data = await response.json();
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    }
    /**
     * Ensure we have a valid token
     */
    async ensureToken() {
        if (!this.accessToken || Date.now() >= this.tokenExpiry) {
            if (this.refreshToken && Date.now() >= this.tokenExpiry) {
                await this.refreshAccessToken();
            }
            else {
                await this.authenticate();
            }
        }
        return this.accessToken;
    }
    /**
     * Make authenticated GET request
     */
    async get(path, params) {
        const token = await this.ensureToken();
        let url = `${this.baseUrl}${path}`;
        if (params && Object.keys(params).length > 0) {
            const qs = new URLSearchParams(params).toString();
            url += `?${qs}`;
        }
        return this.fetchJson(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    }
    /**
     * Make authenticated POST request
     */
    async post(path, body, params) {
        const token = await this.ensureToken();
        let url = `${this.baseUrl}${path}`;
        if (params && Object.keys(params).length > 0) {
            const qs = new URLSearchParams(params).toString();
            url += `?${qs}`;
        }
        return this.fetchJson(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }
    /**
     * Make authenticated PATCH request
     */
    async patch(path, body) {
        const token = await this.ensureToken();
        return this.fetchJson(`${this.baseUrl}${path}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }
    /**
     * Make authenticated DELETE request
     */
    async delete(path) {
        const token = await this.ensureToken();
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status} ${response.statusText}: ${text}`);
        }
        // DELETE may return empty body
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
    /**
     * Revoke session / logout
     */
    async logout() {
        if (!this.accessToken)
            return;
        try {
            const credentials = Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64');
            await fetch(`${this.baseUrl}/rest-gateway/rest/api/v1/auth/revocation`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/json',
                },
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