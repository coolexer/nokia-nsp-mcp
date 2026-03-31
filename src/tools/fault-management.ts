/**
 * Nokia NSP Fault Management Tools
 * REST API: /FaultManagement/rest/api/v2/
 * Covers: alarms, historical alarms, acknowledgements, squelch, alarm settings
 */

import { NspClient } from '../nsp-client.js';

export function getFaultManagementTools() {
  return [
    // ── Active Alarms ──────────────────────────────────────────────────────
    {
      name: 'nsp_fm_get_alarms',
      description:
        'Get active alarms from NSP Fault Management. Supports filtering by severity, NE, alarm name, and other criteria.',
      inputSchema: {
        type: 'object',
        properties: {
          alarm_filter: {
            type: 'string',
            description:
              'SQL-like filter expression. Examples: "severity=\'major\'", "alarmName like \'%LinkDown%\'", "(severity=\'critical\' or severity=\'major\') and impact > 0"',
          },
          include_details: {
            type: 'boolean',
            description: 'If true, fetch full alarm details instead of summary. Default: false',
          },
          include_root_cause: {
            type: 'boolean',
            description: 'Include root cause and impact details (only with include_details=true). Default: false',
          },
          page_start: {
            type: 'number',
            description: 'Pagination start index (0-based)',
          },
          page_end: {
            type: 'number',
            description: 'Pagination end index',
          },
        },
      },
    },
    {
      name: 'nsp_fm_get_alarm',
      description: 'Get details of a specific alarm by its FDN (Fully Distinguished Name).',
      inputSchema: {
        type: 'object',
        required: ['alarm_fdn'],
        properties: {
          alarm_fdn: {
            type: 'string',
            description: 'Alarm FDN, e.g. "fdn:model:fm:Alarm:17852921"',
          },
        },
      },
    },
    {
      name: 'nsp_fm_get_alarm_root_causes',
      description: 'Get root cause alarms (alarms that caused other alarms).',
      inputSchema: {
        type: 'object',
        properties: {
          include_details: {
            type: 'boolean',
            description: 'Include full details. Default: false',
          },
        },
      },
    },
    {
      name: 'nsp_fm_get_alarm_causes',
      description: 'Get the causes (root cause alarms) of a specific alarm.',
      inputSchema: {
        type: 'object',
        required: ['alarm_fdn'],
        properties: {
          alarm_fdn: {
            type: 'string',
            description: 'Alarm FDN, e.g. "fdn:model:fm:Alarm:38772"',
          },
        },
      },
    },
    {
      name: 'nsp_fm_get_alarm_impacts',
      description: 'Get the impacts (affected objects/alarms) of a specific alarm.',
      inputSchema: {
        type: 'object',
        required: ['alarm_fdn'],
        properties: {
          alarm_fdn: {
            type: 'string',
            description: 'Alarm FDN, e.g. "fdn:model:fm:Alarm:38772"',
          },
        },
      },
    },
    {
      name: 'nsp_fm_get_aggregated_alarms',
      description:
        'Get aggregated alarms for a specific object (e.g., a Network Element or Equipment) by its FDN.',
      inputSchema: {
        type: 'object',
        required: ['object_fdn'],
        properties: {
          object_fdn: {
            type: 'string',
            description:
              'Object FDN, e.g. "fdn:model:equipment:NetworkElement:17644559" or "fdn:model:equipment:Equipment:17769693"',
          },
        },
      },
    },
    // ── Alarm Actions ──────────────────────────────────────────────────────
    {
      name: 'nsp_fm_acknowledge_alarm',
      description: 'Acknowledge a specific alarm.',
      inputSchema: {
        type: 'object',
        required: ['alarm_fdn'],
        properties: {
          alarm_fdn: {
            type: 'string',
            description: 'Alarm FDN to acknowledge',
          },
        },
      },
    },
    {
      name: 'nsp_fm_unacknowledge_alarm',
      description: 'Remove acknowledgement from a specific alarm.',
      inputSchema: {
        type: 'object',
        required: ['alarm_fdn', 'ack_id'],
        properties: {
          alarm_fdn: {
            type: 'string',
            description: 'Alarm FDN',
          },
          ack_id: {
            type: 'string',
            description: 'Acknowledgement ID to remove (usually "1")',
          },
        },
      },
    },
    {
      name: 'nsp_fm_add_alarm_note',
      description: 'Add an acknowledgement note/comment to a specific alarm.',
      inputSchema: {
        type: 'object',
        required: ['alarm_fdn', 'note'],
        properties: {
          alarm_fdn: {
            type: 'string',
            description: 'Alarm FDN',
          },
          note: {
            type: 'string',
            description: 'Note text to add to the alarm',
          },
        },
      },
    },
    {
      name: 'nsp_fm_get_alarm_notes',
      description: 'Get all acknowledgement notes for a specific alarm.',
      inputSchema: {
        type: 'object',
        required: ['alarm_fdn'],
        properties: {
          alarm_fdn: {
            type: 'string',
            description: 'Alarm FDN',
          },
        },
      },
    },
    {
      name: 'nsp_fm_clear_alarm',
      description: 'Manually clear an alarm by setting its severity to "cleared".',
      inputSchema: {
        type: 'object',
        required: ['alarm_fdn'],
        properties: {
          alarm_fdn: {
            type: 'string',
            description: 'Alarm FDN to clear',
          },
        },
      },
    },
    {
      name: 'nsp_fm_patch_alarm_severity',
      description: 'Change the severity of a specific alarm.',
      inputSchema: {
        type: 'object',
        required: ['alarm_fdn', 'severity'],
        properties: {
          alarm_fdn: {
            type: 'string',
            description: 'Alarm FDN',
          },
          severity: {
            type: 'string',
            enum: ['critical', 'major', 'minor', 'warning', 'indeterminate', 'cleared'],
            description: 'New severity level',
          },
        },
      },
    },
    {
      name: 'nsp_fm_delete_alarm',
      description: 'Delete a specific alarm.',
      inputSchema: {
        type: 'object',
        required: ['alarm_fdn'],
        properties: {
          alarm_fdn: {
            type: 'string',
            description: 'Alarm FDN to delete',
          },
        },
      },
    },
    // ── Squelch ────────────────────────────────────────────────────────────
    {
      name: 'nsp_fm_get_squelched_entities',
      description: 'Get all squelched entities (entities whose alarms are suppressed).',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    {
      name: 'nsp_fm_squelch_entity',
      description: 'Squelch (suppress alarms for) a specific entity by its FDN.',
      inputSchema: {
        type: 'object',
        required: ['fdn'],
        properties: {
          fdn: {
            type: 'string',
            description: 'Entity FDN to squelch, e.g. "fdn:model:equipment:Equipment:3472"',
          },
        },
      },
    },
    {
      name: 'nsp_fm_unsquelch_entity',
      description: 'Remove squelch (re-enable alarms) for a specific entity.',
      inputSchema: {
        type: 'object',
        required: ['fdn'],
        properties: {
          fdn: {
            type: 'string',
            description: 'Entity FDN to unsquelch, e.g. "fdn:model:equipment:Equipment:3472"',
          },
        },
      },
    },
    // ── Historical Alarms ──────────────────────────────────────────────────
    {
      name: 'nsp_fm_get_historical_alarms',
      description: 'Get historical (cleared/archived) alarms for a specific NE within a time frame.',
      inputSchema: {
        type: 'object',
        required: ['ne_id'],
        properties: {
          ne_id: {
            type: 'string',
            description: 'NE IP address, e.g. "192.168.96.13"',
          },
          time_frame: {
            type: 'string',
            description: 'Time frame like "30d", "7d", "24h". Default: "30d"',
          },
          page_start: {
            type: 'number',
            description: 'Pagination start (0-based)',
          },
          page_end: {
            type: 'number',
            description: 'Pagination end',
          },
        },
      },
    },
    {
      name: 'nsp_fm_get_historical_alarm',
      description: 'Get a specific historical alarm by its FDN.',
      inputSchema: {
        type: 'object',
        required: ['alarm_fdn'],
        properties: {
          alarm_fdn: {
            type: 'string',
            description: 'Historical alarm FDN, e.g. "fdn:model:fm:HistoricalAlarm:17861671"',
          },
        },
      },
    },
    // ── Alarm Settings ─────────────────────────────────────────────────────
    {
      name: 'nsp_fm_get_alarm_settings',
      description:
        'Get alarm management settings: acknowledgement, aging, deletion, historical archive, overflow, or severity settings.',
      inputSchema: {
        type: 'object',
        required: ['setting_type'],
        properties: {
          setting_type: {
            type: 'string',
            enum: [
              'acknowledgement',
              'aging',
              'deletion',
              'historicalArchive',
              'historicalOverflow',
              'overflow',
              'severity',
            ],
            description: 'Type of alarm setting to retrieve',
          },
        },
      },
    },
  ];
}

export async function handleFaultManagementTool(
  name: string,
  args: Record<string, unknown>,
  client: NspClient
): Promise<unknown> {
  const FM_BASE = '/FaultManagement/rest/api/v2';

  const encodeFdn = (fdn: string) => encodeURIComponent(fdn);

  switch (name) {
    case 'nsp_fm_get_alarms': {
      const params: Record<string, string> = {};
      if (args.alarm_filter) {
        // Double-encode as per NSP API spec
        params['alarmFilter'] = encodeURIComponent(String(args.alarm_filter));
      }
      if (args.page_start !== undefined) params['pageStart'] = String(args.page_start);
      if (args.page_end !== undefined) params['pageEnd'] = String(args.page_end);

      if (args.include_details) {
        if (args.include_root_cause) {
          params['includeRootCauseAndImpactDetails'] = 'true';
        }
        return client.get(`${FM_BASE}/alarms/details`, params);
      }
      return client.get(`${FM_BASE}/alarms`, params);
    }

    case 'nsp_fm_get_alarm': {
      const fdn = encodeFdn(args.alarm_fdn as string);
      return client.get(`${FM_BASE}/alarms/${fdn}`);
    }

    case 'nsp_fm_get_alarm_root_causes': {
      if (args.include_details) {
        return client.get(`${FM_BASE}/alarms/rootCauses/details`);
      }
      return client.get(`${FM_BASE}/alarms/rootCauses`);
    }

    case 'nsp_fm_get_alarm_causes': {
      const fdn = encodeFdn(args.alarm_fdn as string);
      return client.get(`${FM_BASE}/alarms/${fdn}/causes`);
    }

    case 'nsp_fm_get_alarm_impacts': {
      const fdn = encodeFdn(args.alarm_fdn as string);
      return client.get(`${FM_BASE}/alarms/${fdn}/impacts`);
    }

    case 'nsp_fm_get_aggregated_alarms': {
      const fdn = encodeFdn(args.object_fdn as string);
      return client.get(`${FM_BASE}/alarmedObjects/${fdn}/aggregatedAlarms`);
    }

    case 'nsp_fm_acknowledge_alarm': {
      const fdn = encodeFdn(args.alarm_fdn as string);
      return client.post(`${FM_BASE}/alarms/${fdn}/acknowledgements`, {});
    }

    case 'nsp_fm_unacknowledge_alarm': {
      const fdn = encodeFdn(args.alarm_fdn as string);
      const ackId = args.ack_id as string;
      return client.delete(`${FM_BASE}/alarms/${fdn}/acknowledgements/${ackId}`);
    }

    case 'nsp_fm_add_alarm_note': {
      const fdn = encodeFdn(args.alarm_fdn as string);
      const note = encodeURIComponent(String(args.note));
      return client.post(`${FM_BASE}/alarms/${fdn}/acknowledgementNotes?ackNote=${note}`, {});
    }

    case 'nsp_fm_get_alarm_notes': {
      const fdn = encodeFdn(args.alarm_fdn as string);
      return client.get(`${FM_BASE}/alarms/${fdn}/acknowledgementNotes`);
    }

    case 'nsp_fm_clear_alarm': {
      const fdn = encodeFdn(args.alarm_fdn as string);
      return client.patch(`${FM_BASE}/alarms/${fdn}`, { severity: 'cleared' });
    }

    case 'nsp_fm_patch_alarm_severity': {
      const fdn = encodeFdn(args.alarm_fdn as string);
      return client.patch(`${FM_BASE}/alarms/${fdn}`, { severity: args.severity });
    }

    case 'nsp_fm_delete_alarm': {
      const fdn = encodeFdn(args.alarm_fdn as string);
      return client.delete(`${FM_BASE}/alarms/${fdn}`);
    }

    case 'nsp_fm_get_squelched_entities': {
      return client.get(`${FM_BASE}/alarms/squelchedEntities`);
    }

    case 'nsp_fm_squelch_entity': {
      return client.post(`${FM_BASE}/alarms/squelchedEntities`, { fdn: args.fdn });
    }

    case 'nsp_fm_unsquelch_entity': {
      const fdn = encodeFdn(args.fdn as string);
      return client.delete(`${FM_BASE}/alarms/squelchedEntities/${fdn}`);
    }

    case 'nsp_fm_get_historical_alarms': {
      const params: Record<string, string> = {
        neId: args.ne_id as string,
        timeFrame: (args.time_frame as string) || '30d',
      };
      if (args.page_start !== undefined) params['pageStart'] = String(args.page_start);
      if (args.page_end !== undefined) params['pageEnd'] = String(args.page_end);
      return client.get(`${FM_BASE}/historicalAlarms/details`, params);
    }

    case 'nsp_fm_get_historical_alarm': {
      const fdn = encodeFdn(args.alarm_fdn as string);
      return client.get(`${FM_BASE}/historicalAlarms/${fdn}`);
    }

    case 'nsp_fm_get_alarm_settings': {
      return client.get(`${FM_BASE}/alarmSettings/${args.setting_type}`);
    }

    default:
      throw new Error(`Unknown fault management tool: ${name}`);
  }
}
