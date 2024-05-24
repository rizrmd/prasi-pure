import { apiContext } from "api-ctx";
import { execQuery } from "../../../pkgs/core/server/utils/db/exec-query";
import { g } from "../../../pkgs/core/global/declare";

export const _ = {
  url: "/_dbs/:action",
  async api(action?: string) {
    const { req, params } = apiContext(this);

    const result = await execQuery(params, g.db);
    return result;
  },
};
