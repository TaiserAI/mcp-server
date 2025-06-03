import { z } from "zod";
import { executeTool } from "./tool.js";
import { getRpcUrlByName } from "../utils/helpers.js";
import { ToolDefinition } from "../utils/types.js";

const ASYNC_VAULT_ADMIN_IPFS_ID = "QmQBjZebUnxHbF9XUuszNxKH9ZUcuW74vskS3uEPyTtout";

export const fulfillDepositTool: ToolDefinition = {
    name: "async-vault-fulfill-deposit",
    description: "Accepts a pending deposit and swaps it for teller tokens",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Owner wallet address"),
        controller: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Depositor wallet address"),
        amount: z.string().describe("Amount of deposits to swap for teller tokens"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Teller address"),
        chain: z.string().describe("Chain"),
    },
    handler: async ({ pkpEthAddress, controller, amount, vault, chain }) => {
        try {
            let chainRpcUrl = getRpcUrlByName(chain);
            if (!chainRpcUrl) throw new Error(`Chain not found: ${chain}`);

            const result = await executeTool({
                ipfsId: ASYNC_VAULT_ADMIN_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    controller,
                    amount,
                    action: "fulfillDeposit",
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
}

export const fulfillRedeemTool: ToolDefinition = {
    name: "async-vault-fulfill-redeem",
    description: "Accepts a pending redemption and swaps it for teller assets",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Owner wallet address"),
        controller: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Depositor wallet address"),
        amount: z.string().describe("Amount of deposits to swap for teller tokens"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Teller address"),
        chain: z.string().describe("Chain"),
    },
    handler: async ({ pkpEthAddress, controller, amount, vault, chain }) => {
        try {
            let chainRpcUrl = getRpcUrlByName(chain);
            if (!chainRpcUrl) throw new Error(`Chain not found: ${chain}`);

            const result = await executeTool({
                ipfsId: ASYNC_VAULT_ADMIN_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    controller,
                    amount,
                    action: "fulfillRedeem",
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
}

export const takeAssetsTool: ToolDefinition = {
    name: "async-vault-take-assets",
    description: "Takes assets from the teller into the owner wallet",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Owner wallet address"),
        amount: z.string().describe("Amount of deposits to take from the teller"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Teller address"),
        chain: z.string().describe("Chain"),
    },
    handler: async ({ pkpEthAddress, amount, vault, chain }) => {
        try {
            let chainRpcUrl = getRpcUrlByName(chain);
            if (!chainRpcUrl) throw new Error(`Chain not found: ${chain}`);

            const result = await executeTool({
                ipfsId: ASYNC_VAULT_ADMIN_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    controller: "0x0000000000000000000000000000000000000000", // not used
                    amount,
                    action: "takeAssets",
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
}

export const returnAssetsTool: ToolDefinition = {
    name: "async-vault-return-assets",
    description: "Send assets from the owner wallet to the  teller",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Owner wallet address"),
        amount: z.string().describe("Amount to return to the teller"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Teller address"),
        chain: z.string().describe("Chain"),
    },
    handler: async ({ pkpEthAddress, amount, vault, chain }) => {
        try {
            let chainRpcUrl = getRpcUrlByName(chain);
            if (!chainRpcUrl) throw new Error(`Chain not found: ${chain}`);

            const result = await executeTool({
                ipfsId: ASYNC_VAULT_ADMIN_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    controller: "0x0000000000000000000000000000000000000000", // not used
                    amount,
                    action: "returnAssets",
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
}

export const updateInvestedTool: ToolDefinition = {
    name: "async-vault-update-invested",
    description: "Updates the total USD value of the assets currently invested by the owner",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Owner wallet address"),
        amount: z.string().describe("Amount to update in the teller"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Teller address"),
        chain: z.string().describe("Chain"),
    },
    handler: async ({ pkpEthAddress, amount, vault, chain }) => {
        try {
            let chainRpcUrl = getRpcUrlByName(chain);
            if (!chainRpcUrl) throw new Error(`Chain not found: ${chain}`);

            const result = await executeTool({
                ipfsId: ASYNC_VAULT_ADMIN_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    controller: "0x0000000000000000000000000000000000000000", // not used
                    amount,
                    action: "updateInvested",
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
}

export const asyncBalanceTool: ToolDefinition = {
    name: "async-vault-balance",
    description: "Retrieves the a list of owner assets",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Owner wallet address"),
        vault: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Teller address"),
        chain: z.string().describe("Chain"),
    },
    handler: async ({ pkpEthAddress, vault, chain }) => {
        try {
            let chainRpcUrl = getRpcUrlByName(chain);
            if (!chainRpcUrl) throw new Error(`Chain not found: ${chain}`);

            const result = await executeTool({
                ipfsId: ASYNC_VAULT_ADMIN_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    controller: "0x0000000000000000000000000000000000000000", // not used
                    amount: 0,
                    action: "getValues",
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
}
