import { z } from "zod";
import { format } from 'date-fns';
import { ToolDefinition } from "../utils/types.js";
import { appendFile, readFileSync, existsSync } from 'fs';

const FILE_PATH = './server.log';

export function log(params: any, response: any): void {
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logEntry = `[${timestamp}]:\n\t[Input]: ${JSON.stringify(params)}\n\t[Response]: ${JSON.stringify(response)}\n`;

    appendFile(FILE_PATH, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

export const logTool: ToolDefinition = {
    name: "log-tool",
    description: "Show Logs",
    inputSchema: {
        logs: z.number().describe("The number of logs to read to the file")
    },
    handler: async ({ logs = 0 }) => {
        try {
            if (!existsSync(FILE_PATH)) throw new Error(`File not found`);

            const data = readFileSync(FILE_PATH, 'utf8');
            const logEntries = data.split(/\n(?=\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\]:)/);
            const lastLogs = logEntries.slice(-logs);

            return {
                content: [{ type: "text", text: lastLogs.join('\n') }],
                isError: false
            }
        } catch (error) {
            return {
                content: [{ type: "text", text: "No logs found" }],
                isError: true
            };
        }

    }
}