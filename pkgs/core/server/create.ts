import { g } from "../global/declare";
import { middlewares } from "./middleware";

export const create = () => {
  g.server = Bun.serve({
    port: 4550,
    async fetch(req) {
      const url = new URL(req.url);
      const ctx = {};
      for (const mware of middlewares) {
        const result = await mware({ req, url, ctx });
        if (result) {
          return result;
        }
      }

      return new Response("WARNING: UNHANDLED REQUEST", { status: 403 });
    },
    websocket: { message(ws, message) {} },
  });
  g.log.info(`Started [${g.mode}] http://localhost:4550`);
};
