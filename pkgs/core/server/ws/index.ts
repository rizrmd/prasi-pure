import { MsgPackEncoder } from "@jsonjoy.com/json-pack/lib/msgpack/MsgPackEncoder";
import type { ServerWebSocket } from "bun";
import { g } from "../../global/declare";

export type WSProp = { url: URL };
export type WSRoute = {
  ws: ServerWebSocket<WSProp>;
};

const encoder = new MsgPackEncoder();
export const send = (
  ws: ServerWebSocket<WSProp>,
  type: "reply" | "event",
  content: Record<string, any>
) => {
  const binary = encoder.encode({ type, content });
  ws.sendBinary(binary);
};

export const broadcast = (
  id_site: string,
  type: "reply" | "event",
  content: Record<string, any>
) => {
  const list = g.client.sites[id_site];
  if (list) {
    const binary = encoder.encode({ type, content });
    list.forEach((ws) => {
      ws.sendBinary(binary);
    });
  }
};

export const wsContext = (ctx: any) => {
  return ctx as {
    ws: ServerWebSocket<WSProp>;
  };
};
