/**
 * Nokia NSP REST API Client
 * Handles authentication and all API calls to NSP server
 */

export interface NspConfig {
  server: string;       // e.g. "https://nsp.example.com"
  username: string;
  password: string;
  sslVerify?: boolean;  // default: true
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

  constructor(config: NspConfig) {
    this.config = config;
  }

  private get baseUrl(): string {
    return this.config.server.replace(/\/$/, '');
  }

  private async fetchJson(url: string, options: RequestInit = {}): Promise<unknown> {
    const response = await fetch(url, {
      ...options,
      // @ts-ignore - node-fetch specific option for SSL
      ...(this.config.sslVerify === false ? { agent: await this.getInsecureAgent() } : {}),
    });

    const text = await response.text();
    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}: ${JSON.stringify(body)}`);
    }

    return body;
  }

  private async getInsecureAgent() {
    const https = await import('https');
    return new https.Agent({ rejectUnauthorized: false });
  }

  /**
   * Authenticate and get access token using client credentials (basic auth)
   */
  async authenticate(): Promise<void> {
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

    const data = await response.json() as TokenResponse;
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    // Set expiry with 60s buffer
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  }

  /**
   * Refresh the access token
   */
  async refreshAccessToken(): Promise<void> {
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

    const data = await response.json() as TokenResponse;
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  }

  /**
   * Ensure we have a valid token
   */
  private async ensureToken(): Promise<string> {
    if (!this.accessToken || Date.now() >= this.tokenExpiry) {
      if (this.refreshToken && Date.now() >= this.tokenExpiry) {
        await this.refreshAccessToken();
      } else {
        await this.authenticate();
      }
    }
    return this.accessToken!;
  }

  /**
   * Make authenticated GET request
   */
  async get(path: string, params?: Record<string, string>): Promise<unknown> {
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
  async post(path: string, body: unknown, params?: Record<string, string>): Promise<unknown> {
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
  async patch(path: string, body: unknown): Promise<unknown> {
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
  async delete(path: string): Promise<unknown> {
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
    if (!text) return { success: true };
    try {
      return JSON.parse(text);
    } catch {
      return { success: true, message: text };
    }
  }

  /**
   * Revoke session / logout
   */
  async logout(): Promise<void> {
    if (!this.accessToken) return;
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
    } finally {
      this.accessToken = null;
      this.refreshToken = null;
      this.tokenExpiry = 0;
    }
  }
}
