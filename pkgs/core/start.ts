import { bundle } from "./bundler/init";
import { hydrateCache } from "./global/hydrate-cache";
import { init } from "./global/init";
import { create } from "./server/create";

init();
await hydrateCache();
await bundle();
create();
