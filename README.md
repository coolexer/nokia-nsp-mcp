# Nokia NSP MCP Server

Model Context Protocol (MCP) server for Nokia Network Services Platform (NSP) REST API.

Gives Claude and other MCP clients direct access to NSP for network inventory queries, fault management, and service monitoring.

## Covered APIs

| Module | Tools | Description |
|--------|-------|-------------|
| **Network Inventory** | `nsp_inventory_*` | NEs, shelves, cards, ports, LAGs, fans, power supplies |
| **Fault Management** | `nsp_fm_*` | Active/historical alarms, acknowledgements, squelch, settings |
| **Service Management** | `nsp_svc_*` | Services, LSPs, tunnels, endpoints, OAM ping tests |

## Installation

```bash
npm install
npm run build
```

## Configuration

Set environment variables before running:

```bash
export NSP_SERVER=https://nsp.example.com
export NSP_USERNAME=admin
export NSP_PASSWORD=your-password
export NSP_SSL_VERIFY=false   # optional, set to false for self-signed certs
```

## Usage with Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "nokia-nsp": {
      "command": "node",
      "args": ["/path/to/nokia-nsp-mcp/dist/index.js"],
      "env": {
        "NSP_SERVER": "https://nsp.example.com",
        "NSP_USERNAME": "admin",
        "NSP_PASSWORD": "your-password",
        "NSP_SSL_VERIFY": "false"
      }
    }
  }
}
```

## Usage with Claude Code / MCP CLI

```bash
NSP_SERVER=https://nsp.example.com \
NSP_USERNAME=admin \
NSP_PASSWORD=your-password \
node dist/index.js
```

## Tool Reference

### Network Inventory

| Tool | Description |
|------|-------------|
| `nsp_inventory_get_network_elements` | List all NEs with optional depth, fields, pagination, time filter |
| `nsp_inventory_get_network_element` | Get specific NE by IP |
| `nsp_inventory_find` | Advanced search with xpath and filter expressions |
| `nsp_inventory_get_shelves` | Get shelves (all or per NE) |
| `nsp_inventory_get_cards` | Get cards (all or per NE) |
| `nsp_inventory_get_ports` | Get ports (all or per NE) |
| `nsp_inventory_get_port` | Get specific port with optional transceiver details |
| `nsp_inventory_get_lags` | Get LAGs for an NE |
| `nsp_inventory_get_fans` | Get fans (all or per NE) |
| `nsp_inventory_get_power_supplies` | Get PSUs (all or per NE) |

### Fault Management

| Tool | Description |
|------|-------------|
| `nsp_fm_get_alarms` | List active alarms with filter support |
| `nsp_fm_get_alarm` | Get specific alarm by FDN |
| `nsp_fm_get_alarm_root_causes` | Get root cause alarms |
| `nsp_fm_get_alarm_causes` | Get causes of a specific alarm |
| `nsp_fm_get_alarm_impacts` | Get impacts of a specific alarm |
| `nsp_fm_get_aggregated_alarms` | Get alarms aggregated for an object |
| `nsp_fm_acknowledge_alarm` | Acknowledge an alarm |
| `nsp_fm_unacknowledge_alarm` | Remove acknowledgement |
| `nsp_fm_add_alarm_note` | Add note to alarm |
| `nsp_fm_get_alarm_notes` | Get alarm notes |
| `nsp_fm_clear_alarm` | Manually clear an alarm |
| `nsp_fm_patch_alarm_severity` | Change alarm severity |
| `nsp_fm_delete_alarm` | Delete an alarm |
| `nsp_fm_get_squelched_entities` | List squelched entities |
| `nsp_fm_squelch_entity` | Squelch entity (suppress alarms) |
| `nsp_fm_unsquelch_entity` | Remove squelch |
| `nsp_fm_get_historical_alarms` | Get historical alarms by NE and time frame |
| `nsp_fm_get_historical_alarm` | Get specific historical alarm |
| `nsp_fm_get_alarm_settings` | Get alarm settings (aging, deletion, etc.) |

### Service Management

| Tool | Description |
|------|-------------|
| `nsp_svc_get_services` | List services with filter support |
| `nsp_svc_get_service` | Get specific service by FDN |
| `nsp_svc_get_service_endpoints` | Get service endpoints |
| `nsp_svc_get_service_lsps` | Get LSPs on a service |
| `nsp_svc_get_service_sites` | Get service sites |
| `nsp_svc_get_service_tunnel_bindings` | Get tunnel bindings |
| `nsp_svc_get_service_tunnels` | Get tunnels for service |
| `nsp_svc_get_lsps` | List all LSPs |
| `nsp_svc_get_lsp` | Get specific LSP |
| `nsp_svc_get_lsp_services` | Get services on an LSP |
| `nsp_svc_get_tunnels` | List all tunnels |
| `nsp_svc_get_tunnel` | Get specific tunnel |
| `nsp_svc_get_tunnel_lsps` | Get LSPs in a tunnel |
| `nsp_svc_get_tunnel_services` | Get services in a tunnel |
| `nsp_svc_ping_lsp` | Execute LSP ping test |
| `nsp_svc_get_lsp_ping_results` | Get LSP ping results |
| `nsp_svc_ping_vccv` | Execute VCCV ping test |
| `nsp_svc_get_vccv_ping_results` | Get VCCV ping results |
| `nsp_svc_get_services_on_lsp` | Get services on an LSP (OAM) |
| `nsp_svc_get_lsps_on_service` | Get LSPs for a service (OAM) |
| `nsp_svc_get_sdp_tunnels` | Get SDP tunnels for service |

## Authentication

Uses NSP client credentials flow:
1. POST to `/rest-gateway/rest/api/v1/auth/token` with Basic auth and `grant_type=client_credentials`
2. Bearer token auto-refreshed before expiry
3. Fallback to full re-authentication if refresh fails

## NSP Version

Tested with NSP 25.11. API paths follow NSP RESTCONF (`/restconf/data/`, `/restconf/operations/`) and REST (`/FaultManagement/`, `/ServiceSupervision/`) conventions.

## License

MIT
