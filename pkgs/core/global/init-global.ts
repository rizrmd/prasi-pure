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
    await $`bun prisma generate`.cwd(dir.path("app/db"));
    g.db = new PrismaClient();
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
