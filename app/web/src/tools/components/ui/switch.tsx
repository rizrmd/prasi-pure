import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "p-peer p-inline-flex p-h-6 p-w-11 p-shrink-0 p-cursor-pointer p-items-center p-rounded-full p-border-2 p-border-transparent p-transition-colors focus-visible:p-outline-none focus-visible:p-ring-2 focus-visible:p-ring-ring focus-visible:p-ring-offset-2 focus-visible:p-ring-offset-background disabled:p-cursor-not-allowed disabled:p-opacity-50 data-[state=checked]:p-bg-primary data-[state=unchecked]:p-bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "p-pointer-events-none p-block p-h-5 p-w-5 p-rounded-full p-bg-background p-shadow-lg p-ring-0 p-transition-transform data-[state=checked]:p-translate-x-5 data-[state=unchecked]:p-translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
