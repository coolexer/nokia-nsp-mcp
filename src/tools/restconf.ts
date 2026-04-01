/**
 * Nokia NSP Raw RESTCONF/REST GET tool
 * Allows direct GET requests to any NSP REST/RESTCONF endpoint
 * Useful for exploring unknown schemas, intent structures, etc.
 */

import { NspClient } from '../nsp-client.js';

export function getRestconfTools() {
  return [
    {
      name: 'nsp_restconf_get',
      description:
        'Execute a raw GET request to any NSP REST or RESTCONF endpoint. Use this to explore unknown API paths, retrieve intent schemas, service layer data, or any endpoint not covered by other tools. The path should start with / and include the full API path after the server base URL.',
      inputSchema: {
        type: 'object',
        required: ['path'],
        properties: {
          path: {
            type: 'string',
            description:
              'Full API path starting with /. Examples:\n' +
              '  /restconf/data/nsp-service-intent:intent-base/intent=MyService,ies?depth=10\n' +
              '  /restconf/data/nsp-service:services/service-layer/ies\n' +
              '  /restconf/data/nsp-service-intent-type-catalog:catalog/intent-type-info=ies,2\n' +
              '  /restconf/data/nsp-service-intent:intent-base\n' +
              '  /FaultManagement/rest/api/v2/alarms?alarmFilter=severity%3D\'critical\'',
          },
          params: {
            type: 'object',
            description: 'Optional query parameters as key-value pairs, e.g. {"depth": "5", "fields": "name;admin-state"}',
            additionalProperties: { type: 'string' },
          },
        },
      },
    },
    {
      name: 'nsp_restconf_post',
      description:
        'Execute a raw POST request to any NSP REST or RESTCONF endpoint. Use for operations like nsp-inventory:find with custom xpath, or any other POST-based query.',
      inputSchema: {
        type: 'object',
        required: ['path', 'body'],
        properties: {
          path: {
            type: 'string',
            description: 'Full API path starting with /. Example: /restconf/operations/nsp-inventory:find',
          },
          body: {
            type: 'object',
            description: 'Request body as JSON object',
          },
        },
      },
    },
  ];
}

export async function handleRestconfTool(
  name: string,
  args: Record<string, unknown>,
  client: NspClient
): Promise<unknown> {
  switch (name) {
    case 'nsp_restconf_get': {
      const path = args.path as string;
      const params = (args.params as Record<string, string>) || {};
      return client.get(path, Object.keys(params).length > 0 ? params : undefined);
    }

    case 'nsp_restconf_post': {
      const path = args.path as string;
      const body = args.body as unknown;
      return client.post(path, body);
    }

    default:
      throw new Error(`Unknown restconf tool: ${name}`);
  }
}
