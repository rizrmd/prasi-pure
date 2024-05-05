import { PrismaClient } from "db";
import pino from "pino";
import { g } from "./declare";
import type { ServerWebSocket } from "bun";

export const init = () => {
  if (!g.init) {
    g.mode = "dev";
    g.db = new PrismaClient();
    g.log = pino({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid,hostname", // --ignore
        },
      },
    });
    g.client = { all: new Set<ServerWebSocket<unknown>>() };
    g.cache = { web: {} };
  }
};
