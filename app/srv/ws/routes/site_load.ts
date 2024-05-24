import type { WSRoute } from "core/server/ws";
import { joinSiteWS } from "core/server/ws/subscribe-site";
import { cache } from "../cache/cache";
import { g } from "core/global/declare";

export default async (id_site: string, ctx?: WSRoute) => {
  if (ctx) {
    joinSiteWS(id_site, ctx.ws);
  }

  if (!cache.site[id_site]) {
    const site = await g.db.site.findFirst({ where: { id: id_site } });

    if (site) {
      cache.site[id_site] = {
        id: site.id,
        domain: site.domain,
        name: site.name,
        config: site.config as any,
      };
    }
  }

  return cache.site[id_site];
};
