import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useUI } from "@/globals/ui";
import { PCodeMenu } from "./menu";

export const PCodePopup = () => {
  const ui = useUI();
  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          ui.code.popup = false;
          ui.render();
        }
      }}
    >
      <DialogContent className="p-w-[90%] p-h-[80%] p-bg-white">
        <PCodeMenu /> 
      </DialogContent>
    </Dialog>
  );
};
