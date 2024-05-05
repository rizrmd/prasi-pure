import type { PrismaClient } from "../db/index";

export {};
declare global {
  const params: Record<string, any>;
  const _db: PrismaClient;
}
