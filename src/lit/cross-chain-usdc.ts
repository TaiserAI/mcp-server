import { z } from "zod";
import { executeTool } from "./tool.js";
import { ToolDefinition } from "../utils/types.js";
import { getRpcUrlByName, getChainIDByNetwork } from "../utils/helpers.js";

const CCTP_USDC_IPFS_ID = "Qmf38LoU2S7HZPsoKsmgBE1kj9ENN6sxVSkH2i1q9sTBTU";

export const sendUSDCTool: ToolDefinition = {
    name: "send-usdc-cross-chain",
    description: "Send USDC cross-chain using CCTP",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Owner wallet address"),
        amount: z.string().describe("Amount to send"),
        fromChain: z.string().describe("Source chain"),
        toChain: z.string().describe("Destination chain"),
    },
    handler: async ({ pkpEthAddress, amount, fromChain, toChain }) => {
        try {
            let networkUrl = getRpcUrlByName(fromChain.replaceAll("-", " "));
            if (!networkUrl) throw new Error(`Network not found: ${fromChain}`);
            
            let toChainID = getChainIDByNetwork(toChain.replaceAll("-", " "));
            if(!toChainID) throw new Error(`Network not found: ${toChain}`);

            const result = await executeTool({
                ipfsId: CCTP_USDC_IPFS_ID,
                toolParams: {
                    pkpEthAddress,
                    action: "send",
                    opChainId: toChainID,
                    amount,
                    burnTx: "",
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

export const receiveUSDCTool: ToolDefinition = {
    name: "receive-usdc-cross-chain",
    description: "Receive USDC cross-chain using CCTP",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("Owner wallet address"),
        burnTx: z.string()
            .regex(/^(0x[a-fA-F0-9]{64}|)$/, 'Must be a valid Ethereum transaction hash (0x followed by 64 hexadecimal characters)')
            .describe("Burn transaction hash from source chain"),
        fromChain: z.string().describe("Source chain"),
        toChain: z.string().describe("Destination chain"),
    },
    handler: async ({ pkpEthAddress, burnTx, fromChain, toChain }) => {
        try {
            let networkUrl = getRpcUrlByName(toChain.replaceAll("-", " "));
            if (!networkUrl) throw new Error(`Network not found: ${toChain}`);
            
            let fromChainID = getChainIDByNetwork(fromChain.replaceAll("-", " "));
            if(!fromChainID) throw new Error(`Network not found: ${fromChain}`);

            const result = await executeTool({
                ipfsId: CCTP_USDC_IPFS_ID,
                toolParams: {
                    pkpEthAddress: pkpEthAddress,
                    action: "receive",
                    opChainId: fromChainID,
                    amount: 1,
                    burnTx,
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