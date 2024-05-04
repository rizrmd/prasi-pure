import type { BuildOutput, Server } from "bun";
import type { PrismaClient } from "db";
import type { Logger } from "pino";
import { watch } from "fs";

if (!(global as any)._prasi_internal) {
  (global as any)._prasi_internal = {};
}

export const g = (global as any)._prasi_internal as unknown as {
  init: boolean;
  db: PrismaClient;
  server: Server;
  log: Logger;
  mode: "dev" | "prod";
  bundler: {
    init: boolean;
    watch?: ReturnType<typeof watch>;
    build?: Promise<BuildOutput>;
  };
};
