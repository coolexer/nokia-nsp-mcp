/**
 * Nokia NSP Network Inventory Tools
 * Covers: NEs, shelves, cards, ports, LAGs, fans, power supplies
 * APIs: RESTCONF /restconf/data/nsp-equipment:* and /restconf/operations/nsp-inventory:find
 */
import { NspClient } from '../nsp-client.js';
export declare function getNetworkInventoryTools(): ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            depth: {
                type: string;
                description: string;
            };
            fields: {
                type: string;
                description: string;
                items?: undefined;
            };
            limit: {
                type: string;
                description: string;
            };
            offset: {
                type: string;
                description: string;
            };
            from: {
                type: string;
                description: string;
            };
            to: {
                type: string;
                description: string;
            };
            include_meta: {
                type: string;
                description: string;
            };
            ne_id?: undefined;
            xpath?: undefined;
            filter?: undefined;
            port_id?: undefined;
            include_transceiver?: undefined;
            lag_id?: undefined;
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
            ne_id: {
                type: string;
                description: string;
            };
            depth: {
                type: string;
                description: string;
            };
            fields?: undefined;
            limit?: undefined;
            offset?: undefined;
            from?: undefined;
            to?: undefined;
            include_meta?: undefined;
            xpath?: undefined;
            filter?: undefined;
            port_id?: undefined;
            include_transceiver?: undefined;
            lag_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            xpath: {
                type: string;
                description: string;
            };
            fields: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            filter: {
                type: string;
                description: string;
            };
            depth: {
                type: string;
                description: string;
            };
            offset: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            from?: undefined;
            to?: undefined;
            include_meta?: undefined;
            ne_id?: undefined;
            port_id?: undefined;
            include_transceiver?: undefined;
            lag_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            ne_id: {
                type: string;
                description: string;
            };
            depth?: undefined;
            fields?: undefined;
            limit?: undefined;
            offset?: undefined;
            from?: undefined;
            to?: undefined;
            include_meta?: undefined;
            xpath?: undefined;
            filter?: undefined;
            port_id?: undefined;
            include_transceiver?: undefined;
            lag_id?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            ne_id: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            offset: {
                type: string;
                description: string;
            };
            depth?: undefined;
            fields?: undefined;
            from?: undefined;
            to?: undefined;
            include_meta?: undefined;
            xpath?: undefined;
            filter?: undefined;
            port_id?: undefined;
            include_transceiver?: undefined;
            lag_id?: undefined;
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
            ne_id: {
                type: string;
                description: string;
            };
            port_id: {
                type: string;
                description: string;
            };
            include_transceiver: {
                type: string;
                description: string;
            };
            depth?: undefined;
            fields?: undefined;
            limit?: undefined;
            offset?: undefined;
            from?: undefined;
            to?: undefined;
            include_meta?: undefined;
            xpath?: undefined;
            filter?: undefined;
            lag_id?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            ne_id: {
                type: string;
                description: string;
            };
            lag_id: {
                type: string;
                description: string;
            };
            fields: {
                type: string;
                description: string;
                items?: undefined;
            };
            depth?: undefined;
            limit?: undefined;
            offset?: undefined;
            from?: undefined;
            to?: undefined;
            include_meta?: undefined;
            xpath?: undefined;
            filter?: undefined;
            port_id?: undefined;
            include_transceiver?: undefined;
        };
    };
})[];
export declare function handleNetworkInventoryTool(name: string, args: Record<string, unknown>, client: NspClient): Promise<unknown>;
//# sourceMappingURL=inventory.d.ts.map