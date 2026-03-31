/**
 * Nokia NSP Fault Management Tools
 * REST API: /FaultManagement/rest/api/v2/
 * Covers: alarms, historical alarms, acknowledgements, squelch, alarm settings
 */
import { NspClient } from '../nsp-client.js';
export declare function getFaultManagementTools(): ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            alarm_filter: {
                type: string;
                description: string;
            };
            include_details: {
                type: string;
                description: string;
            };
            include_root_cause: {
                type: string;
                description: string;
            };
            page_start: {
                type: string;
                description: string;
            };
            page_end: {
                type: string;
                description: string;
            };
            alarm_fdn?: undefined;
            object_fdn?: undefined;
            ack_id?: undefined;
            note?: undefined;
            severity?: undefined;
            fdn?: undefined;
            ne_id?: undefined;
            time_frame?: undefined;
            setting_type?: undefined;
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
            alarm_fdn: {
                type: string;
                description: string;
            };
            alarm_filter?: undefined;
            include_details?: undefined;
            include_root_cause?: undefined;
            page_start?: undefined;
            page_end?: undefined;
            object_fdn?: undefined;
            ack_id?: undefined;
            note?: undefined;
            severity?: undefined;
            fdn?: undefined;
            ne_id?: undefined;
            time_frame?: undefined;
            setting_type?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            include_details: {
                type: string;
                description: string;
            };
            alarm_filter?: undefined;
            include_root_cause?: undefined;
            page_start?: undefined;
            page_end?: undefined;
            alarm_fdn?: undefined;
            object_fdn?: undefined;
            ack_id?: undefined;
            note?: undefined;
            severity?: undefined;
            fdn?: undefined;
            ne_id?: undefined;
            time_frame?: undefined;
            setting_type?: undefined;
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
            object_fdn: {
                type: string;
                description: string;
            };
            alarm_filter?: undefined;
            include_details?: undefined;
            include_root_cause?: undefined;
            page_start?: undefined;
            page_end?: undefined;
            alarm_fdn?: undefined;
            ack_id?: undefined;
            note?: undefined;
            severity?: undefined;
            fdn?: undefined;
            ne_id?: undefined;
            time_frame?: undefined;
            setting_type?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            alarm_fdn: {
                type: string;
                description: string;
            };
            ack_id: {
                type: string;
                description: string;
            };
            alarm_filter?: undefined;
            include_details?: undefined;
            include_root_cause?: undefined;
            page_start?: undefined;
            page_end?: undefined;
            object_fdn?: undefined;
            note?: undefined;
            severity?: undefined;
            fdn?: undefined;
            ne_id?: undefined;
            time_frame?: undefined;
            setting_type?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            alarm_fdn: {
                type: string;
                description: string;
            };
            note: {
                type: string;
                description: string;
            };
            alarm_filter?: undefined;
            include_details?: undefined;
            include_root_cause?: undefined;
            page_start?: undefined;
            page_end?: undefined;
            object_fdn?: undefined;
            ack_id?: undefined;
            severity?: undefined;
            fdn?: undefined;
            ne_id?: undefined;
            time_frame?: undefined;
            setting_type?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            alarm_fdn: {
                type: string;
                description: string;
            };
            severity: {
                type: string;
                enum: string[];
                description: string;
            };
            alarm_filter?: undefined;
            include_details?: undefined;
            include_root_cause?: undefined;
            page_start?: undefined;
            page_end?: undefined;
            object_fdn?: undefined;
            ack_id?: undefined;
            note?: undefined;
            fdn?: undefined;
            ne_id?: undefined;
            time_frame?: undefined;
            setting_type?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            alarm_filter?: undefined;
            include_details?: undefined;
            include_root_cause?: undefined;
            page_start?: undefined;
            page_end?: undefined;
            alarm_fdn?: undefined;
            object_fdn?: undefined;
            ack_id?: undefined;
            note?: undefined;
            severity?: undefined;
            fdn?: undefined;
            ne_id?: undefined;
            time_frame?: undefined;
            setting_type?: undefined;
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
            fdn: {
                type: string;
                description: string;
            };
            alarm_filter?: undefined;
            include_details?: undefined;
            include_root_cause?: undefined;
            page_start?: undefined;
            page_end?: undefined;
            alarm_fdn?: undefined;
            object_fdn?: undefined;
            ack_id?: undefined;
            note?: undefined;
            severity?: undefined;
            ne_id?: undefined;
            time_frame?: undefined;
            setting_type?: undefined;
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
            time_frame: {
                type: string;
                description: string;
            };
            page_start: {
                type: string;
                description: string;
            };
            page_end: {
                type: string;
                description: string;
            };
            alarm_filter?: undefined;
            include_details?: undefined;
            include_root_cause?: undefined;
            alarm_fdn?: undefined;
            object_fdn?: undefined;
            ack_id?: undefined;
            note?: undefined;
            severity?: undefined;
            fdn?: undefined;
            setting_type?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            setting_type: {
                type: string;
                enum: string[];
                description: string;
            };
            alarm_filter?: undefined;
            include_details?: undefined;
            include_root_cause?: undefined;
            page_start?: undefined;
            page_end?: undefined;
            alarm_fdn?: undefined;
            object_fdn?: undefined;
            ack_id?: undefined;
            note?: undefined;
            severity?: undefined;
            fdn?: undefined;
            ne_id?: undefined;
            time_frame?: undefined;
        };
    };
})[];
export declare function handleFaultManagementTool(name: string, args: Record<string, unknown>, client: NspClient): Promise<unknown>;
//# sourceMappingURL=fault-management.d.ts.map