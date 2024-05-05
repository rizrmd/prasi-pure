import { $ } from "bun";
import { context } from "esbuild";
import { dir } from "utils";
import { g } from "../global/declare";
import { send } from "../server/ws";

export const bundle = async () => {
  if (!g.bundler) {
    g.bundler = { ts: { web: Date.now() } };
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

  g.bundler.web = await context({
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
            g.bundler.ts.web = Date.now();
          });
          build.onEnd(() => {
            g.log.info(`Web Built ${Date.now() - g.bundler.ts.web}ms`);
            g.client.all.forEach((ws) => {
              send(ws, "event", {type: 'prasi-reload'});
            });
          });
        },
      },
    ],
  });
  await g.bundler.web.watch();
};
