import { z } from "zod";
import { executeTool } from "./tool.js";
import { getRpcUrlByName } from "../utils/helpers.js";
import { ToolDefinition } from "../utils/types.js";

const ASYNC_VAULT_ADMIN_IPFS_ID = "QmQBjZebUnxHbF9XUuszNxKH9ZUcuW74vskS3uEPyTtout";

export const fulfillDepositTool: ToolDefinition = {
    name: "async-vault-fulfill-deposit",
    description: "Fulfills a user's pending deposit into the vault asynchronously.",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("PKP ETH address"),
        controller: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("A user wallet of the system"),
        amount: z.string().describe("Amount of assets or shares to be processed"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("The vault address"),
        network: z.string().describe("Network to use"),
    },
    handler: async ({ pkpEthAddress, controller, amount, vault, network }) => {
        try {
            let networkUrl = getRpcUrlByName(network);
            if (!networkUrl) throw new Error(`Network not found: ${network}`);

            const result = await executeTool({
                ipfsId: ASYNC_VAULT_ADMIN_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    controller,
                    amount,
                    action: "fulfillDeposit",
                    vault,
                    rpcUrl: networkUrl
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
}

export const fulfillRedeemTool: ToolDefinition = {
    name: "async-vault-fulfill-redeem",
    description: "Fulfills a user's pending redemption request from the vault asynchronously.",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("PKP ETH address"),
        controller: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("A user wallet of the system"),
        amount: z.string().describe("Amount of assets or shares to be processed"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("The vault address"),
        network: z.string().describe("Network to use"),
    },
    handler: async ({ pkpEthAddress, controller, amount, vault, network }) => {
        try {
            let networkUrl = getRpcUrlByName(network);
            if (!networkUrl) throw new Error(`Network not found: ${network}`);

            const result = await executeTool({
                ipfsId: ASYNC_VAULT_ADMIN_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    controller,
                    amount,
                    action: "fulfillRedeem",
                    vault,
                    rpcUrl: networkUrl
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
}

export const takeAssetsTool: ToolDefinition = {
    name: "async-vault-take-assets",
    description: "Transfers assets from the vault to the agent wallet for off-chain or cross-chain use.",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("PKP ETH address"),
        amount: z.string().describe("Amount of assets or shares to be processed"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("The vault address"),
        network: z.string().describe("Network to use"),
    },
    handler: async ({ pkpEthAddress, amount, vault, network }) => {
        try {
            let networkUrl = getRpcUrlByName(network);
            if (!networkUrl) throw new Error(`Network not found: ${network}`);

            const result = await executeTool({
                ipfsId: ASYNC_VAULT_ADMIN_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    controller: "0x0000000000000000000000000000000000000000", // not used
                    amount,
                    action: "takeAssets",
                    vault,
                    rpcUrl: networkUrl
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
}

export const returnAssetsTool: ToolDefinition = {
    name: "async-vault-return-assets",
    description: "Returns assets from the agent wallet back to the vault.",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("PKP ETH address"),
        amount: z.string().describe("Amount of assets or shares to be processed"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("The vault address"),
        network: z.string().describe("Network to use"),
    },
    handler: async ({ pkpEthAddress, amount, vault, network }) => {
        try {
            let networkUrl = getRpcUrlByName(network);
            if (!networkUrl) throw new Error(`Network not found: ${network}`);

            const result = await executeTool({
                ipfsId: ASYNC_VAULT_ADMIN_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    controller: "0x0000000000000000000000000000000000000000", // not used
                    amount,
                    action: "returnAssets",
                    vault,
                    rpcUrl: networkUrl
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
}

export const updateInvestedTool: ToolDefinition = {
    name: "async-vault-update-invested",
    description: "Updates the total USD value of the assets currently invested by the agent.",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("PKP ETH address"),
        amount: z.string().describe("Amount of assets or shares to be processed"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("The vault address"),
        network: z.string().describe("Network to use"),
    },
    handler: async ({ pkpEthAddress, amount, vault, network }) => {
        try {
            let networkUrl = getRpcUrlByName(network);
            if (!networkUrl) throw new Error(`Network not found: ${network}`);

            const result = await executeTool({
                ipfsId: ASYNC_VAULT_ADMIN_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    controller: "0x0000000000000000000000000000000000000000", // not used
                    amount,
                    action: "updateInvested",
                    vault,
                    rpcUrl: networkUrl
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
}

export const asyncBalanceTool: ToolDefinition = {
    name: "async-vault-balance",
    description: "Retrieves the current allocation of the vault's assets across chains and agent wallets.",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("PKP ETH address"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("The vault address"),
        network: z.string().describe("Network to use"),
    },
    handler: async ({ pkpEthAddress, vault, network }) => {
        try {
            let networkUrl = getRpcUrlByName(network);
            if (!networkUrl) throw new Error(`Network not found: ${network}`);

            const result = await executeTool({
                ipfsId: ASYNC_VAULT_ADMIN_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    controller: "0x0000000000000000000000000000000000000000", // not used
                    amount: 0,
                    action: "getValues",
                    vault,
                    rpcUrl: networkUrl
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
}
