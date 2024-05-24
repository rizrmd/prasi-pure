import { dbProxy } from "@/lib/db-client";
import { cn } from "@/lib/utils";
import * as goober from "goober";

export const w = window as unknown as {
  basehost: string;
  _db: any;
  cx: any;
  css: any;
};

export const initWindow = (base_url: string) => {
  w._db = dbProxy(base_url);
  w.cx = cn;
  w.css = goober.glob.bind({ g: 1 });
};
