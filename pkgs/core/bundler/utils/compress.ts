import { gzipSync } from "bun";
import brotli from "brotli-wasm";

const br = await brotli;
const encoder = new TextEncoder();
export const compress = {
  gz: (
    data: ArrayBuffer | Uint8Array | string | Record<string, any>,
    output_format?: "utf-8" | "base64" | "u8"
  ) => {
    let result = new Uint8Array();
    if (typeof data === "object") {
      result = gzipSync(JSON.stringify(data));
    } else {
      result = gzipSync(data);
    }

    if (!output_format || output_format === "u8") return result;
    if (output_format === "utf-8") {
      return Buffer.from(result).toString("utf-8");
    }
    if (output_format === "base64") {
      return Buffer.from(result).toString("base64");
    }
  },
  br: (data: string | Uint8Array | ArrayBuffer) => {
    if (data instanceof ArrayBuffer) {
      return br.compress(new Uint8Array(data));
    } else if (typeof data === "string") {
      return br.compress(encoder.encode(data));
    } else {
      return br.compress(data);
    }
  },
};
