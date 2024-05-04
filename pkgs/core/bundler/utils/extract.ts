import { gunzipSync, gzipSync } from "bun";

export const extract = {
  gz: (
    data: ArrayBuffer | Uint8Array | string,
    input_format: "utf-8" | "base64" | "u8",
    output_format: "json" | "string"
  ) => {
    let result = new Uint8Array();
    if (typeof data === "object") {
      result = gunzipSync(data);
    } else {
      if (input_format === "base64") {
        result = gunzipSync(new Uint8Array(Buffer.from(data, "base64")));
      } else {
        result = gunzipSync(new Uint8Array(Buffer.from(data, "base64")));
      }
    }

    const output = Buffer.from(result).toString("utf-8");
    if (output_format === "string") return output;
    return JSON.parse(output);
  },
  br: async () => {},
};
