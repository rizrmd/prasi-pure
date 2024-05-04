import { $, Glob } from "bun";
import { compress, dir } from "utils";
import { init } from "../global/init";
import { g } from "../global/declare";

init();

const glob = new Glob("*");
const root = dir.path("/app/web/public");
const root_br = dir.path("/app/web/public-br");
await $`rm -rf ${root_br}`;
await $`mkdir -p ${root_br}`;

g.log.info("Compressing...");

for await (const file of glob.scan(root)) {
  const content = await Bun.file(`${root}/${file}`).arrayBuffer();
  Bun.write(`${root_br}/${file}`, compress.br(content));
  g.log.info("  " + file);
}
