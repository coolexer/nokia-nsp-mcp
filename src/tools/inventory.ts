/**
 * Nokia NSP Network Inventory Tools
 * Covers: NEs, shelves, cards, ports, LAGs, fans, power supplies
 * APIs: RESTCONF /restconf/data/nsp-equipment:* and /restconf/operations/nsp-inventory:find
 */

import { NspClient } from '../nsp-client.js';

export function getNetworkInventoryTools() {
  return [
    // ── Network Elements ───────────────────────────────────────────────────
    {
      name: 'nsp_inventory_get_network_elements',
      description:
        'Get all Network Elements (NEs) managed by NSP. Supports depth, fields filter, pagination, and time-range filtering.',
      inputSchema: {
        type: 'object',
        properties: {
          depth: {
            type: 'number',
            description: 'RESTCONF depth parameter (1 = NE only, 2 = include children). Default: 1',
          },
          fields: {
            type: 'string',
            description: 'Comma-separated list of fields to return, e.g. "ne-id;ne-name;type;admin-state"',
          },
          limit: {
            type: 'number',
            description: 'Max number of results to return',
          },
          offset: {
            type: 'number',
            description: 'Pagination offset',
          },
          from: {
            type: 'string',
            description: 'ISO8601 timestamp - return NEs modified after this time, e.g. 2025-01-10T11:09:28.112Z',
          },
          to: {
            type: 'string',
            description: 'ISO8601 timestamp - return NEs modified before this time',
          },
          include_meta: {
            type: 'boolean',
            description: 'Include metadata in response. Default: true',
          },
        },
      },
    },
    {
      name: 'nsp_inventory_get_network_element',
      description: 'Get details of a specific Network Element by its IP address (ne-id).',
      inputSchema: {
        type: 'object',
        required: ['ne_id'],
        properties: {
          ne_id: {
            type: 'string',
            description: 'NE IP address, e.g. "10.10.10.1"',
          },
          depth: {
            type: 'number',
            description: 'RESTCONF depth parameter. Default: 1',
          },
        },
      },
    },
    {
      name: 'nsp_inventory_find',
      description:
        'Advanced inventory search using the nsp-inventory:find operation. Supports xpath-like filters across NEs, cards, ports, shelves, LAGs, etc. Use this for complex queries with multiple filter criteria.',
      inputSchema: {
        type: 'object',
        required: ['xpath', 'fields'],
        properties: {
          xpath: {
            type: 'string',
            description:
              'XPath expression for the resource to search, e.g. "/nsp-equipment:network/network-element" or "/nsp-equipment:network/network-element/hardware-component/card"',
          },
          fields: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of fields to return, e.g. ["ne-id", "ne-name", "type", "admin-state"]',
          },
          filter: {
            type: 'string',
            description:
              'Filter expression, e.g. "ne-id=\'10.10.10.1\'" or "type=\'7750 SR-12\'" or "admin-state=\'unlocked\'"',
          },
          depth: {
            type: 'number',
            description: 'Depth for sub-resources. Default: 1',
          },
          offset: {
            type: 'number',
            description: 'Pagination offset',
          },
          limit: {
            type: 'number',
            description: 'Max number of results',
          },
        },
      },
    },
    // ── Hardware Components ────────────────────────────────────────────────
    {
      name: 'nsp_inventory_get_shelves',
      description: 'Get all shelves across all NEs, or shelves of a specific NE.',
      inputSchema: {
        type: 'object',
        properties: {
          ne_id: {
            type: 'string',
            description: 'Optional: filter by NE IP address. If omitted, returns all shelves.',
          },
        },
      },
    },
    {
      name: 'nsp_inventory_get_cards',
      description: 'Get all cards across all NEs, or cards of a specific NE.',
      inputSchema: {
        type: 'object',
        properties: {
          ne_id: {
            type: 'string',
            description: 'Optional: filter by NE IP address. If omitted, returns all cards.',
          },
          limit: { type: 'number', description: 'Max results' },
          offset: { type: 'number', description: 'Pagination offset' },
        },
      },
    },
    {
      name: 'nsp_inventory_get_ports',
      description: 'Get all ports across all NEs, or ports of a specific NE.',
      inputSchema: {
        type: 'object',
        properties: {
          ne_id: {
            type: 'string',
            description: 'Optional: filter by NE IP address. If omitted, returns all ports.',
          },
          limit: { type: 'number', description: 'Max results' },
          offset: { type: 'number', description: 'Pagination offset' },
        },
      },
    },
    {
      name: 'nsp_inventory_get_port',
      description: 'Get details of a specific port on an NE, including transceiver details.',
      inputSchema: {
        type: 'object',
        required: ['ne_id', 'port_id'],
        properties: {
          ne_id: {
            type: 'string',
            description: 'NE IP address, e.g. "10.10.10.1"',
          },
          port_id: {
            type: 'string',
            description:
              'URL-encoded port ID, e.g. "shelf%3D1%2FcardSlot%3D1%2Fcard%3D1%2Fport%3Dethernet-1%2F1" or raw "shelf=1/cardSlot=1/card=1/port=1/1/1"',
          },
          include_transceiver: {
            type: 'boolean',
            description: 'Include transceiver details. Default: false',
          },
        },
      },
    },
    {
      name: 'nsp_inventory_get_lags',
      description: 'Get all LAGs (Link Aggregation Groups) for a specific NE, optionally with member details.',
      inputSchema: {
        type: 'object',
        required: ['ne_id'],
        properties: {
          ne_id: {
            type: 'string',
            description: 'NE IP address',
          },
          lag_id: {
            type: 'string',
            description: 'Optional: specific LAG ID, e.g. "lag-1"',
          },
          fields: {
            type: 'string',
            description: 'Optional fields filter, e.g. "members"',
          },
        },
      },
    },
    {
      name: 'nsp_inventory_get_fans',
      description: 'Get all fans across all NEs, or fans of a specific NE.',
      inputSchema: {
        type: 'object',
        properties: {
          ne_id: {
            type: 'string',
            description: 'Optional: filter by NE IP address.',
          },
        },
      },
    },
    {
      name: 'nsp_inventory_get_power_supplies',
      description: 'Get all power supplies across all NEs, or power supplies of a specific NE.',
      inputSchema: {
        type: 'object',
        properties: {
          ne_id: {
            type: 'string',
            description: 'Optional: filter by NE IP address.',
          },
        },
      },
    },
  ];
}

export async function handleNetworkInventoryTool(
  name: string,
  args: Record<string, unknown>,
  client: NspClient
): Promise<unknown> {
  switch (name) {
    case 'nsp_inventory_get_network_elements': {
      const params: Record<string, string> = {};
      if (args.depth) params['depth'] = String(args.depth);
      if (args.fields) params['fields'] = String(args.fields);
      if (args.limit) params['limit'] = String(args.limit);
      if (args.offset) params['offset'] = String(args.offset);
      if (args.include_meta === false) params['include-meta'] = 'false';
      if (args.from && args.to) {
        params['time-field'] = 'lastmodifiedtime';
        params['from'] = String(args.from);
        params['to'] = String(args.to);
      }
      // Use stream for full list, or paginated
      const path = '/restconf/data/nsp-equipment:network/network-element';
      if (!args.limit) params['stream'] = '';
      return client.get(path, params);
    }

    case 'nsp_inventory_get_network_element': {
      const neId = args.ne_id as string;
      const params: Record<string, string> = {};
      if (args.depth) params['depth'] = String(args.depth);
      return client.get(
        `/restconf/data/nsp-equipment:network/network-element=${encodeURIComponent(neId)}`,
        params
      );
    }

    case 'nsp_inventory_find': {
      const body: Record<string, unknown> = {
        'nsp-inventory:input': {
          xpath: args.xpath,
          fields: args.fields,
          ...(args.filter ? { filter: args.filter } : {}),
          ...(args.depth ? { depth: args.depth } : {}),
          ...(args.offset !== undefined ? { offset: args.offset } : {}),
          ...(args.limit !== undefined ? { limit: args.limit } : {}),
        },
      };
      return client.post('/restconf/operations/nsp-inventory:find', body);
    }

    case 'nsp_inventory_get_shelves': {
      if (args.ne_id) {
        return client.get(
          `/restconf/data/nsp-equipment:network/network-element=${encodeURIComponent(args.ne_id as string)}/hardware-component/shelf`
        );
      }
      return client.get('/restconf/data/nsp-equipment:network/network-element/hardware-component/shelf', {
        stream: '',
      });
    }

    case 'nsp_inventory_get_cards': {
      const params: Record<string, string> = {};
      if (args.limit) params['limit'] = String(args.limit);
      if (args.offset) params['offset'] = String(args.offset);
      if (args.ne_id) {
        return client.get(
          `/restconf/data/nsp-equipment:network/network-element=${encodeURIComponent(args.ne_id as string)}/hardware-component/card`,
          params
        );
      }
      if (!args.limit) params['stream'] = '';
      return client.get(
        '/restconf/data/nsp-equipment:network/network-element/hardware-component/card',
        params
      );
    }

    case 'nsp_inventory_get_ports': {
      const params: Record<string, string> = {};
      if (args.limit) params['limit'] = String(args.limit);
      if (args.offset) params['offset'] = String(args.offset);
      if (args.ne_id) {
        return client.get(
          `/restconf/data/nsp-equipment:network/network-element=${encodeURIComponent(args.ne_id as string)}/hardware-component/port`,
          params
        );
      }
      if (!args.limit) params['stream'] = '';
      return client.get(
        '/restconf/data/nsp-equipment:network/network-element/hardware-component/port',
        params
      );
    }

    case 'nsp_inventory_get_port': {
      const neId = encodeURIComponent(args.ne_id as string);
      const portId = args.port_id as string;
      // If port_id not already encoded, encode it
      const encodedPort = portId.includes('%') ? portId : encodeURIComponent(portId);
      let path = `/restconf/data/nsp-equipment:network/network-element=${neId}/hardware-component/port=${encodedPort}`;
      if (args.include_transceiver) {
        path += '/transceiver-details';
      }
      return client.get(path);
    }

    case 'nsp_inventory_get_lags': {
      const neId = encodeURIComponent(args.ne_id as string);
      if (args.lag_id) {
        const path = `/restconf/data/nsp-equipment:network/network-element=${neId}/lag=${args.lag_id}`;
        const params: Record<string, string> = {};
        if (args.fields) params['fields'] = String(args.fields);
        return client.get(path, params);
      }
      return client.get(`/restconf/data/nsp-equipment:network/network-element=${neId}/lag`);
    }

    case 'nsp_inventory_get_fans': {
      if (args.ne_id) {
        return client.get(
          `/restconf/data/nsp-equipment:network/network-element=${encodeURIComponent(args.ne_id as string)}/hardware-component/fan`
        );
      }
      return client.get(
        '/restconf/data/nsp-equipment:network/network-element/hardware-component/fan',
        { stream: '' }
      );
    }

    case 'nsp_inventory_get_power_supplies': {
      if (args.ne_id) {
        return client.get(
          `/restconf/data/nsp-equipment:network/network-element=${encodeURIComponent(args.ne_id as string)}/hardware-component/power-supply`
        );
      }
      return client.get(
        '/restconf/data/nsp-equipment:network/network-element/hardware-component/power-supply',
        { stream: '' }
      );
    }

    default:
      throw new Error(`Unknown inventory tool: ${name}`);
  }
}
