import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "p-flex p-h-10 p-items-center p-space-x-1 p-rounded-md p-border p-bg-background p-p-1",
      className
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "p-flex p-space-x-1 p-cursor-default p-select-none p-items-center p-rounded-sm p-px-3 p-py-1.5 p-text-sm p-font-medium p-outline-none focus:p-bg-accent focus:p-text-accent-foreground data-[state=open]:p-bg-accent data-[state=open]:p-text-accent-foreground p-cursor-pointer",
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "p-flex p-cursor-default p-select-none p-items-center p-rounded-sm p-px-2 p-py-1.5 p-text-sm p-outline-none focus:p-bg-accent focus:p-text-accent-foreground data-[state=open]:p-bg-accent data-[state=open]:p-text-accent-foreground",
      inset && "p-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="p-ml-auto p-h-4 p-w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "p-z-50 p-min-w-[8rem] p-overflow-hidden p-rounded-md p-border p-bg-popover p-p-1 p-text-popover-foreground data-[state=open]:p-animate-in data-[state=closed]:p-animate-out data-[state=closed]:p-fade-out-0 data-[state=open]:p-fade-in-0 data-[state=closed]:p-zoom-out-95 data-[state=open]:p-zoom-in-95 data-[side=bottom]:p-slide-in-from-top-2 data-[side=left]:p-slide-in-from-right-2 data-[side=right]:p-slide-in-from-left-2 data-[side=top]:p-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "p-z-50 p-min-w-[12rem] p-overflow-hidden p-rounded-md p-border p-bg-popover p-p-1 p-text-popover-foreground p-shadow-md data-[state=open]:p-animate-in data-[state=closed]:p-fade-out-0 data-[state=open]:p-fade-in-0 data-[state=closed]:p-zoom-out-95 data-[state=open]:p-zoom-in-95 data-[side=bottom]:p-slide-in-from-top-2 data-[side=left]:p-slide-in-from-right-2 data-[side=right]:p-slide-in-from-left-2 data-[side=top]:p-slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "p-relative p-flex p-cursor-default p-select-none p-items-center p-rounded-sm p-px-2 p-py-1.5 p-text-sm p-outline-none focus:p-bg-accent focus:p-text-accent-foreground data-[disabled]:p-pointer-events-none data-[disabled]:p-opacity-50 p-cursor-pointer",
      inset && "p-pl-8",
      className
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "p-relative p-flex p-cursor-default p-select-none p-items-center p-rounded-sm p-py-1.5 p-pl-8 p-pr-2 p-text-sm p-outline-none focus:p-bg-accent focus:p-text-accent-foreground data-[disabled]:p-pointer-events-none data-[disabled]:p-opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="p-absolute p-left-2 p-flex p-h-3.5 p-w-3.5 p-items-center p-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="p-h-4 p-w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "p-relative p-flex p-cursor-default p-select-none p-items-center p-rounded-sm p-py-1.5 p-pl-8 p-pr-2 p-text-sm p-outline-none focus:p-bg-accent focus:p-text-accent-foreground data-[disabled]:p-pointer-events-none data-[disabled]:p-opacity-50",
      className
    )}
    {...props}
  >
    <span className="p-absolute p-left-2 p-flex p-h-3.5 p-w-3.5 p-items-center p-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="p-h-2 p-w-2 p-fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "p-px-2 p-py-1.5 p-text-sm p-font-semibold",
      inset && "p-pl-8",
      className
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("p--mx-1 p-my-1 p-h-px p-bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "p-ml-auto p-text-xs p-tracking-widest p-text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
