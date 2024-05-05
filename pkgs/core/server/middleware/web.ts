import { dir } from "utils";
import type { Middleware } from "./utils/types";
import { compressedResponse } from "./utils/compressed-response";

export const web: Middleware = async ({ req, url, ctx }) => {
  const paths = [
    dir.data(`/build/web/${url.pathname}`),
    dir.path(`/app/web/public/${url.pathname}`),
  ];
  for (const path of paths) {
    const response = await compressedResponse({
      accept: req.headers.get("accept-encoding"),
      path,
    });
    if (response) {
      return response;
    }
  }

  return await compressedResponse({
    accept: req.headers.get("accept-encoding"),
    path: dir.path("/app/web/public/index.html"),
    headers: {
      status: ctx.status || 200,
    },
  });
};
