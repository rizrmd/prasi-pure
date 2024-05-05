import type { Server, ServerWebSocket, ShellPromise, Subprocess } from "bun";
import type { PrismaClient } from "db";
import type { BuildContext } from "esbuild";
import type { Logger } from "pino";
import type { WSProp } from "../server/ws";

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
    web?: BuildContext;
    tailwind?: ShellPromise;
    ts: {
      web: number;
    };
  };
  cache: {
    web: Record<
      string,
      { modified: number; raw?: Uint8Array; br?: Uint8Array; gz?: Uint8Array }
    >;
  };
  client: {
    all: Set<ServerWebSocket<WSProp>>;
  };
};
