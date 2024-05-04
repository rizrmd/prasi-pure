import { $, build } from "bun";
import { g } from "../global/declare";
import { dir } from "utils";
import { watch } from "fs";
import { dirname } from "path";
export const bundle = async () => {
  if (!g.bundler) {
    g.bundler = { init: false };
  }

  const rebuild = async () => {
    if (!g.bundler.build) {
      g.log.info("Building app/web/src/index.tsx");
      g.bundler.build = build({
        entrypoints: [dir.path(`/app/web/src/index.tsx`)],
        splitting: true,
      });

      // TODO: wait until bun sourcemap works https://github.com/oven-sh/bun/issues/3325
      const result = await g.bundler.build;
      delete g.bundler.build;
      await $`rm -rf ${dir.data("build/web")}`;
      await $`mkdir -p ${dir.data("build/web")}`;
      await Promise.all(
        result.outputs.map(async (file) => {
          await $`mkdir -p ${dirname(dir.data(`build/web/${file.path}`))}`;
          return await Bun.write(dir.data(`build/web/${file.path}`), file);
        })
      );

      return result;
    }
    return await g.bundler.build;
  };

  if (g.bundler.watch) {
    g.bundler.watch.close();
  }

  g.bundler.watch = watch(
    dir.path(`/app/web/src`),
    { recursive: true },
    (event, filename) => {
      rebuild();
    }
  );

  if (!g.bundler.init) {
    await rebuild();
    g.bundler.init = true;
  }
};
