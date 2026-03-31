/**
 * Nokia NSP Service Management Tools
 * REST API: /ServiceSupervision/rest/api/v1/nspServices/
 * Covers: services, LSPs, tunnels, sites, endpoints, OAM tests
 */

import { NspClient } from '../nsp-client.js';

export function getServiceManagementTools() {
  return [
    // ── Services ───────────────────────────────────────────────────────────
    {
      name: 'nsp_svc_get_services',
      description:
        'Get all services from NSP Service Supervision. Supports filtering by name, description, or other criteria.',
      inputSchema: {
        type: 'object',
        properties: {
          filter: {
            type: 'string',
            description:
              "Filter expression. Examples: \"name='ELINE-001'\", \"description LIKE '%ServiceSup%'\", \"name LIKE '%ELINE%' AND NOT (description LIKE '%test%')\"",
          },
          page_start: { type: 'number', description: 'Pagination start (0-based)' },
          page_size: { type: 'number', description: 'Page size' },
        },
      },
    },
    {
      name: 'nsp_svc_get_service',
      description: 'Get details of a specific service by its FDN.',
      inputSchema: {
        type: 'object',
        required: ['service_fdn'],
        properties: {
          service_fdn: {
            type: 'string',
            description: 'Service FDN, e.g. "fdn:model:service:Service:4978"',
          },
        },
      },
    },
    {
      name: 'nsp_svc_get_service_endpoints',
      description: 'Get all endpoints of a specific service.',
      inputSchema: {
        type: 'object',
        required: ['service_fdn'],
        properties: {
          service_fdn: { type: 'string', description: 'Service FDN' },
          endpoint_fdn: {
            type: 'string',
            description: 'Optional: specific endpoint FDN to retrieve details for',
          },
        },
      },
    },
    {
      name: 'nsp_svc_get_service_lsps',
      description: 'Get all LSPs (Label Switched Paths) associated with a specific service.',
      inputSchema: {
        type: 'object',
        required: ['service_fdn'],
        properties: {
          service_fdn: { type: 'string', description: 'Service FDN' },
        },
      },
    },
    {
      name: 'nsp_svc_get_service_sites',
      description: 'Get all sites of a specific service, or a specific site by FDN.',
      inputSchema: {
        type: 'object',
        required: ['service_fdn'],
        properties: {
          service_fdn: { type: 'string', description: 'Service FDN' },
          site_fdn: {
            type: 'string',
            description: 'Optional: specific site FDN',
          },
        },
      },
    },
    {
      name: 'nsp_svc_get_service_tunnel_bindings',
      description: 'Get tunnel bindings for a specific service, optionally for a specific site.',
      inputSchema: {
        type: 'object',
        required: ['service_fdn'],
        properties: {
          service_fdn: { type: 'string', description: 'Service FDN' },
          site_fdn: {
            type: 'string',
            description: 'Optional: filter by site FDN',
          },
          tunnel_binding_fdn: {
            type: 'string',
            description: 'Optional: specific tunnel binding FDN',
          },
        },
      },
    },
    {
      name: 'nsp_svc_get_service_tunnels',
      description: 'Get all tunnels for a specific service.',
      inputSchema: {
        type: 'object',
        required: ['service_fdn'],
        properties: {
          service_fdn: { type: 'string', description: 'Service FDN' },
        },
      },
    },
    // ── LSPs ───────────────────────────────────────────────────────────────
    {
      name: 'nsp_svc_get_lsps',
      description: 'Get all LSPs managed by NSP.',
      inputSchema: {
        type: 'object',
        properties: {
          page_start: { type: 'number' },
          page_size: { type: 'number' },
        },
      },
    },
    {
      name: 'nsp_svc_get_lsp',
      description: 'Get details of a specific LSP by its FDN.',
      inputSchema: {
        type: 'object',
        required: ['lsp_fdn'],
        properties: {
          lsp_fdn: {
            type: 'string',
            description: 'LSP FDN, e.g. "fdn:model:service:Service:31927"',
          },
        },
      },
    },
    {
      name: 'nsp_svc_get_lsp_services',
      description: 'Get all services associated with a specific LSP.',
      inputSchema: {
        type: 'object',
        required: ['lsp_fdn'],
        properties: {
          lsp_fdn: { type: 'string', description: 'LSP FDN' },
        },
      },
    },
    // ── Tunnels ────────────────────────────────────────────────────────────
    {
      name: 'nsp_svc_get_tunnels',
      description: 'Get all tunnels from NSP.',
      inputSchema: {
        type: 'object',
        properties: {
          page_start: { type: 'number' },
          page_size: { type: 'number' },
        },
      },
    },
    {
      name: 'nsp_svc_get_tunnel',
      description: 'Get details of a specific tunnel by its FDN.',
      inputSchema: {
        type: 'object',
        required: ['tunnel_fdn'],
        properties: {
          tunnel_fdn: {
            type: 'string',
            description: 'Tunnel FDN, e.g. "fdn:model:service:Service:3415"',
          },
        },
      },
    },
    {
      name: 'nsp_svc_get_tunnel_lsps',
      description: 'Get all LSPs associated with a specific tunnel.',
      inputSchema: {
        type: 'object',
        required: ['tunnel_fdn'],
        properties: {
          tunnel_fdn: { type: 'string', description: 'Tunnel FDN' },
        },
      },
    },
    {
      name: 'nsp_svc_get_tunnel_services',
      description: 'Get all services using a specific tunnel.',
      inputSchema: {
        type: 'object',
        required: ['tunnel_fdn'],
        properties: {
          tunnel_fdn: { type: 'string', description: 'Tunnel FDN' },
        },
      },
    },
    // ── OAM Tests ──────────────────────────────────────────────────────────
    {
      name: 'nsp_svc_ping_lsp',
      description: 'Execute a one-time LSP ping test.',
      inputSchema: {
        type: 'object',
        required: ['lsp_id'],
        properties: {
          lsp_id: {
            type: 'string',
            description: 'LSP identifier, e.g. "lsp:from-35.121.20.71-id-1"',
          },
          count: {
            type: 'number',
            description: 'Number of ping packets. Default: 5',
          },
          size: {
            type: 'number',
            description: 'Packet size in bytes. Default: 100',
          },
          timeout: {
            type: 'number',
            description: 'Timeout in seconds. Default: 5',
          },
        },
      },
    },
    {
      name: 'nsp_svc_get_lsp_ping_results',
      description: 'Get results of a previously executed LSP ping test.',
      inputSchema: {
        type: 'object',
        required: ['test_id'],
        properties: {
          test_id: {
            type: 'string',
            description: 'Test ID returned from the ping request',
          },
        },
      },
    },
    {
      name: 'nsp_svc_ping_vccv',
      description: 'Execute a one-time VCCV (Virtual Circuit Connectivity Verification) ping test.',
      inputSchema: {
        type: 'object',
        required: ['service_id'],
        properties: {
          service_id: {
            type: 'string',
            description: 'Service identifier, e.g. "svc-mgr:service-16"',
          },
          count: { type: 'number', description: 'Ping count. Default: 5' },
          timeout: { type: 'number', description: 'Timeout seconds. Default: 5' },
        },
      },
    },
    {
      name: 'nsp_svc_get_vccv_ping_results',
      description: 'Get results of a VCCV ping test.',
      inputSchema: {
        type: 'object',
        required: ['test_id'],
        properties: {
          test_id: { type: 'string', description: 'Test ID' },
        },
      },
    },
    {
      name: 'nsp_svc_get_services_on_lsp',
      description: 'Get all services running over a specific LSP (OAM path).',
      inputSchema: {
        type: 'object',
        required: ['lsp_id'],
        properties: {
          lsp_id: {
            type: 'string',
            description: 'LSP identifier, e.g. "lsp:from-35.121.20.71-id-1"',
          },
        },
      },
    },
    {
      name: 'nsp_svc_get_lsps_on_service',
      description: 'Get all LSPs used by a specific service (OAM path).',
      inputSchema: {
        type: 'object',
        required: ['service_id'],
        properties: {
          service_id: {
            type: 'string',
            description: 'Service identifier, e.g. "svc-mgr:service-16"',
          },
        },
      },
    },
    {
      name: 'nsp_svc_get_sdp_tunnels',
      description: 'Get SDP (Service Distribution Point) tunnels for a specific service.',
      inputSchema: {
        type: 'object',
        required: ['service_id'],
        properties: {
          service_id: {
            type: 'string',
            description: 'Service identifier, e.g. "svc-mgr:service-16"',
          },
        },
      },
    },
  ];
}

export async function handleServiceManagementTool(
  name: string,
  args: Record<string, unknown>,
  client: NspClient
): Promise<unknown> {
  const SVC_BASE = '/ServiceSupervision/rest/api/v1/nspServices';
  const OAM_BASE = '/ServiceSupervision/rest/api/v1/oam';

  switch (name) {
    // ── Services ─────────────────────────────────────────────────────────
    case 'nsp_svc_get_services': {
      const params: Record<string, string> = {};
      if (args.filter) params['filter'] = String(args.filter);
      if (args.page_start !== undefined) params['pageStart'] = String(args.page_start);
      if (args.page_size !== undefined) params['pageSize'] = String(args.page_size);
      return client.get(`${SVC_BASE}/services`, params);
    }

    case 'nsp_svc_get_service': {
      const fdn = encodeURIComponent(args.service_fdn as string);
      return client.get(`${SVC_BASE}/services/${fdn}`);
    }

    case 'nsp_svc_get_service_endpoints': {
      const fdn = encodeURIComponent(args.service_fdn as string);
      if (args.endpoint_fdn) {
        const eFdn = encodeURIComponent(args.endpoint_fdn as string);
        return client.get(`${SVC_BASE}/services/${fdn}/endpoints/${eFdn}`);
      }
      return client.get(`${SVC_BASE}/services/${fdn}/endpoints`);
    }

    case 'nsp_svc_get_service_lsps': {
      const fdn = encodeURIComponent(args.service_fdn as string);
      return client.get(`${SVC_BASE}/services/${fdn}/lsps`);
    }

    case 'nsp_svc_get_service_sites': {
      const fdn = encodeURIComponent(args.service_fdn as string);
      if (args.site_fdn) {
        const sFdn = encodeURIComponent(args.site_fdn as string);
        return client.get(`${SVC_BASE}/services/${fdn}/sites/${sFdn}`);
      }
      return client.get(`${SVC_BASE}/services/${fdn}/sites`);
    }

    case 'nsp_svc_get_service_tunnel_bindings': {
      const fdn = encodeURIComponent(args.service_fdn as string);
      if (args.site_fdn) {
        const sFdn = encodeURIComponent(args.site_fdn as string);
        if (args.tunnel_binding_fdn) {
          const tbFdn = encodeURIComponent(args.tunnel_binding_fdn as string);
          return client.get(`${SVC_BASE}/services/${fdn}/sites/${sFdn}/tunnelBindings/${tbFdn}`);
        }
        return client.get(`${SVC_BASE}/services/${fdn}/sites/${sFdn}/tunnelBindings`);
      }
      if (args.tunnel_binding_fdn) {
        const tbFdn = encodeURIComponent(args.tunnel_binding_fdn as string);
        return client.get(`${SVC_BASE}/services/${fdn}/tunnelBindings/${tbFdn}`);
      }
      return client.get(`${SVC_BASE}/services/${fdn}/tunnelBindings`);
    }

    case 'nsp_svc_get_service_tunnels': {
      const fdn = encodeURIComponent(args.service_fdn as string);
      return client.get(`${SVC_BASE}/services/${fdn}/tunnels`);
    }

    // ── LSPs ─────────────────────────────────────────────────────────────
    case 'nsp_svc_get_lsps': {
      const params: Record<string, string> = {};
      if (args.page_start !== undefined) params['pageStart'] = String(args.page_start);
      if (args.page_size !== undefined) params['pageSize'] = String(args.page_size);
      return client.get(`${SVC_BASE}/lsps`, params);
    }

    case 'nsp_svc_get_lsp': {
      const fdn = encodeURIComponent(args.lsp_fdn as string);
      return client.get(`${SVC_BASE}/lsps/${fdn}`);
    }

    case 'nsp_svc_get_lsp_services': {
      const fdn = encodeURIComponent(args.lsp_fdn as string);
      return client.get(`${SVC_BASE}/lsps/${fdn}/services`);
    }

    // ── Tunnels ──────────────────────────────────────────────────────────
    case 'nsp_svc_get_tunnels': {
      const params: Record<string, string> = {};
      if (args.page_start !== undefined) params['pageStart'] = String(args.page_start);
      if (args.page_size !== undefined) params['pageSize'] = String(args.page_size);
      return client.get(`${SVC_BASE}/tunnels/`, params);
    }

    case 'nsp_svc_get_tunnel': {
      const fdn = encodeURIComponent(args.tunnel_fdn as string);
      return client.get(`${SVC_BASE}/tunnels/${fdn}`);
    }

    case 'nsp_svc_get_tunnel_lsps': {
      const fdn = encodeURIComponent(args.tunnel_fdn as string);
      return client.get(`${SVC_BASE}/tunnels/${fdn}/lsps`);
    }

    case 'nsp_svc_get_tunnel_services': {
      const fdn = encodeURIComponent(args.tunnel_fdn as string);
      return client.get(`${SVC_BASE}/tunnels/${fdn}/services`);
    }

    // ── OAM ──────────────────────────────────────────────────────────────
    case 'nsp_svc_ping_lsp': {
      const body: Record<string, unknown> = {
        lspId: args.lsp_id,
        ...(args.count ? { count: args.count } : {}),
        ...(args.size ? { size: args.size } : {}),
        ...(args.timeout ? { timeout: args.timeout } : {}),
      };
      return client.post(`${OAM_BASE}/ping/lsp/oneTimeTests`, body);
    }

    case 'nsp_svc_get_lsp_ping_results': {
      return client.get(`${OAM_BASE}/ping/lsp/oneTimeTests/${args.test_id}/results`);
    }

    case 'nsp_svc_ping_vccv': {
      const body: Record<string, unknown> = {
        serviceId: args.service_id,
        ...(args.count ? { count: args.count } : {}),
        ...(args.timeout ? { timeout: args.timeout } : {}),
      };
      return client.post(`${OAM_BASE}/ping/vccv/oneTimeTests`, body);
    }

    case 'nsp_svc_get_vccv_ping_results': {
      return client.get(`${OAM_BASE}/ping/vccv/oneTimeTests/${args.test_id}/results`);
    }

    case 'nsp_svc_get_services_on_lsp': {
      const lspId = args.lsp_id as string;
      return client.get(`${OAM_BASE}/lsps/${lspId}/services`);
    }

    case 'nsp_svc_get_lsps_on_service': {
      const svcId = args.service_id as string;
      return client.get(`${OAM_BASE}/services/${svcId}/lsps`);
    }

    case 'nsp_svc_get_sdp_tunnels': {
      const svcId = args.service_id as string;
      return client.get(`${OAM_BASE}/services/${svcId}/sdpTunnels`);
    }

    default:
      throw new Error(`Unknown service management tool: ${name}`);
  }
}
