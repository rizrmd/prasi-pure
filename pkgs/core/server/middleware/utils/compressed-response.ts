import { $ } from "bun";
import shorthash from "short-hash-ts";
import { dir } from "../../../bundler/utils/dir";
import { g } from "../../../global/declare";
import { id2dir } from "../../../global/init-cache";

export const compressedResponse = async (arg: {
  accept: string | null;
  path: string;
  headers?: any;
  checkExists?: boolean;
}) => {
  const cache = g.cache.web;
  const { accept, path } = arg;

  const file = Bun.file(path);

  let isExists = arg.checkExists === false ? true : await file.exists();

  if (file.type !== "application/octet-stream" && isExists) {
    let c = cache[path];
    const id = shorthash.unique(path);
    if (!cache[path]) {
      cache[path] = { modified: file.lastModified };
      c = cache[path];
    } else if (c.modified !== file.lastModified) {
      delete c.raw;
      delete c.gz;
      delete c.br;
      c.modified = file.lastModified;
      try {
        await $`rm -rf ${dir.data("cache/web/" + id2dir(id))}`;
      } catch (e) {}
    }

    if (!c.raw) {
      c.raw = new Uint8Array(await file.arrayBuffer());
      Bun.write(dir.data("cache/web/" + id2dir(id) + "/path"), path);
      Bun.write(
        dir.data("cache/web/" + id2dir(id) + "/ts"),
        file.lastModified.toString()
      );
    }

    if (g.mode === "prod") {
      if (!c.br && accept?.includes("br")) {
        const br_path = dir.data("cache/web/" + id2dir(id) + "/br");
        const br_file = Bun.file(br_path);
        if (await br_file.exists()) {
          c.br = new Uint8Array(await br_file.arrayBuffer());
        }
      }
    }

    if (!c.gz) {
      const gz_path = dir.data("cache/web/" + id2dir(id) + "/gz");
      const gz_file = Bun.file(gz_path);
      if (await gz_file.exists()) {
        c.gz = new Uint8Array(await gz_file.arrayBuffer());
      }

      if (c.raw && !c.gz) {
        c.gz = Bun.gzipSync(c.raw);
        Bun.write(gz_path, c.gz);
      }
    }

    if (g.mode === "prod") {
      if (c.br && accept?.includes("br")) {
        return new Response(c.br, {
          headers: {
            ...arg.headers,
            "content-encoding": "br",
            "content-type": file.type,
          },
        });
      }
    }

    if (c.gz && accept?.includes("gzip")) {
      return new Response(c.gz, {
        headers: {
          ...arg.headers,
          "content-encoding": "gzip",
          "content-type": file.type,
        },
      });
    }

    if (c.raw) {
      return new Response(c.raw, {
        headers: {
          ...arg.headers,
          "content-type": file.type,
        },
      });
    }
  }
};
