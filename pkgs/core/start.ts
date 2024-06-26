import { bundle } from "./bundler/init";
import { initCache } from "./global/init-cache";
import { initGlobal } from "./global/init-global";
import { create } from "./server/create";

await initGlobal();
await bundle();
await initCache();
create();
