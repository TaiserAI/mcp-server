import { ToolDefinition } from "./utils/types.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { logTool } from "./logs/logger.js";
// import { hexToDecimalTool, decimalToHexTool } from "./lit/example-tool.js";
import {
    depositIntoIporVaultTool,
    redeemFromIporVaultTool,
    vaultBalanceTool
} from "./lit/ipor-vault.js";

const server = new McpServer({ name: "mcp-server", version: "1.0.0" });

// Function to register a tool
function registerTool(tool: ToolDefinition) {
    server.tool(
        tool.name,
        tool.description,
        tool.inputSchema,
        async (extra: any) => {
            const result = await tool.handler(extra);
            return {
                content: result.content.map(item => ({
                    ...item,
                    type: "text" as const
                })),
                isError: result.isError
            };
        }
    );
}

// Register tools for logger
registerTool(logTool);

// Register tools for example
// registerTool(hexToDecimalTool);
// registerTool(decimalToHexTool);

// Register tools for IPOR vault
registerTool(depositIntoIporVaultTool);
registerTool(redeemFromIporVaultTool);
registerTool(vaultBalanceTool);


// Connect to stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
