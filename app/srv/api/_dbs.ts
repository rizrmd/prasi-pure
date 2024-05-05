import { apiContext } from "api-ctx";

export const _ = {
  url: "/_dbs/:action",
  async api(action?: string) {
    const { req, res } = apiContext(this);
  },
};
