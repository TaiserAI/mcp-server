import { z } from "zod";
import { executeTool } from "./tool.js";
import { getRpcUrlByName } from "../utils/helpers.js";
import { ToolDefinition } from "../utils/types.js";

const IPOR_VAULT_IPFS_ID = "QmYa5LpTvLXHaBxHmGznyDocL6pgrQUcKYFexfjg3UJzkC";

export const depositIntoIporVaultTool: ToolDefinition = {
    name: "deposit-into-4626-vault",
    description: "Deposit into a 4626 vault",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Owner wallet address"),
        amount: z.string().describe("Amount to deposit"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Vault address"),
        chain: z.string().describe("Chain"),
    },
    handler: async ({ pkpEthAddress, amount, vault, chain }) => {
        try {
            let chainRpcUrl = getRpcUrlByName(chain);
            if (!chainRpcUrl) throw new Error(`Chain not found: ${chain}`);

            const result = await executeTool({
                ipfsId: IPOR_VAULT_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    action: "deposit",
                    amount,
                    vault,
                    rpcUrl: chainRpcUrl
                },
            });

            return {
                content: [{ type: "text", text: `${result.response}` }],
                isError: false
            };
        } catch (error: any) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    }
};

export const redeemFromIporVaultTool: ToolDefinition = {
    name: "redeem-from-4626-vault",
    description: "Redeem from a 4626 vault",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Owner wallet address"),
        amount: z.string().describe("Amount to redeem"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Vault address"),
        chain: z.string().describe("Chain"),
    },
    handler: async ({ pkpEthAddress, amount, vault, chain }) => {
        try {
            let chainRpcUrl = getRpcUrlByName(chain);
            if (!chainRpcUrl) throw new Error(`Chain not found: ${chain}`);

            const result = await executeTool({
                ipfsId: IPOR_VAULT_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    action: "redeem",
                    amount,
                    vault,
                    rpcUrl: chainRpcUrl
                },
            });

            return {
                content: [{ type: "text", text: `${result.response}` }],
                isError: false
            };
        } catch (error: any) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    }
};

export const vaultBalanceTool: ToolDefinition = {
    name: "vault-balance",
    description: "Gets the balance of a vault",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Owner wallet address"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Vault address"),
        chain: z.string().describe("Chain"),
    },
    handler: async ({ pkpEthAddress, vault, chain }) => {
        try {
            let chainRpcUrl = getRpcUrlByName(chain);
            if (!chainRpcUrl) throw new Error(`Chain not found: ${chain}`);

            const result = await executeTool({
                ipfsId: IPOR_VAULT_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    action: "value",
                    amount: 1,
                    vault,
                    rpcUrl: chainRpcUrl
                },
            });

            return {
                content: [{ type: "text", text: `${result.response}` }],
                isError: false
            };
        } catch (error: any) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    }
};