import { z } from "zod";
import { ToolDefinition, TokenBalance } from "../utils/types.js";

import dotenv from "dotenv";
dotenv.config();

const BALANCE_URL = `https://api.chainbase.online/v1/account/tokens?limit=100&page=1`;
const OPTIONS: RequestInit = {
    method: 'GET',
    cache: 'no-cache',
    headers: {
        accept: 'application/json',
        'x-api-key': process.env.CHAINBASE_PRIVATE_KEY ?? ""
    }
};

const parseData = (jsonData: any, network: string) => {
    const data = jsonData?.data || [];

    return data.map((token: any) => {
        const { name, symbol, balance, decimals, current_usd_price } = token;
        const parsedBalance = parseInt(balance, 16) / Math.pow(10, decimals);

        return {
            name,
            symbol,
            balance: parsedBalance,
            value: current_usd_price,
            network
        };
    });
}

export const allocationsTool: ToolDefinition = {
    name: "get-allocations-by-wallet",
    description: "Get the allocations for a wallet",
    inputSchema: {
        pkpEthAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe("PKP ETH address"),
    },
    handler: async ({ pkpEthAddress }) => {
        try {
            let jsonData;
            let allocations: TokenBalance[] = [];

            let chainId = 1;
            // const mainnetResponse = await fetch(`${BALANCE_URL}&address=${pkpEthAddress}&chain_id=${chainId}`, OPTIONS);
            chainId = 8453;
            const baseResponse = await fetch(`${BALANCE_URL}&address=${pkpEthAddress}&chain_id=${chainId}`, OPTIONS);
            chainId = 42161;
            const arbitrumResponse = await fetch(`${BALANCE_URL}&address=${pkpEthAddress}&chain_id=${chainId}`, OPTIONS);

            // if (mainnetResponse.ok) {
            //     jsonData = await mainnetResponse.json();
            //     allocations.push(...parseData(jsonData, "mainnet"));
            // }

            if (baseResponse.ok) {
                jsonData = await baseResponse.json();
                allocations.push(...parseData(jsonData, "base"));
            }

            if (arbitrumResponse.ok) {
                jsonData = await arbitrumResponse.json();
                allocations.push(...parseData(jsonData, "arbitrum"));
            }

            const total = allocations.reduce((sum, token) => sum + (token.value || 0), 0);

            return {
                content: [{ type: "text", text: `total: ${total}, allocations: ${JSON.stringify(allocations)}` }],
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