import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "p-fixed p-inset-0 p-z-50 p-bg-black/80 p- data-[state=open]:p-animate-in data-[state=closed]:p-animate-out data-[state=closed]:p-fade-out-0 data-[state=open]:p-fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "p-fixed p-left-[50%] p-top-[50%] p-z-50 p-grid p-min-w-[200px] p-translate-x-[-50%] p-translate-y-[-50%] p-gap-4 p-border p-bg-background p-shadow-lg p-duration-200 data-[state=open]:p-animate-in data-[state=closed]:p-animate-out data-[state=closed]:p-fade-out-0 data-[state=open]:p-fade-in-0 data-[state=closed]:p-zoom-out-95 data-[state=open]:p-zoom-in-95 data-[state=closed]:p-slide-out-to-left-1/2 data-[state=closed]:p-slide-out-to-top-[48%] data-[state=open]:p-slide-in-from-left-1/2 data-[state=open]:p-slide-in-from-top-[48%] sm:p-rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="p-absolute p-right-3 p-top-3 p-rounded-sm p-opacity-70 p-ring-offset-background p-transition-opacity hover:p-opacity-100 focus:p-outline-none focus:p-ring-2 focus:p-ring-ring focus:p-ring-offset-2 disabled:p-pointer-events-none data-[state=open]:p-bg-accent data-[state=open]:p-text-muted-foreground">
        <X className="p-h-4 p-w-4" />
        <span className="p-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "p-flex p-flex-col p-space-y-1.5 p-text-center sm:p-text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "p-flex p-flex-col-reverse sm:p-flex-row sm:p-justify-end sm:p-space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "p-text-lg p-font-semibold p-leading-none p-tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("p-text-sm p-text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
