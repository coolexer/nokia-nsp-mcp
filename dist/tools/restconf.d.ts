/**
 * Nokia NSP Raw RESTCONF/REST GET tool
 * Allows direct GET requests to any NSP REST/RESTCONF endpoint
 * Useful for exploring unknown schemas, intent structures, etc.
 */
import { NspClient } from '../nsp-client.js';
export declare function getRestconfTools(): ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            path: {
                type: string;
                description: string;
            };
            params: {
                type: string;
                description: string;
                additionalProperties: {
                    type: string;
                };
            };
            body?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            path: {
                type: string;
                description: string;
            };
            body: {
                type: string;
                description: string;
            };
            params?: undefined;
        };
    };
})[];
export declare function handleRestconfTool(name: string, args: Record<string, unknown>, client: NspClient): Promise<unknown>;
//# sourceMappingURL=restconf.d.ts.map