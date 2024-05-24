import { w } from "@/globals/window";
import type { wsRoutes } from "srv/ws/routes";
import { MsgPackEncoder } from "@jsonjoy.com/json-pack/lib/msgpack/MsgPackEncoder";
import { waitUntil } from "@/lib/wait-until";
import cuid from "@bugsnag/cuid";
const encoder = new MsgPackEncoder();
export const call = new Proxy<typeof wsRoutes>({} as any, {
  get(target, p, receiver) {
    const ws = w.ws;
    return async (...args: any[]) => {
      if (ws) {
        const id = cuid();
        const binary = encoder.encode({ fn: p, args, id });

        if (ws.readyState !== ws.OPEN) {
          await waitUntil(() => ws.readyState === ws.OPEN);
        }
        return new Promise<any>((resolve) => {
          ws.send(binary);
          w.ws_pending_call[id] = resolve;
        });
      }
    };
  },
});
