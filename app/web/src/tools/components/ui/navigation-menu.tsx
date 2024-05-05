import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "p-relative p-z-10 p-flex p-max-w-max p-flex-1 p-items-center p-justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "p-group p-flex p-flex-1 p-list-none p-items-center p-justify-center p-space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "p-group p-inline-flex p-h-10 p-w-max p-items-center p-justify-center p-rounded-md p-bg-background p-px-4 p-py-2 p-text-sm p-font-medium p-transition-colors hover:p-bg-accent hover:p-text-accent-foreground focus:p-bg-accent focus:p-text-accent-foreground focus:p-outline-none disabled:p-pointer-events-none disabled:p-opacity-50 data-[active]:p-bg-accent/50 data-[state=open]:p-bg-accent/50"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "p-group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="p-relative p-top-[1px] p-ml-1 p-h-3 p-w-3 p-transition p-duration-200 group-data-[state=open]:p-rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "p-left-0 p-top-0 p-w-full data-[motion^=from-]:p-animate-in data-[motion^=to-]:p-animate-out data-[motion^=from-]:p-fade-in data-[motion^=to-]:p-fade-out data-[motion=from-end]:p-slide-in-from-right-52 data-[motion=from-start]:p-slide-in-from-left-52 data-[motion=to-end]:p-slide-out-to-right-52 data-[motion=to-start]:p-slide-out-to-left-52 md:p-absolute md:p-w-auto p-",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("p-absolute p-left-0 p-top-full p-flex p-justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "p-origin-top-center p-relative p-mt-1.5 p-h-[var(--radix-navigation-menu-viewport-height)] p-w-full p-overflow-hidden p-rounded-md p-border p-bg-popover p-text-popover-foreground p-shadow-lg data-[state=open]:p-animate-in data-[state=closed]:p-animate-out data-[state=closed]:p-zoom-out-95 data-[state=open]:p-zoom-in-90 md:p-w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "p-top-full p-z-[1] p-flex p-h-1.5 p-items-end p-justify-center p-overflow-hidden data-[state=visible]:p-animate-in data-[state=hidden]:p-animate-out data-[state=hidden]:p-fade-out data-[state=visible]:p-fade-in",
      className
    )}
    {...props}
  >
    <div className="p-relative p-top-[60%] p-h-2 p-w-2 p-rotate-45 p-rounded-tl-sm p-bg-border p-shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
