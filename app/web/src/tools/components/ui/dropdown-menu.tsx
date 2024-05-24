import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "p-flex p-cursor-default p-select-none p-items-center p-rounded-sm p-px-2 p-py-1.5 p-text-sm p-outline-none focus:p-bg-accent data-[state=open]:p-bg-accent",
      inset && "p-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="p-ml-auto p-h-4 p-w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "p-z-50 p-min-w-[8rem] p-overflow-hidden p-rounded-md p-border p-bg-popover p-p-1 p-text-popover-foreground p-shadow-lg data-[state=open]:p-animate-in data-[state=closed]:p-animate-out data-[state=closed]:p-fade-out-0 data-[state=open]:p-fade-in-0 data-[state=closed]:p-zoom-out-95 data-[state=open]:p-zoom-in-95 data-[side=bottom]:p-slide-in-from-top-2 data-[side=left]:p-slide-in-from-right-2 data-[side=right]:p-slide-in-from-left-2 data-[side=top]:p-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "p-z-50 p-min-w-[8rem] p-overflow-hidden p-rounded-md p-border p-bg-popover p-p-1 p-text-popover-foreground p-shadow-md data-[state=open]:p-animate-in data-[state=closed]:p-animate-out data-[state=closed]:p-fade-out-0 data-[state=open]:p-fade-in-0 data-[state=closed]:p-zoom-out-95 data-[state=open]:p-zoom-in-95 data-[side=bottom]:p-slide-in-from-top-2 data-[side=left]:p-slide-in-from-right-2 data-[side=right]:p-slide-in-from-left-2 data-[side=top]:p-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "p-relative p-flex p-cursor-default p-select-none p-items-center p-rounded-sm p-px-2 p-py-1.5 p-text-sm p-outline-none p-transition-colors focus:p-bg-accent focus:p-text-accent-foreground data-[disabled]:p-pointer-events-none data-[disabled]:p-opacity-50",
      inset && "p-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "p-relative p-flex p-cursor-default p-select-none p-items-center p-rounded-sm p-py-1.5 p-pl-8 p-pr-2 p-text-sm p-outline-none p-transition-colors focus:p-bg-accent focus:p-text-accent-foreground data-[disabled]:p-pointer-events-none data-[disabled]:p-opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="p-absolute p-left-2 p-flex p-h-3.5 p-w-3.5 p-items-center p-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="p-h-4 p-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "p-relative p-flex p-cursor-default p-select-none p-items-center p-rounded-sm p-py-1.5 p-pl-8 p-pr-2 p-text-sm p-outline-none p-transition-colors focus:p-bg-accent focus:p-text-accent-foreground data-[disabled]:p-pointer-events-none data-[disabled]:p-opacity-50",
      className
    )}
    {...props}
  >
    <span className="p-absolute p-left-2 p-flex p-h-3.5 p-w-3.5 p-items-center p-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="p-h-2 p-w-2 p-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "p-px-2 p-py-1.5 p-text-sm p-font-semibold",
      inset && "p-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("p--mx-1 p-my-1 p-h-px p-bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("p-ml-auto p-text-xs p-tracking-widest p-opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
