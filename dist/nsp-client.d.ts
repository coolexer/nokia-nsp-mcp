/**
 * Nokia NSP REST API Client
 * Handles authentication and all API calls to NSP server
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
    constructor(config: NspConfig);
    private get baseUrl();
    private fetchJson;
    private getInsecureAgent;
    /**
     * Authenticate and get access token using client credentials (basic auth)
     */
    authenticate(): Promise<void>;
    /**
     * Refresh the access token
     */
    refreshAccessToken(): Promise<void>;
    /**
     * Ensure we have a valid token
     */
    private ensureToken;
    /**
     * Make authenticated GET request
     */
    get(path: string, params?: Record<string, string>): Promise<unknown>;
    /**
     * Make authenticated POST request
     */
    post(path: string, body: unknown, params?: Record<string, string>): Promise<unknown>;
    /**
     * Make authenticated PATCH request
     */
    patch(path: string, body: unknown): Promise<unknown>;
    /**
     * Make authenticated DELETE request
     */
    delete(path: string): Promise<unknown>;
    /**
     * Revoke session / logout
     */
    logout(): Promise<void>;
}
//# sourceMappingURL=nsp-client.d.ts.map