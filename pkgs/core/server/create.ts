import { g } from "../global/declare";
import { initAPI } from "./api/api-init";
import { middlewares } from "./middleware";
import type { WSProp } from "./ws";
import { serverWSReceiveMsg } from "./ws/on-message";

export const create = () => {
  initAPI();
  g.server = Bun.serve<WSProp>({
    port: 4550,
    async fetch(req, server) {
      const url = new URL(req.url);
      const ctx = { prasi: {} };

      if (server.upgrade(req, { data: { url } })) {
        return undefined;
      }

      for (const mware of middlewares) {
        const result = await mware({ req, url, ctx });
        if (result) {
          return result;
        }
      }

      return new Response("WARNING: UNHANDLED REQUEST", { status: 403 });
    },
    websocket: {
      open(ws) {
        g.client.all.add(ws);
      },
      close(ws, code, reason) {
        g.client.all.delete(ws);
      },
      message(ws, message) {
        if (message instanceof Buffer) {
          serverWSReceiveMsg(ws, message);
        }
      },
    },
  });
  g.log.info(`Started [${g.mode}] http://localhost:4550`);
};
