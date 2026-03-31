/**
 * Nokia NSP Service Management Tools
 * REST API: /ServiceSupervision/rest/api/v1/nspServices/
 * Covers: services, LSPs, tunnels, sites, endpoints, OAM tests
 */
import { NspClient } from '../nsp-client.js';
export declare function getServiceManagementTools(): ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            filter: {
                type: string;
                description: string;
            };
            page_start: {
                type: string;
                description: string;
            };
            page_size: {
                type: string;
                description: string;
            };
            service_fdn?: undefined;
            endpoint_fdn?: undefined;
            site_fdn?: undefined;
            tunnel_binding_fdn?: undefined;
            lsp_fdn?: undefined;
            tunnel_fdn?: undefined;
            lsp_id?: undefined;
            count?: undefined;
            size?: undefined;
            timeout?: undefined;
            test_id?: undefined;
            service_id?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            service_fdn: {
                type: string;
                description: string;
            };
            filter?: undefined;
            page_start?: undefined;
            page_size?: undefined;
            endpoint_fdn?: undefined;
            site_fdn?: undefined;
            tunnel_binding_fdn?: undefined;
            lsp_fdn?: undefined;
            tunnel_fdn?: undefined;
            lsp_id?: undefined;
            count?: undefined;
            size?: undefined;
            timeout?: undefined;
            test_id?: undefined;
            service_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            service_fdn: {
                type: string;
                description: string;
            };
            endpoint_fdn: {
                type: string;
                description: string;
            };
            filter?: undefined;
            page_start?: undefined;
            page_size?: undefined;
            site_fdn?: undefined;
            tunnel_binding_fdn?: undefined;
            lsp_fdn?: undefined;
            tunnel_fdn?: undefined;
            lsp_id?: undefined;
            count?: undefined;
            size?: undefined;
            timeout?: undefined;
            test_id?: undefined;
            service_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            service_fdn: {
                type: string;
                description: string;
            };
            site_fdn: {
                type: string;
                description: string;
            };
            filter?: undefined;
            page_start?: undefined;
            page_size?: undefined;
            endpoint_fdn?: undefined;
            tunnel_binding_fdn?: undefined;
            lsp_fdn?: undefined;
            tunnel_fdn?: undefined;
            lsp_id?: undefined;
            count?: undefined;
            size?: undefined;
            timeout?: undefined;
            test_id?: undefined;
            service_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            service_fdn: {
                type: string;
                description: string;
            };
            site_fdn: {
                type: string;
                description: string;
            };
            tunnel_binding_fdn: {
                type: string;
                description: string;
            };
            filter?: undefined;
            page_start?: undefined;
            page_size?: undefined;
            endpoint_fdn?: undefined;
            lsp_fdn?: undefined;
            tunnel_fdn?: undefined;
            lsp_id?: undefined;
            count?: undefined;
            size?: undefined;
            timeout?: undefined;
            test_id?: undefined;
            service_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            page_start: {
                type: string;
                description?: undefined;
            };
            page_size: {
                type: string;
                description?: undefined;
            };
            filter?: undefined;
            service_fdn?: undefined;
            endpoint_fdn?: undefined;
            site_fdn?: undefined;
            tunnel_binding_fdn?: undefined;
            lsp_fdn?: undefined;
            tunnel_fdn?: undefined;
            lsp_id?: undefined;
            count?: undefined;
            size?: undefined;
            timeout?: undefined;
            test_id?: undefined;
            service_id?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            lsp_fdn: {
                type: string;
                description: string;
            };
            filter?: undefined;
            page_start?: undefined;
            page_size?: undefined;
            service_fdn?: undefined;
            endpoint_fdn?: undefined;
            site_fdn?: undefined;
            tunnel_binding_fdn?: undefined;
            tunnel_fdn?: undefined;
            lsp_id?: undefined;
            count?: undefined;
            size?: undefined;
            timeout?: undefined;
            test_id?: undefined;
            service_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            tunnel_fdn: {
                type: string;
                description: string;
            };
            filter?: undefined;
            page_start?: undefined;
            page_size?: undefined;
            service_fdn?: undefined;
            endpoint_fdn?: undefined;
            site_fdn?: undefined;
            tunnel_binding_fdn?: undefined;
            lsp_fdn?: undefined;
            lsp_id?: undefined;
            count?: undefined;
            size?: undefined;
            timeout?: undefined;
            test_id?: undefined;
            service_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            lsp_id: {
                type: string;
                description: string;
            };
            count: {
                type: string;
                description: string;
            };
            size: {
                type: string;
                description: string;
            };
            timeout: {
                type: string;
                description: string;
            };
            filter?: undefined;
            page_start?: undefined;
            page_size?: undefined;
            service_fdn?: undefined;
            endpoint_fdn?: undefined;
            site_fdn?: undefined;
            tunnel_binding_fdn?: undefined;
            lsp_fdn?: undefined;
            tunnel_fdn?: undefined;
            test_id?: undefined;
            service_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            test_id: {
                type: string;
                description: string;
            };
            filter?: undefined;
            page_start?: undefined;
            page_size?: undefined;
            service_fdn?: undefined;
            endpoint_fdn?: undefined;
            site_fdn?: undefined;
            tunnel_binding_fdn?: undefined;
            lsp_fdn?: undefined;
            tunnel_fdn?: undefined;
            lsp_id?: undefined;
            count?: undefined;
            size?: undefined;
            timeout?: undefined;
            service_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            service_id: {
                type: string;
                description: string;
            };
            count: {
                type: string;
                description: string;
            };
            timeout: {
                type: string;
                description: string;
            };
            filter?: undefined;
            page_start?: undefined;
            page_size?: undefined;
            service_fdn?: undefined;
            endpoint_fdn?: undefined;
            site_fdn?: undefined;
            tunnel_binding_fdn?: undefined;
            lsp_fdn?: undefined;
            tunnel_fdn?: undefined;
            lsp_id?: undefined;
            size?: undefined;
            test_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            lsp_id: {
                type: string;
                description: string;
            };
            filter?: undefined;
            page_start?: undefined;
            page_size?: undefined;
            service_fdn?: undefined;
            endpoint_fdn?: undefined;
            site_fdn?: undefined;
            tunnel_binding_fdn?: undefined;
            lsp_fdn?: undefined;
            tunnel_fdn?: undefined;
            count?: undefined;
            size?: undefined;
            timeout?: undefined;
            test_id?: undefined;
            service_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            service_id: {
                type: string;
                description: string;
            };
            filter?: undefined;
            page_start?: undefined;
            page_size?: undefined;
            service_fdn?: undefined;
            endpoint_fdn?: undefined;
            site_fdn?: undefined;
            tunnel_binding_fdn?: undefined;
            lsp_fdn?: undefined;
            tunnel_fdn?: undefined;
            lsp_id?: undefined;
            count?: undefined;
            size?: undefined;
            timeout?: undefined;
            test_id?: undefined;
        };
    };
})[];
export declare function handleServiceManagementTool(name: string, args: Record<string, unknown>, client: NspClient): Promise<unknown>;
//# sourceMappingURL=service-management.d.ts.map