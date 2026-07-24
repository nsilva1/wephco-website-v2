"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const DialogContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

function Dialog({
  open: openProp,
  onOpenChange,
  children,
  ...props
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [openState, setOpenState] = React.useState(false);
  const open = openProp !== undefined ? openProp : openState;
  
  const setOpen = (val: boolean) => {
    if (openProp === undefined) {
      setOpenState(val);
    }
    onOpenChange?.(val);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      <div data-slot="dialog" {...props}>{children}</div>
    </DialogContext.Provider>
  );
}

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const ctx = React.useContext(DialogContext);
    if (!ctx) return null;

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        ref,
        onClick: (e: any) => {
          ctx.setOpen(true);
          child.props.onClick?.(e);
        },
        className: cn("cursor-pointer", className, child.props.className),
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        data-slot="dialog-trigger"
        onClick={() => ctx.setOpen(true)}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }
)
DialogTrigger.displayName = "DialogTrigger"

function DialogPortal({ children }: { children: React.ReactNode }) {
  return <div data-slot="dialog-portal">{children}</div>;
}

interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const ctx = React.useContext(DialogContext);
    if (!ctx) return null;

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        ref,
        onClick: (e: any) => {
          ctx.setOpen(false);
          child.props.onClick?.(e);
        },
        className: cn("cursor-pointer", className, child.props.className),
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        data-slot="dialog-close"
        onClick={() => ctx.setOpen(false)}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }
)
DialogClose.displayName = "DialogClose"

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = React.useContext(DialogContext);
  if (!ctx || !ctx.open) return null;
  return (
    <div
      data-slot="dialog-overlay"
      onClick={() => ctx.setOpen(false)}
      className={cn(
        "fixed inset-0 z-50 bg-black/50 animate-fadeIn",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  const ctx = React.useContext(DialogContext);
  if (!ctx || !ctx.open) return null;
  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        data-slot="dialog-content"
        className={cn(
          "bg-white fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg animate-fadeIn text-slate-900",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <button
            type="button"
            data-slot="dialog-close"
            onClick={() => ctx.setOpen(false)}
            className="ring-offset-background absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 text-slate-500 cursor-pointer"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold text-slate-900", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
