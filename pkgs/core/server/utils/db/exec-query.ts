import { Prisma } from "db";

export type DBArg = {
  db: string;
  table: string;
  action: string;
  params: any[];
};

export const execQuery = async (args: DBArg, prisma: any) => {
  const { table, action, params } = args;

  const tableInstance = prisma[table];

  if (tableInstance) {
    if (action === "query" && table.startsWith("$query")) {
      try {
        const gzip = params as unknown as string;

        if (typeof gzip === "string") {
          const u8 = new Uint8Array(
            [...atob(gzip)].map((c) => c.charCodeAt(0))
          );
          const json = JSON.parse(
            Buffer.from(Bun.gunzipSync(u8)).toString("utf8")
          );

          if (Array.isArray(json)) {
            const q = json.shift();
            return await tableInstance.bind(prisma)(Prisma.sql(q, ...json));
          }
        }

        return [];
      } catch (e) {
        console.log(e);
        return e;
      }
    }

    const method = tableInstance[action];

    if (method) {
      try {
        const result = await method(...params);

        if (!result) {
          return JSON.stringify(result);
        }

        return result;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
  }
};
