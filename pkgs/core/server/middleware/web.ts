import { dir } from "utils";
import type { Middleware } from "./utils/types";
import { compressedResponse } from "./utils/compressed-response";

export const web: Middleware = async ({ req, url, ctx }) => {
  const paths = [
    dir.data(`/build/web/${url.pathname}`),
    dir.path(`/app/web/public/${url.pathname}`),
  ];
  for (const path of paths) {
    const file = Bun.file(path);
    if (file) {
      if (await file.exists()) {
        return compressedResponse({
          accept: req.headers.get("accept-encoding"),
          content: {
            path: url.pathname,
            raw: await file.arrayBuffer(),
          },
          headers: {
            "content-type": file.type,
          },
        });
      }
    }
  }

  return compressedResponse({
    accept: req.headers.get("accept-encoding"),
    content: {
      path: "index.html",
      raw: Bun.file(dir.path("/app/web/public/index.html")),
      br: Bun.file(dir.path("/app/web/public-br/index.html")),
    },
    headers: {
      status: ctx.status || 200,
      "content-type": "text/html",
    },
  });
};
