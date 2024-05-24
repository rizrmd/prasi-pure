import type { Server, ServerWebSocket, ShellPromise, Subprocess } from "bun";
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
    files: Record<string, SingleApi>;
  };
  log: { info: (...str: any[]) => void; warn: (...str: any[]) => void };
  mode: "dev" | "prod";
  bundler: {
    web: {
      ts: number;
      watch?: FSWatcher;
      ctx?: BuildContext;
      rebuild: () => Promise<any>;
    };
    tailwind?: { proc: Subprocess };
  };
  cache: {
    web: Record<
      string,
      { modified: number; raw?: Uint8Array; br?: Uint8Array; gz?: Uint8Array }
    >;
    prasi: {
      site: Record<
        string,
        {
          id: string;
          name: string;
          domain: string;
          config?: { api_url?: string };
        }
      >;
    };
  };
  client: {
    all: Set<ServerWebSocket<WSProp>>;
    sites: Record<string, Set<ServerWebSocket<WSProp>>>;
  };
};

type G = typeof g;

declare global {
  const log: G["log"];
}
