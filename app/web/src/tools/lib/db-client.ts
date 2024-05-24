import hash_sum from "hash-sum";
import pako from "pako";
import { fetchViaProxy } from "./proxy";

export const dbProxy = (dburl: string) => {
  const name = "";
  return new Proxy(
    {},
    {
      get(_, table: string) {
        if (table === "_batch") {
          return {
            update: async (batch: any) => {
              try {
                return fetchSendDb(
                  {
                    name,
                    action: "batch_update",
                    table: "",
                    params: { batch },
                  },
                  dburl
                );
              } catch (e) {
                throw new Error(e.message);
              }
            },
          };
        }
        if (table === "_schema") {
          return {
            tables: async () => {
              try {
                return fetchSendDb(
                  {
                    name,
                    action: "schema_tables",
                    table: "",
                    params: [],
                  },
                  dburl
                );
              } catch (e) {
                throw new Error(e.message);
              }
            },
            columns: async (table: string) => {
              try {
                return fetchSendDb(
                  {
                    name,
                    action: "schema_columns",
                    table,
                    params: [],
                  },
                  dburl
                );
              } catch (e) {
                throw new Error(e.message);
              }
            },
            rels: async (table: string) => {
              try {
                return await fetchSendDb(
                  {
                    name,
                    action: "schema_rels",
                    table,
                    params: [],
                  },
                  dburl
                );
              } catch (e) {
                throw new Error(e.message);
              }
            },
          };
        }

        if (table.startsWith("$")) {
          return async (...params: any[]) => {
            const bytes = pako.gzip(JSON.stringify(params));

            try {
              return await fetchSendDb(
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
            } catch (e) {
              throw new Error(e.message);
            }
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
                try {
                  return await fetchSendDb(
                    {
                      name,
                      action,
                      table,
                      params,
                    },
                    dburl
                  );
                } catch (e) {
                  throw new Error(e.message);
                }
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
};
