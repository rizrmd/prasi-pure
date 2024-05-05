import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useUI } from "@/globals/ui";
import { FC } from "react";

export const PMenu: FC<{ className?: string }> = ({ className }) => {
  const ui = useUI();

  const menus = {
    left: [
      ["Site", [["New Site"], ["Browse"], "---", ["Deploy"]]],
      [
        "Code",
        () => {
          ui.code.popup = true;
          ui.render();
        },
      ],
    ],
    mid: [["Add"]],
    right: [["Preview"]],
  };

  return (
    <div className="p-flex p-justify-between">
      <Menubar className={"p-flex-1 p-justify-start"}>
        {menus.left.map(mapMenu)}
      </Menubar>
      <Menubar className={"p-flex-1 p-justify-center"}>
        {menus.mid.map(mapMenu)}
      </Menubar>
      <Menubar className={"p-flex-1 p-justify-end"}>
        {menus.right.map(mapMenu)}
      </Menubar>
    </div>
  );
};

const mapMenu = (menu: any, idx: number) => {
  const [label, child_or_click] = menu as [string, any];
  return (
    <MenubarMenu key={idx}>
      <MenubarTrigger
        onClick={() => {
          if (typeof child_or_click === "function") {
            child_or_click();
          }
        }}
      >
        {label}
      </MenubarTrigger>
      {Array.isArray(child_or_click) && (
        <MenubarContent>
          {child_or_click.map((e, idx) => {
            if (typeof e === "string") return <MenubarSeparator key={idx} />;
            const [label] = e as [string];

            return <MenubarItem>{label}</MenubarItem>;
          })}
        </MenubarContent>
      )}
    </MenubarMenu>
  );
};
