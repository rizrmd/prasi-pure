import { MsgPackDecoder } from "@jsonjoy.com/json-pack/lib/msgpack/MsgPackDecoder";
import { wsEvents } from "@ws/events";
const decoder = new MsgPackDecoder();
export const initWS = () => {
  let reconnect = 0;
  const retry = () => {
    const url = new URL(location.href);
    url.pathname = "/sync";
    url.protocol = url.protocol === "http:" ? "ws:" : "wss:";

    const ws = new WebSocket(`${url.protocol}//${url.host}${url.pathname}`);
    ws.onmessage = async ({ data }) => {
      const blob = data as Blob;
      const msg = decoder.decode(new Uint8Array(await blob.arrayBuffer())) as {
        type: "event" | "reply";
        reply_id?: string;
        content: any;
      };
      if (msg.type === "event") {
        const event_type = msg.content.type as keyof typeof wsEvents;
        const event = wsEvents[event_type];
        if (event) {
          event(ws, msg.content);
        }
      }
    };
    ws.onclose = () => {
      reconnect++;
      setTimeout(retry, 1000);
    };
  };
  retry();
};
