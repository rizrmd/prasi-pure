import { bundle } from "./bundler/init";
import { initCache } from "./global/init-cache";
import { initGlobal } from "./global/init-global";
import { create } from "./server/create";

initGlobal();
await initCache();
await bundle();
create();
