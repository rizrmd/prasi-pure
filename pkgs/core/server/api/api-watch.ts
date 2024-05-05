import { watch } from "fs";
import { parseArgs } from "./parse-args";
import { dir } from "../../bundler/utils/dir";
import { g } from "../../global/declare";
export const watchApiRoutes = () => {
  const root = dir.path(`app/srv/api`);
  watch(root, { recursive: true }, async (e, filename) => {
    if (filename && filename.endsWith(".ts")) {
      const oldroute = g.api.files[filename];
      if (oldroute) {
        g.api.router.remove(oldroute.url);
      }

      const importPath = dir.path(`app/srv/api/${filename}`);
      delete require.cache[importPath];
      const api = require(importPath);
      let args: string[] = await parseArgs(importPath);
      const route = {
        url: api._.url,
        args,
        fn: api._.api,
        raw: true,
        path: importPath.substring(root.length + 1),
      };
      g.api.files[filename] = route;
      g.api.router.insert(route.url.replace(/\*/gi, "**"), route);
    }
  });
};
