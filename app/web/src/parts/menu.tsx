import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useUI } from "@/globals/ui";
import { FileJson } from "lucide-react";
import { FC } from "react";

export const PMenu: FC<{ className: string }> = ({ className }) => {
  const ui = useUI();

  return (
    <Menubar className={className}>
      <MenubarMenu>
        <MenubarTrigger>Site</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Site</MenubarItem>
          <MenubarItem>Browse</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Deploy</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          onClick={() => {
            ui.code.popup = true;
            ui.render();
          }}
        >
          <FileJson size={18} />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
