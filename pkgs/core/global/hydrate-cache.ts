import { $, Glob } from "bun";
import { g } from "./declare";
import { dir } from "utils";

export const hydrateCache = async () => {
  const web = g.cache.web;
  const glob = new Glob("**/path");
  const root = dir.data("cache/web");
  let i = 0;
  await $`mkdir -p ${root}`;
  for await (const fpath of glob.scan(root)) {
    const path = await Bun.file(root + "/" + fpath).text();
    const id = fpath.replaceAll("/path", "");

    const file = Bun.file(path);
    if (await file.exists()) {
      web[path] = {
        modified: parseInt(
          await Bun.file(dir.data(`cache/web/${id}/ts`)).text()
        ),
      };
      try {
        const br = await Bun.file(dir.data(`cache/web/${id}/br`)).arrayBuffer();
        web[path].br = new Uint8Array(br);
      } catch (e) {}

      try {
        const gz = await Bun.file(dir.data(`cache/web/${id}/gz`)).arrayBuffer();
        web[path].gz = new Uint8Array(gz);
      } catch (e) {}
      i++;
    }
  }
  // g.log.info(`Cache Loaded ~> ${i} entrie${i > 1 ? "s" : ""}`);
};
