import { w } from "@/globals/window";
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
    ws.onopen = () => {
      console.log("⚡ Prasi Connected");
    };
    ws.onmessage = async ({ data }) => {
      const blob = data as Blob;
      const msg = decoder.decode(new Uint8Array(await blob.arrayBuffer())) as
        | {
            type: "event";
            content: any;
          }
        | { type: "reply"; content: { id: string; result: any } };
      if (msg.type === "event") {
        const event_type = msg.content.type as keyof typeof wsEvents;
        const event = wsEvents[event_type];
        if (event) {
          event(ws, msg.content);
        }
      } else if (msg.type === "reply") {
        const content = msg.content;
        if (w.ws_pending_call[content.id]) {
          const resolve = w.ws_pending_call[content.id];
          delete w.ws_pending_call[content.id];
          resolve(content.result);
        } else {
          console.error(
            `WARNING: received unrecognized ws message id: ${content.id}`
          );
        }
      }
    };
    ws.onclose = () => {
      console.log("⚠️ Reconnecting...");
      reconnect++;
      setTimeout(retry, 1000);
    };
    w.ws = ws;
  };
  retry();
};
