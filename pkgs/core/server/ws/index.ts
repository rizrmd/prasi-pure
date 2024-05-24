import { MsgPackEncoder } from "@jsonjoy.com/json-pack/lib/msgpack/MsgPackEncoder";
import type { ServerWebSocket } from "bun";

export type WSProp = { url: URL };

const encoder = new MsgPackEncoder();
export const send = (
  ws: ServerWebSocket<WSProp>,
  type: "reply" | "event",
  content: Record<string, any>
) => {
  const binary = encoder.encode({ type, content });
  ws.sendBinary(binary);
};
