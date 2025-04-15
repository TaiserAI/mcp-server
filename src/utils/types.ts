export type ToolDefinition = {
    name: string;
    description: string;
    inputSchema: any;
    handler: (params: any) => Promise<{
        content: { type: string; text: string }[];
        isError: boolean;
    }>;
};
