// prevents TS errors
declare var self: Worker;
import { brotliCompressSync } from "node:zlib";

const encoder = new TextEncoder();

self.onmessage = (event: MessageEvent) => {
  const data = event.data;

  let result: any = null;
  if (data instanceof ArrayBuffer) {
    result = brotliCompressSync(new Uint8Array(data));
  } else if (typeof data === "string") {
    result = brotliCompressSync(encoder.encode(data));
  } else {
    result = brotliCompressSync(data);
  }
  postMessage(result);
};
