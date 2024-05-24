import { g } from "../../global/declare";
import type { Middleware } from "./utils/types";

export const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type",
};

export const apiMiddleware: Middleware = async ({ req, url, ctx }) => {
  const found = g.api.router.lookup(url.pathname);

  if (found) {
    const params = found.params || {};

    let args = found.args.map((e) => {
      return ((found as any).params || {})[e];
    });

    if (req.method !== "GET" && !found.raw) {
      if (req.method === "OPTIONS") {
        return new Response("OK", {
          headers: CORS_HEADERS,
        });
      }

      if (!req.headers.get("content-type")?.startsWith("multipart/form-data")) {
        try {
          const text = await req.text();
          const json = JSON.parse(text, replacer);

          if (typeof json === "object" && !!json) {
            if (Array.isArray(json)) {
              args = json;
              for (let i = 0; i < json.length; i++) {
                const val = json[i];
                if (found.args[i]) {
                  params[found.args[i]] = val;
                }
              }
            } else {
              for (const [k, v] of Object.entries(json)) {
                params[k] = v;
              }
              for (const [k, v] of Object.entries(params)) {
                const idx = found.args.findIndex((arg) => arg === k);
                if (idx >= 0) {
                  args[idx] = v;
                }
              }
            }
          }
        } catch (e) {}
      }
    }

    try {
      const fn = found.fn.bind({ req, params });
      const finalResponse = await fn(...args);

      if (finalResponse instanceof Response) {
        for (const [k, v] of Object.entries(CORS_HEADERS)) {
          finalResponse.headers.set(k, v);
        }
        return finalResponse;
      }

      return new Response(JSON.stringify(finalResponse), {
        headers: { "content-type": "application/json" },
      });
    } catch (e: any) {
      return new Response(e.message, { status: 503 });
    }
  }
};

export const apiContext = (current: any): { req: Request; params: any } => {
  return current;
};

const parseQueryParams = (ctx: any) => {
  const pageHref = ctx.req.url;
  const searchParams = new URLSearchParams(
    pageHref.substring(pageHref.indexOf("?"))
  );
  const result: any = {};
  searchParams.forEach((v, k) => {
    result[k] = v;
  });

  return result as any;
};

const replacer = (key: string, value: string) => {
  if (typeof value === "bigint") {
    return `BigInt::${value}`;
  }
  return value;
};
