import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "p-flex p-h-10 p-w-full p-rounded-md p-border p-border-input p-bg-background p-px-3 p-py-2 p-text-sm p-ring-offset-background file:p-border-0 file:p-bg-transparent file:p-text-sm file:p-font-medium placeholder:p-text-muted-foreground focus-visible:p-outline-none focus-visible:p-ring-2 focus-visible:p-ring-ring focus-visible:p-ring-offset-2 disabled:p-cursor-not-allowed disabled:p-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
