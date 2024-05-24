import { $, type ServerWebSocket } from "bun";
import { PrismaClient } from "db";
import moment from "moment";
import type { WSProp } from "../server/ws";
import { g } from "./declare";
import { dir } from "../bundler/utils/dir";

export const initGlobal = async () => {
  g.init = true;
  g.mode = "dev";
  try {
    g.db = new PrismaClient();
  } catch (e) {
    const dbenv = Bun.file("app/db/.env");
    if (!(await dbenv.exists())) {
      await Bun.write(
        dbenv,
        Bun.gunzipSync(
          new Uint8Array([
            31, 139, 8, 0, 0, 0, 0, 0, 0, 19, 115, 113, 12, 113, 116, 114, 12,
            118, 141, 15, 13, 242, 177, 45, 200, 47, 46, 73, 47, 74, 45, 46,
            204, 177, 210, 215, 135, 113, 172, 252, 19, 43, 147, 11, 131, 28,
            179, 2, 92, 93, 124, 141, 51, 50, 51, 83, 45, 83, 75, 75, 10, 61,
            77, 242, 156, 140, 243, 125, 195, 50, 11, 171, 210, 203, 11, 19, 83,
            252, 60, 34, 141, 10, 92, 10, 115, 51, 3, 252, 141, 67, 66, 139, 75,
            51, 51, 205, 195, 125, 76, 44, 60, 140, 77, 28, 12, 77, 245, 140,
            140, 77, 245, 140, 12, 77, 244, 12, 141, 173, 76, 77, 76, 204, 244,
            11, 138, 18, 139, 51, 1, 76, 85, 52, 172, 124, 0, 0, 0,
          ])
        )
      );
    }
    await $`bun prisma generate`.cwd(dir.path("app/db"));
    process.exit(0);
  }
  g.log = {
    info: (...props: any[]) => {
      const str = props
        .join(" ")
        .replaceAll(`[`, `${ansi.green}[`)
        .replaceAll(`]`, `]${ansi.reset}${ansi.cyan}`)
        .replaceAll(`<`, `${ansi.yellow}`)
        .replaceAll(`>`, `${ansi.reset}${ansi.cyan}`);
      console.log(
        `${ansi.reset}[${moment().format("h:mm:ss.SSS")}] ${ansi.cyan}${str}`
      );
    },
    warn: (...props: any[]) => {
      const str = props
        .join(" ")
        .replaceAll(`[`, `${ansi.green}[`)
        .replaceAll(`]`, `]${ansi.reset}${ansi.cyan}`)
        .replaceAll(`<`, `${ansi.yellow}`)
        .replaceAll(`>`, `${ansi.reset}${ansi.cyan}`);
      console.log(
        `${ansi.reset}[${moment().format("h:mm:ss.SSS")}] ${ansi.red}${str}`
      );
    },
  };
  g.client = { all: new Set<ServerWebSocket<WSProp>>() };
  g.cache = { web: {} };
};

const ansi = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bold: "\x1b[1m",
  underline: "\x1b[4m",
};
