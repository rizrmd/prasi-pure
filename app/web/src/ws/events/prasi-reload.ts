import type { WSEvent } from "@ws/types";
export const WSEPrasiReload: WSEvent = async (ws, content) => {
  location.reload()
};
