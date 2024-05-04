import { bundle } from "./bundler/init";
import { init } from "./global/init";
import { create } from "./server/create";

init();
await bundle();
create();
