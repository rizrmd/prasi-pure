import { context } from "esbuild";
import { watch } from "node:fs";
import { dir } from "utils";
import { g } from "../global/declare";
import { send } from "../server/ws";
import { spawn } from "bun";

export const bundle = async () => {
  if (g.bundler) {
    g.bundler.web.watch?.close();
  }
  g.bundler = {
    web: {
      ts: Date.now(),
      watch: watch(
        dir.path("app/web/src"),
        { recursive: true },
        (event, filename) => {
          g.bundler.web.rebuild();
        }
      ),
      async rebuild() {},
    },
  };

  if (g.bundler.tailwind) {
    g.bundler.tailwind.proc.kill();
    await g.bundler.tailwind.proc.exited;
  }

  g.bundler.tailwind = {
    proc: spawn({
      cmd: `bun tailwindcss -w -m -i src/index.css -o public/prasi.css`.split(
        " "
      ),
      cwd: dir.path("app/web"),
      stdio: ["inherit", "ignore", "ignore"],
    }),
  };

  // TODO: use bun bundler, yg skrg sourcemapnya masih gagal
  // g.bundler.web.rebuild = async () => {
  //   g.bundler.web.ts = Date.now();
  //   await Bun.build({
  //     entrypoints: [dir.path("app/web/src/index.tsx")],
  //     outdir: dir.data("build/web"),
  //     minify: true,
  //     splitting: true,
  //     sourcemap: "external",
  //     target: "browser",
  //     format: "esm",
  //   });

  //   g.log.info(`Web Built <${Date.now() - g.bundler.web.ts}>ms`);
  //   g.client.all.forEach((ws) => {
  //     send(ws, "event", { type: "prasi-reload" });
  //   });
  // };
  // await g.bundler.web.rebuild()

  g.bundler.web.ctx = await context({
    entryPoints: [dir.path("app/web/src/index.tsx")],
    outdir: dir.data("build/web"),
    treeShaking: true,
    minify: true,
    splitting: true,
    format: "esm",
    sourcemap: true,
    bundle: true,
    logLevel: "error",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
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
  g.bundler.web.rebuild = g.bundler.web.ctx.rebuild;
  await g.bundler.web.ctx.rebuild();
};
