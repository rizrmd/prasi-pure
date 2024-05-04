import { compress } from "../../../bundler/utils/compress";

const cache = { br: {} as Record<string, any> };

export const compressedResponse = (arg: {
  accept: string | null;
  content: { path: string; raw: any; br?: any };
  headers?: any;
}) => {
  if (arg.accept?.includes("br")) {
    let content_br = cache.br[arg.content.path] || arg.content.br;

    if (!!content_br) {
      return new Response(content_br, {
        headers: { ...arg.headers, "content-encoding": "br" },
      });
    } else {
      setTimeout(() => {
        cache.br[arg.content.path] = compress.br(arg.content.raw);
      });
    }
  }

  if (arg.accept?.includes("gzip") && arg.content.raw) {
    return new Response(Bun.gzipSync(arg.content.raw), {
      headers: { ...arg.headers, "content-encoding": "gzip" },
    });
  }

  return new Response(arg.content.raw, {
    headers: arg.headers,
  });
};
