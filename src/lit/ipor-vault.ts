import { z } from "zod";
import { executeTool } from "./tool.js";
import { getRpcUrl } from "../utils/helpers.js";
import { ToolDefinition } from "../utils/types.js";

const IPOR_VAULT_IPFS_ID = "QmYa5LpTvLXHaBxHmGznyDocL6pgrQUcKYFexfjg3UJzkC";

export const depositIntoIporVaultTool: ToolDefinition = {
    name: "deposit-into-ipor-vault",
    description: "Deposits USDC into an IPOR vault",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("PKP ETH address"),
        amount: z.string().describe("Amount to deposit"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Vault to deposit in"),
        network: z.string().describe("Network to use"),
    },
    handler: async ({ pkpEthAddress, amount, vault, network }) => {
        try {
            let networkUrl = getRpcUrl(network);
            if (!networkUrl) throw new Error(`Network not found: ${network}`);

            const result = await executeTool({
                ipfsId: IPOR_VAULT_IPFS_ID,
                toolParams: { pkpEthAddress: pkpEthAddress, action: "deposit", amount, vault, rpcUrl: networkUrl },
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
    name: "redeem-from-ipor-vault",
    description: "Redeems USDC from an IPOR vault",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("PKP ETH address"),
        amount: z.string().describe("Amount to redeem"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Vault to redeem in"),
        network: z.string().describe("Network to use"),
    },
    handler: async ({ pkpEthAddress, amount, vault, network }) => {
        try {
            let networkUrl = getRpcUrl(network);
            if (!networkUrl) throw new Error(`Network not found: ${network}`);

            const result = await executeTool({
                ipfsId: IPOR_VAULT_IPFS_ID,
                toolParams: { pkpEthAddress: pkpEthAddress, action: "redeem", amount, vault, rpcUrl: networkUrl },
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
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("PKP ETH address"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Vault to get balance of"),
        network: z.string().describe("Network to use"),
    },
    handler: async ({ pkpEthAddress, vault, network }) => {
        try {
            let networkUrl = getRpcUrl(network);
            if (!networkUrl) throw new Error(`Network not found: ${network}`);

            const result = await executeTool({
                ipfsId: IPOR_VAULT_IPFS_ID,
                toolParams: { pkpEthAddress: pkpEthAddress, action: "value", amount: 0, vault, rpcUrl: networkUrl },
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