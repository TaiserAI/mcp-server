export type ToolDefinition = {
    name: string;
    description: string;
    inputSchema: any;
    handler: (params: any) => Promise<{
        content: { type: string; text: string }[];
        isError: boolean;
    }>;
};

export type TokenBalance = {
  name: string;
  symbol: string;
  balance: number;
  value: number;
  network: string;
};