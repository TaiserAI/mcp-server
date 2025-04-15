import { z } from "zod";
import { log } from "../logs/logger.js";
import { ToolDefinition } from "../utils/types.js";

export const hexToDecimalTool: ToolDefinition = {
  name: "hex-to-decimal",
  description: "Converts a hexadecimal number to decimal",
  inputSchema: {
    hex: z.string().describe("Hexadecimal number to convert")
  },
  handler: async ({ hex }) => {
    try {
      const cleanHex = hex.toLowerCase().replace(/^0x/, '');
      const decimal = parseInt(cleanHex, 16);

      if (isNaN(decimal)) {
        log({ hex }, { response: "Invalid hexadecimal number provided", isError: true });
        return {
          content: [{ type: "text", text: "Invalid hexadecimal number provided" }],
          isError: true
        };
      }

      log({ hex }, { response: decimal.toString(), isError: false });

      return {
        content: [{ type: "text", text: decimal.toString() }],
        isError: false
      };
    } catch (error: any) {
      log({ hex }, { response: `Error converting hex to decimal: ${error.message}`, isError: true });
      return {
        content: [{ type: "text", text: `Error converting hex to decimal: ${error.message}` }],
        isError: true
      };
    }
  }
};

export const decimalToHexTool: ToolDefinition = {
  name: "decimal-to-hex",
  description: "Converts a decimal number to hexadecimal",
  inputSchema: {
    decimal: z.number().describe("Decimal number to convert")
  },
  handler: async ({ decimal }) => {
    try {
      const hex = decimal.toString(16).toUpperCase();
      log({ decimal }, { response: `0x${hex}`, isError: false });
      return {
        content: [{ type: "text", text: `0x${hex}` }],
        isError: false
      };
    } catch (error: any) {
      log({ decimal }, { response: `Error converting decimal to hex: ${error.message}`, isError: true });
      return {
        content: [{ type: "text", text: `Error converting decimal to hex: ${error.message}` }],
        isError: true
      };
    }
  }
};