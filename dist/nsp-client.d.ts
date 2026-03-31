/**
 * Nokia NSP REST API Client
 * Uses node-fetch for proper SSL verification control (self-signed certs support)
 */
export interface NspConfig {
    server: string;
    username: string;
    password: string;
    sslVerify?: boolean;
}
export declare class NspClient {
    private config;
    private accessToken;
    private refreshToken;
    private tokenExpiry;
    private agent;
    constructor(config: NspConfig);
    private get baseUrl();
    private doFetch;
    private fetchJson;
    authenticate(): Promise<void>;
    refreshAccessToken(): Promise<void>;
    private ensureToken;
    get(path: string, params?: Record<string, string>): Promise<unknown>;
    post(path: string, body: unknown, params?: Record<string, string>): Promise<unknown>;
    patch(path: string, body: unknown): Promise<unknown>;
    delete(path: string): Promise<unknown>;
    logout(): Promise<void>;
}
//# sourceMappingURL=nsp-client.d.ts.map