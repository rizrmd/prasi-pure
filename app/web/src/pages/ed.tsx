import { useUI } from "@/globals/ui";
import { PCodePopup } from "@parts/code/popup";
import { PMenu } from "@parts/menu";
import { validate } from "uuid";

export default {
  url: ["/ed/:id_site", "/ed/:id_site/:id_page"],
  page: () => {
    const ui = useUI();

    if (!validate(params.id_site)) {
      location.href = "/";
      return null;
    }

    return (
      <div className="p-h-full p-w-full p-flex-1 p-flex p-flex-col p-items-stretch">
        <PMenu />
        {ui.code.popup && <PCodePopup />}
      </div>
    );
  },
};
