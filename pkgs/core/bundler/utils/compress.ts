import { gzipSync } from "bun";
import { brotliCompressSync } from "node:zlib";

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
  br: (
    data: string | Uint8Array | ArrayBuffer,
    opt?: { worker?: boolean; onDone?: (arg: Uint8Array) => void }
  ) => {
    if (opt?.worker) {
      const workerURL = new URL("./compress-br-worker.ts", import.meta.url)
        .href;
      const worker = new Worker(workerURL);
      worker.postMessage(data);
      worker.onmessage = (event) => {
        if (opt.onDone) {
          opt.onDone(event.data);
        }
      };
    } else {
      if (data instanceof ArrayBuffer) {
        return brotliCompressSync(new Uint8Array(data));
      } else if (typeof data === "string") {
        return brotliCompressSync(encoder.encode(data));
      } else {
        return brotliCompressSync(data);
      }
    }
  },
};
