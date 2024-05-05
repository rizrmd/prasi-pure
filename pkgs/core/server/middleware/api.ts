import { g } from "../../global/declare";
import type { Middleware } from "./utils/types";

export const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type",
};

export const apiMiddleware: Middleware = async ({ req, url, ctx }) => {
  const found = g.api.router.lookup(url.pathname);

  if (found) {
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

    const api_ctx = {
      mode: g.mode,
      req: req as any,
      prasi: ctx.prasi || {},
      res: {
        send(body: any) {},
        sendStatus: (code: number) => {},
        setHeader: (key: string, value: string) => {},
      },
      _internal: {
        res: null,
      },
    };
    api_ctx.req.query_parameters = parseQueryParams(api_ctx);

    const fn = found.fn.bind(api_ctx);
    const finalResponse = await fn(...args);
    console.log(finalResponse);

    if (finalResponse instanceof Response) {
      for (const [k, v] of Object.entries(CORS_HEADERS)) {
        finalResponse.headers.set(k, v);
      }
      return finalResponse;
    }

    console.log(finalResponse);
    if (finalResponse) {
      return createResponse(api_ctx.res, finalResponse);
    }
  }
};

export const apiContext = (ctx: any) => {
  return ctx;
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

export const createResponse = (existingRes: any, body: any) => {
  const status =
    typeof existingRes._status === "number" ? existingRes._status : undefined;

  let finalBody = body;
  if (body instanceof Buffer) {
  } else {
    finalBody =
      typeof body === "string" ? body : JSON.stringify(body, replacer);
  }

  let res = new Response(
    finalBody,
    status
      ? {
          status,
        }
      : undefined
  );

  if (typeof body === "object") {
    if (!res.headers.get("content-type")) {
      res.headers.set("content-type", "application/json");
    }
  }

  const cur = existingRes as Response;
  for (const [key, value] of Object.entries(cur.headers.toJSON())) {
    res.headers.set(key, value);
  }

  for (const [k, v] of Object.entries(CORS_HEADERS)) {
    res.headers.set(k, v);
  }

  return res;
};
