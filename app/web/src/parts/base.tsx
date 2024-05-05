
import { useUI } from "@/globals/ui";
import { PMenu } from "./menu";
import { PCodePopup } from "./code/popup";

export const Base = () => {
  const ui = useUI();

  return (
    <div className="p-h-full p-w-full p-flex-1 p-flex p-flex-col p-items-stretch">
      <PMenu className="p-px-3 p-border-0 p-border-b p-rounded-none" />
      {ui.code.popup && <PCodePopup />}
    </div>
  );
};
