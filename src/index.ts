import { ToolDefinition } from "./utils/types.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// import { hexToDecimalTool, decimalToHexTool } from "./lit/example-tool.js";
import {
    depositIntoIporVaultTool,
    redeemFromIporVaultTool,
    vaultBalanceTool
} from "./lit/ipor-vault.js";
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

// Register tools for example
// registerTool(hexToDecimalTool);
// registerTool(decimalToHexTool);

// Register tools for IPOR vault
registerTool(depositIntoIporVaultTool);
registerTool(redeemFromIporVaultTool);
registerTool(vaultBalanceTool);

// Register tools for CCTP-USDC
registerTool(sendUSDCTool);
registerTool(receiveUSDCTool);

// Register tools for ERC7540 Admin
registerTool(fulfillDepositTool);
registerTool(fulfillRedeemTool);
registerTool(takeAssetsTool);
registerTool(returnAssetsTool);
registerTool(updateInvestedTool);
registerTool(asyncBalanceTool);

// Register tool for allocations
registerTool(allocationsTool);

// Connect to stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
