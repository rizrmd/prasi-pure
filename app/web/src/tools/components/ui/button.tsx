import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "p-inline-flex p-items-center p-justify-center p-whitespace-nowrap p-rounded-md p-text-sm p-font-medium p-ring-offset-background p-transition-colors focus-visible:p-outline-none focus-visible:p-ring-2 focus-visible:p-ring-ring focus-visible:p-ring-offset-2 disabled:p-pointer-events-none disabled:p-opacity-50",
  {
    variants: {
      variant: {
        default: "p-bg-primary p-text-primary-foreground hover:p-bg-primary/90",
        destructive:
          "p-bg-destructive p-text-destructive-foreground hover:p-bg-destructive/90",
        outline:
          "p-border p-border-input p-bg-background hover:p-bg-accent hover:p-text-accent-foreground",
        secondary:
          "p-bg-secondary p-text-secondary-foreground hover:p-bg-secondary/80",
        ghost: "hover:p-bg-accent hover:p-text-accent-foreground",
        link: "p-text-primary p-underline-offset-4 hover:p-underline",
      },
      size: {
        default: "p-h-10 p-px-4 p-py-2",
        sm: "p-h-9 p-rounded-md p-px-3",
        lg: "p-h-11 p-rounded-md p-px-8",
        icon: "p-h-10 p-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
