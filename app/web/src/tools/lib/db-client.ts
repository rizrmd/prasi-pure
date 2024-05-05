import hash_sum from "hash-sum";
import { fetchViaProxy } from "./proxy";
import pako from "pako";

export const dbProxy = (dburl: string) => {
  const name = "";
  return new Proxy(
    {},
    {
      get(_, table: string) {
        if (table === "_batch") {
          return {
            // pancingan ini table batch
            update: async (batch: any) => {
              return fetchSendDb(
                {
                  name,
                  action: "batch_update",
                  table: "",
                  params: { batch },
                },
                dburl
              );
            },
          };
        }
        if (table === "_schema") {
          return {
            tables: async () => {
              return fetchSendDb(
                {
                  name,
                  action: "schema_tables",
                  table: "",
                  params: [],
                },
                dburl
              );
            },
            columns: async (table: string) => {
              return fetchSendDb(
                {
                  name,
                  action: "schema_columns",
                  table,
                  params: [],
                },
                dburl
              );
            },
            rels: async (table: string) => {
              return fetchSendDb(
                {
                  name,
                  action: "schema_rels",
                  table,
                  params: [],
                },
                dburl
              );
            },
          };
        }

        if (table.startsWith("$")) {
          return (...params: any[]) => {
            const bytes = pako.gzip(JSON.stringify(params));

            return fetchSendDb(
              {
                name,
                action: "query",
                table,
                params: btoa(
                  bytes.reduce(
                    (acc, current) => acc + String.fromCharCode(current),
                    ""
                  )
                ),
              },
              dburl
            );
          };
        }

        return new Proxy(
          {},
          {
            get(_, action: string) {
              return async (...params: any[]) => {
                if (table === "query") {
                  table = action;
                  action = "query";
                }
                return await fetchSendDb(
                  {
                    name,
                    action,
                    table,
                    params,
                  },
                  dburl
                );
              };
            },
          }
        );
      },
    }
  );
};

const cachedQueryResult: Record<
  string,
  { timestamp: number; result: any; promise: Promise<any> }
> = {};

export const fetchSendDb = async (params: any, dburl: string) => {
  try {
    const base = new URL(dburl);
    base.pathname = `/_dbs`;
    if (params.table) {
      base.pathname += `/${params.table}`;
    }
    const url = base.toString();

    if (typeof localStorage !== "undefined" && localStorage.mlsid) {
      params.mlsid = localStorage.mlsid;
    }

    const hsum = hash_sum(params);
    const cached = cachedQueryResult[hsum];

    if (!cached || (cached && Date.now() - cached.timestamp > 1000)) {
      cachedQueryResult[hsum] = {
        timestamp: Date.now(),
        promise: fetchViaProxy(url, params, {
          "content-type": "application/json",
        }),
        result: null,
      };

      const result = await cachedQueryResult[hsum].promise;
      cachedQueryResult[hsum].result = result;
      return result;
    }

    return await cached.promise;
  } catch (e) {}
};
