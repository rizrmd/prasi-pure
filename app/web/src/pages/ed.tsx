import { session } from "@/globals/session";
import { useUI } from "@/globals/ui";
import { PCodePopup } from "@parts/code/popup";
import { PMenu } from "@parts/menu";
import { PMosaic } from "@parts/mosaic";
import { useEffect } from "react";
import { validate } from "uuid";

export default {
  url: ["/ed", "/ed/:id_site", "/ed/:id_site/:id_page"],
  page: () => {
    const ui = useUI();

    if (!session.user) {
      location.href = "/login";
    }
    useEffect(() => {
      if (!validate(params.id_site)) {
        _db.site
          .findFirst({
            where: {
              id_user: session.user.id,
            },
            select: { id: true },
          })
          .then((res) => {
            location.href = "/ed/" + res.id;
          });
        return null;
      } else {
        localStorage.prasi_sid = params.id_site;
      }
    }, []);

    return (
      <div
        className="p-h-full p-w-full p-flex-1 p-flex p-flex-col p-items-stretch"
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <PMenu />
        {ui.code.popup && <PCodePopup />}
        <div className="p-relative p-flex-1 p-text-sm">
          <PMosaic />
        </div>
      </div>
    );
  },
};
