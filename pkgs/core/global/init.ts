import { PrismaClient } from "db";
import { g } from "./declare";
import pino from "pino";

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
  }
};
