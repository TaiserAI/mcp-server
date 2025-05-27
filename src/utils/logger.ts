import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_DIR = path.resolve(__dirname, "../../logs");
const LOG_FILE = path.join(LOG_DIR, "mcp-tools.log");

function ensureLogDir() {
    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR, { recursive: true });
    }
}

export class Logger {
    static init() {
        try {
            ensureLogDir();
            if (!fs.existsSync(LOG_FILE)) {
                fs.writeFileSync(LOG_FILE, "");
            }
        } catch (err) {
            console.error("Error initializing logger:", err);
        }
    }

    static log(message: string) {
        ensureLogDir();
        const timestamp = new Date().toISOString();
        fs.appendFileSync(LOG_FILE, `[${timestamp}] ${message}\n`);
    }

    static safeStringify(obj: any) {
        try {
            return JSON.stringify(obj);
        } catch (e) {
            return "[Unserializable input]";
        }
    }

    static logToolCall(toolName: string, input: any) {
        this.log(`CALL: ${toolName} | input: ${this.safeStringify(input)}`);
    }

    static logToolResponse(toolName: string, response: any) {
        this.log(`RESPONSE: ${toolName} | response: ${this.safeStringify(response)}`);
    }
}