import { $, Glob } from "bun";
import { g } from "./declare";
import { compress, dir } from "utils";

export const initCache = async () => {
  const web = g.cache.web;
  const glob = new Glob("**/path");
  const root = dir.data("cache/web");
  let i = 0;
  await $`mkdir -p ${root}`;
  g.log.info("Initializing cache");

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
      const c = web[path];

      try {
        const raw = await Bun.file(path).arrayBuffer();
        if (raw) {
          c.raw = new Uint8Array(raw);
        }
      } catch (e) {}

      try {
        const br = await Bun.file(dir.data(`cache/web/${id}/br`)).arrayBuffer();
        web[path].br = new Uint8Array(br);
      } catch (e) {}

      if (!c.br && c.raw && g.mode === "prod") {
        (async () => {
          if (c.raw) {
            c.br = compress.br(c.raw);
            await Bun.write(dir.data(`cache/web/${id}/br`), c.br);
          }
        })();
      }

      try {
        const gz = await Bun.file(dir.data(`cache/web/${id}/gz`)).arrayBuffer();
        web[path].gz = new Uint8Array(gz);
      } catch (e) {}

      if (!c.gz && c.raw) {
        c.gz = Bun.gzipSync(c.raw);
      }
      i++;
    }
  }
  if (i > 0) g.log.info(`<${i}> files loaded`);
};
