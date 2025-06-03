import { config } from "./utils/ai-config.js";
import { Logger } from "./utils/logger.js";

import { ToolDefinition } from "./utils/types.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { hexToDecimalTool, decimalToHexTool } from "./lit/example-tool.js";

import {
    depositIntoIporVaultTool,
    redeemFromIporVaultTool,
    vaultBalanceTool
} from "./lit/erc4626-vault.js";
import {
    sendUSDCTool,
    receiveUSDCTool
} from "./lit/cross-chain-usdc.js";
import {
    fulfillDepositTool,
    fulfillRedeemTool,
    takeAssetsTool,
    returnAssetsTool,
    updateInvestedTool,
    asyncBalanceTool
} from "./lit/async-vault-admin.js";
import { allocationsTool } from "./lit/allocations.js"

const server = new McpServer({ name: "Wallet-mcp-server", version: "1.0.0" });
Logger.init();

// Function to register a tool
function registerTool(tool: ToolDefinition) {
    server.tool(
        tool.name,
        tool.description,
        tool.inputSchema,
        async (extra: any) => {
            Logger.logToolCall(tool.name, extra);
            let result;
            try {
                result = await tool.handler(extra);
            } catch (err) {
                Logger.logToolResponse(tool.name, { error: err instanceof Error ? err.message : String(err) });
                throw err;
            }
            Logger.logToolResponse(tool.name, result);
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

// Map of all available tool definitions
const allTools: Record<string, ToolDefinition> = {
    depositIntoIporVaultTool,
    redeemFromIporVaultTool,
    vaultBalanceTool,
    sendUSDCTool,
    receiveUSDCTool,
    fulfillDepositTool,
    fulfillRedeemTool,
    takeAssetsTool,
    returnAssetsTool,
    updateInvestedTool,
    asyncBalanceTool,
    allocationsTool,
    // hexToDecimalTool,
    // decimalToHexTool,
};

// Register only the tools listed in the config
for (const toolName of config.tools) {
    const tool = allTools[toolName];
    if (tool) {
        registerTool(tool);
    } else {
        console.warn(`Tool "${toolName}" not found in available tool definitions.`);
    }
}

// Connect to stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
