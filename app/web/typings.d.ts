import { cn } from "@/lib/utils";
import type { PrismaClient } from "../db/index";
import type { css as _css} from "goober";

export {};
declare global {
  const params: Record<string, any>;
  const _db: PrismaClient;
  const cx: typeof cn;
  const css: typeof _css;
}
