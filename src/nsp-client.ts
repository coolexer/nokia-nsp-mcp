/**
 * Nokia NSP REST API Client
 * Uses node-fetch for proper SSL verification control (self-signed certs support)
 */

import fetch, { type RequestInit, type Response } from 'node-fetch';
import https from 'https';

export interface NspConfig {
  server: string;
  username: string;
  password: string;
  sslVerify?: boolean;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export class NspClient {
  private config: NspConfig;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiry: number = 0;
  private agent: https.Agent;

  constructor(config: NspConfig) {
    this.config = config;
    this.agent = new https.Agent({
      rejectUnauthorized: config.sslVerify !== false,
    });
  }

  private get baseUrl(): string {
    return this.config.server.replace(/\/$/, '');
  }

  private async doFetch(url: string, options: RequestInit = {}): Promise<Response> {
    return fetch(url, { ...options, agent: this.agent } as RequestInit);
  }

  private async fetchJson(url: string, options: RequestInit = {}): Promise<unknown> {
    const response = await this.doFetch(url, options);
    const text = await response.text();
    let body: unknown;
    try { body = JSON.parse(text); } catch { body = text; }
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}: ${JSON.stringify(body)}`);
    }
    return body;
  }

  async authenticate(): Promise<void> {
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
    const data = await response.json() as TokenResponse;
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  }

  async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) { await this.authenticate(); return; }
    const url = `${this.baseUrl}/rest-gateway/rest/api/v1/auth/token`;
    const credentials = Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64');
    const response = await this.doFetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${credentials}` },
      body: JSON.stringify({ grant_type: 'refresh_token', refresh_token: this.refreshToken }),
    });
    if (!response.ok) { await this.authenticate(); return; }
    const data = await response.json() as TokenResponse;
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  }

  private async ensureToken(): Promise<string> {
    if (!this.accessToken || Date.now() >= this.tokenExpiry) {
      if (this.refreshToken && this.accessToken) {
        await this.refreshAccessToken();
      } else {
        await this.authenticate();
      }
    }
    return this.accessToken!;
  }

  async get(path: string, params?: Record<string, string>): Promise<unknown> {
    const token = await this.ensureToken();
    let url = `${this.baseUrl}${path}`;
    if (params && Object.keys(params).length > 0) {
      const filtered = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== ''));
      const hasStream = Object.values(params).some(v => v === '');
      let qs = new URLSearchParams(filtered).toString();
      if (hasStream) qs = qs ? `${qs}&stream` : 'stream';
      if (qs) url += `?${qs}`;
    }
    return this.fetchJson(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
    });
  }

  async post(path: string, body: unknown, params?: Record<string, string>): Promise<unknown> {
    const token = await this.ensureToken();
    let url = `${this.baseUrl}${path}`;
    if (params && Object.keys(params).length > 0) url += `?${new URLSearchParams(params).toString()}`;
    return this.fetchJson(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  async patch(path: string, body: unknown): Promise<unknown> {
    const token = await this.ensureToken();
    return this.fetchJson(`${this.baseUrl}${path}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  async delete(path: string): Promise<unknown> {
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
    if (!text) return { success: true };
    try { return JSON.parse(text); } catch { return { success: true, message: text }; }
  }

  async logout(): Promise<void> {
    if (!this.accessToken) return;
    try {
      const credentials = Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64');
      await this.doFetch(`${this.baseUrl}/rest-gateway/rest/api/v1/auth/revocation`, {
        method: 'POST',
        headers: { 'Authorization': `Basic ${credentials}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: this.accessToken }),
      });
    } finally {
      this.accessToken = null;
      this.refreshToken = null;
      this.tokenExpiry = 0;
    }
  }
}
