import type { ServerWebSocket } from "bun";
import type { WSProp } from ".";
import { g } from "../../global/declare";

export const joinSiteWS = (id_site: string, ws: ServerWebSocket<WSProp>) => {
  if (!g.client.sites[id_site]) {
    g.client.sites[id_site] = new Set();
  }
  const s = g.client.sites[id_site];
  for (const list of Object.values(g.client.sites)) {
    if (list.has(ws)) s.delete(ws);
  }
  if (!s.has(ws)) s.add(ws);
};
