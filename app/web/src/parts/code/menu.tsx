import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { FC } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUI } from "@/globals/ui";
import { cn } from "@/lib/utils";

export const PCodeMenu: FC<{ className?: string }> = ({ className }) => {
  const ui = useUI();

  return (
    <Menubar className={cn("p-rounded-t-lg")}>
      <MenubarMenu>
        <Label className="p-mr-2 p-cursor-pointer">
          <Switch />
          <span>Tailwind</span>
        </Label>

        <MenubarTrigger>
          <div>Rebuild</div>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
