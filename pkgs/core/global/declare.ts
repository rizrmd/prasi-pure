import type { Server, ServerWebSocket, ShellPromise } from "bun";
import type { PrismaClient } from "db";
import type { BuildContext } from "esbuild";
import type { FSWatcher } from "node:fs";
import type { WSProp } from "../server/ws";
import { type RadixRouter } from "radix3";

if (!(global as any)._prasi_internal) {
  (global as any)._prasi_internal = {};
}

type SingleApi = {
  url: any;
  args: string[];
  raw: boolean;
  fn: any;
  path: string;
};

export const g = (global as any)._prasi_internal as unknown as {
  init: boolean;
  db: PrismaClient;
  server: Server;
  api: {
    router: RadixRouter<SingleApi>;
  };
  log: { info: (...str: any[]) => void; warn: (...str: any[]) => void };
  mode: "dev" | "prod";
  bundler: {
    web: { ts: number; watch: FSWatcher; ctx?: BuildContext };
    tailwind?: ShellPromise;
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
