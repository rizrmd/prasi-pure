import { createRouter } from "radix3";
import { g } from "../../global/declare";
import { prepareApiRoutes } from "./api-scan";

export const initAPI = async () => {
  g.api = {
    router: createRouter(),
  };
  await prepareApiRoutes();
};
