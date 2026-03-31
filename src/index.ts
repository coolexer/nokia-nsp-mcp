#!/usr/bin/env node
/**
 * Nokia NSP MCP Server
 *
 * Exposes Nokia NSP REST API capabilities via Model Context Protocol:
 *   - Network Inventory  (nsp_inventory_*)
 *   - Fault Management   (nsp_fm_*)
 *   - Service Management (nsp_svc_*)
 *
 * Configuration via environment variables:
 *   NSP_SERVER   - NSP server URL, e.g. https://nsp.example.com
 *   NSP_USERNAME - NSP username
 *   NSP_PASSWORD - NSP password
 *   NSP_SSL_VERIFY - Set to "false" to disable SSL verification (default: true)
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

import { NspClient } from './nsp-client.js';
import { getNetworkInventoryTools, handleNetworkInventoryTool } from './tools/inventory.js';
import { getFaultManagementTools, handleFaultManagementTool } from './tools/fault-management.js';
import { getServiceManagementTools, handleServiceManagementTool } from './tools/service-management.js';

// ── Configuration ─────────────────────────────────────────────────────────────

function getConfig() {
  const server = process.env.NSP_SERVER;
  const username = process.env.NSP_USERNAME;
  const password = process.env.NSP_PASSWORD;
  const sslVerify = process.env.NSP_SSL_VERIFY !== 'false';

  if (!server || !username || !password) {
    console.error('Error: NSP_SERVER, NSP_USERNAME, and NSP_PASSWORD environment variables are required');
    process.exit(1);
  }

  return { server, username, password, sslVerify };
}

// ── All tools ─────────────────────────────────────────────────────────────────

const INVENTORY_TOOL_NAMES = new Set(
  getNetworkInventoryTools().map((t) => t.name)
);
const FM_TOOL_NAMES = new Set(
  getFaultManagementTools().map((t) => t.name)
);
const SVC_TOOL_NAMES = new Set(
  getServiceManagementTools().map((t) => t.name)
);

function getAllTools() {
  return [
    ...getNetworkInventoryTools(),
    ...getFaultManagementTools(),
    ...getServiceManagementTools(),
  ];
}

// ── MCP Server ────────────────────────────────────────────────────────────────

async function main() {
  const config = getConfig();
  const nspClient = new NspClient(config);

  const server = new Server(
    {
      name: 'nokia-nsp-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: getAllTools(),
    };
  });

  // Call tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const toolArgs = (args ?? {}) as Record<string, unknown>;

    try {
      let result: unknown;

      if (INVENTORY_TOOL_NAMES.has(name)) {
        result = await handleNetworkInventoryTool(name, toolArgs, nspClient);
      } else if (FM_TOOL_NAMES.has(name)) {
        result = await handleFaultManagementTool(name, toolArgs, nspClient);
      } else if (SVC_TOOL_NAMES.has(name)) {
        result = await handleServiceManagementTool(name, toolArgs, nspClient);
      } else {
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof McpError) throw error;

      const message = error instanceof Error ? error.message : String(error);

      // Return error as tool result (not an MCP protocol error)
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${message}`,
          },
        ],
        isError: true,
      };
    }
  });

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Nokia NSP MCP Server running on stdio');
  console.error(`Connected to: ${config.server}`);
  console.error(`Total tools: ${getAllTools().length}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
