import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useUI } from "@/globals/ui";
import { FC, MouseEvent } from "react";
import { useTheme } from "./theme/use-theme";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";

export const PMenu: FC<{ className?: string }> = ({ className }) => {
  const ui = useUI();
  const { setTheme, theme } = useTheme();
  const menus = {
    left: [
      [
        "Site",
        [
          ["New Site"],
          ["Browse"],
          "---",
          ["Deploy"],
          "---",
          [
            <>
              Dark Mode
              <div className="p-absolute p-right-0 p-pr-2 p-h-full p-flex p-items-center">
                {theme === "system" ? (
                  "auto"
                ) : (
                  <Switch checked={theme === "dark"} />
                )}
              </div>
            </>,
            (e: MouseEvent<HTMLDivElement>) => {
              e.preventDefault();
              e.stopPropagation();
              if (theme === "dark") setTheme("system");
              else if (theme === "system") setTheme("light");
              else setTheme("dark");
            },
          ],
          [
            "Logout",
            () => {
              if (confirm("Are you sure ?")) {
                localStorage.clear();
                location.href = "/login";
              }
            },
          ],
        ],
      ],
      [
        "Code",
        () => {
          ui.code.popup = true;
          ui.render();
        },
      ],
    ],
    mid: [[<Plus size={12} />]],
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
            const [label, on_click] = e as [string, () => void];

            return <MenubarItem onClick={on_click}>{label}</MenubarItem>;
          })}
        </MenubarContent>
      )}
    </MenubarMenu>
  );
};
