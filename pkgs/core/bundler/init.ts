import { $ } from "bun";
import { context } from "esbuild";
import { dir } from "utils";
import { g } from "../global/declare";
import { send } from "../server/ws";
import { watch } from "node:fs";

export const bundle = async () => {
  if (!g.bundler) {
    g.bundler = {
      web: {
        ts: Date.now(),
        watch: watch(
          dir.path("app/web/src"),
          { recursive: true },
          (event, filename) => {
            g.bundler.web.ctx?.rebuild();
          }
        ),
      },
    };
  } else {
    return;
  }
  g.bundler.tailwind =
    $`bun tailwindcss -w -m -i src/index.css -o public/index.css`
      .cwd(dir.path("app/web"))
      .quiet();

  (async () => {
    await g.bundler.tailwind;
  })();

  g.bundler.web.ctx = await context({
    entryPoints: [dir.path("app/web/src/index.tsx")],
    outdir: dir.data("build/web"),
    treeShaking: true,
    minify: true,
    splitting: true,
    format: "esm",
    sourcemap: true,
    bundle: true,
    plugins: [
      {
        name: "prasi",
        setup(build) {
          build.onStart(() => {
            g.bundler.web.ts = Date.now();
          });
          build.onEnd(() => {
            g.log.info(`Web Built <${Date.now() - g.bundler.web.ts}>ms`);
            g.client.all.forEach((ws) => {
              send(ws, "event", { type: "prasi-reload" });
            });
          });
        },
      },
    ],
  });
  await g.bundler.web.ctx.rebuild();
};
