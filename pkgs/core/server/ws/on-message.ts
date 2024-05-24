import { MsgPackDecoder } from "@jsonjoy.com/json-pack/lib/msgpack/MsgPackDecoder";
import type { ServerWebSocket } from "bun";
import { send, type WSProp } from ".";
import { wsRoutes } from "srv/ws/routes";
const decoder = new MsgPackDecoder();

export const serverWSReceiveMsg = async (
  ws: ServerWebSocket<WSProp>,
  buf: Buffer
) => {
  const msg = decoder.decode(buf) as {
    id: string;
    fn: keyof typeof wsRoutes;
    args: any[];
  };

  const route = wsRoutes[msg.fn];
  if (typeof route !== "undefined") {
    const result = await (route as any)(...msg.args);
    send(ws, "reply", { id: msg.id, result });
  }
};
