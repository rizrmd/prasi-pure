import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { FileJson, Pickaxe } from "lucide-react";
import { FC } from "react";

import { useUI } from "@/globals/ui";

export const PCodeMenu: FC<{ className?: string }> = ({ className }) => {
  const ui = useUI();

  return (
    <Menubar className={className}>
      <MenubarMenu>
        <MenubarTrigger
          onClick={() => {
            ui.code.popup = false;
            ui.render();
          }}
        >
          <Pickaxe />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
