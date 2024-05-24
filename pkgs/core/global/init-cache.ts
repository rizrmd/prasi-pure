import { $, Glob } from "bun";
import { join } from "path";
import { compress, dir } from "utils";
import { compressedResponse } from "../server/middleware/utils/compressed-response";
import { g } from "./declare";

export const id2dir = (id: string) => {
  return id.substring(0, 2) + "/" + id;
};
export const initCache = async () => {
  const web = g.cache.web;
  const glob = new Glob("**/path");
  const root = dir.data("cache/web");
  let i = 0;
  await $`mkdir -p ${root}`;
  g.log.info("Caching Bundle");

  await ensureCached(dir.data("build/web"));
  await ensureCached(dir.path("app/web/public"));

  for await (const fpath of glob.scan(root)) {
    const path = await Bun.file(root + "/" + fpath).text();
    const id = fpath.split("/")[1];

    const file = Bun.file(path);
    if (await file.exists()) {
      await Bun.write(
        dir.data(`cache/web/${id2dir(id)}/ts`),
        file.lastModified + ""
      );
      web[path] = {
        modified: file.lastModified,
      };
      const c = web[path];

      try {
        const raw = await Bun.file(path).arrayBuffer();
        if (raw) {
          c.raw = new Uint8Array(raw);
        }
      } catch (e) {}

      try {
        const br = await Bun.file(
          dir.data(`cache/web/${id2dir(id)}/br`)
        ).arrayBuffer();
        web[path].br = new Uint8Array(br);
      } catch (e) {}

      if (!c.br && c.raw && g.mode === "prod") {
        (async () => {
          if (c.raw) {
            compress.br(c.raw, {
              worker: true,
              onDone: async (bin) => {
                c.br = bin;
                await Bun.write(dir.data(`cache/web/${id2dir(id)}/br`), bin);
              },
            });
          }
        })();
      }

      try {
        const gz = await Bun.file(
          dir.data(`cache/web/${id2dir(id)}/gz`)
        ).arrayBuffer();
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

const ensureCached = async (path: string) => {
  const glob = new Glob("**");

  const all = [];
  for await (const file of glob.scan(path)) {
    all.push(
      compressedResponse({
        accept: "br",
        path: join(path, file),
        checkExists: false,
      })
    );
  }

  await Promise.all(all);
};
