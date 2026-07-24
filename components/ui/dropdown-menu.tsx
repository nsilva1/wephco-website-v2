"use client"

import * as React from "react"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenuContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

interface DropdownMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function DropdownMenu({
  open: openProp,
  onOpenChange,
  children,
  ...props
}: DropdownMenuProps) {
  const [openState, setOpenState] = React.useState(false);
  const open = openProp !== undefined ? openProp : openState;
  
  const setOpen = React.useCallback((val: boolean) => {
    if (openProp === undefined) {
      setOpenState(val);
    }
    onOpenChange?.(val);
  }, [openProp, onOpenChange]);

  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [setOpen]);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-block text-left" data-slot="dropdown-menu" {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const ctx = React.useContext(DropdownMenuContext);
    if (!ctx) return null;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.setOpen(!ctx.open);
      props.onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        ref,
        onClick: (e: any) => {
          ctx.setOpen(!ctx.open);
          child.props.onClick?.(e);
        },
        className: cn("cursor-pointer", className, child.props.className),
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        data-slot="dropdown-menu-trigger"
        onClick={handleClick}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </button>
    );
  }
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
  align?: "start" | "end" | "center";
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, sideOffset = 4, align = "end", ...props }, ref) => {
    const ctx = React.useContext(DropdownMenuContext);
    if (!ctx || !ctx.open) return null;
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-content"
        className={cn(
          "bg-white text-slate-800 absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md animate-fadeIn",
          align === "end" && "right-0",
          align === "start" && "left-0",
          align === "center" && "left-1/2 -translate-x-1/2",
          className
        )}
        {...props}
      />
    );
  }
)
DropdownMenuContent.displayName = "DropdownMenuContent"

function DropdownMenuGroup({ children, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dropdown-menu-group" {...props}>{children}</div>;
}

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
  variant?: "default" | "destructive";
  asChild?: boolean;
}

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, inset, variant = "default", asChild, children, ...props }, ref) => {
    const ctx = React.useContext(DropdownMenuContext);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      ctx?.setOpen(false);
      props.onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        ref,
        onClick: (e: any) => {
          ctx?.setOpen(false);
          child.props.onClick?.(e);
        },
        className: cn(
          "hover:bg-slate-100 focus:bg-slate-100 relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none text-slate-700",
          className,
          child.props.className
        )
      });
    }

    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-item"
        data-inset={inset}
        data-variant={variant}
        onClick={handleClick}
        className={cn(
          "hover:bg-slate-100 focus:bg-slate-100 relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-slate-700",
          variant === "destructive" && "text-red-600 hover:bg-red-50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

interface DropdownMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
}

const DropdownMenuCheckboxItem = React.forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ className, children, checked, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-checkbox-item"
        className={cn(
          "hover:bg-slate-100 relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none",
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex size-3.5 items-center justify-center text-slate-700">
          {checked && <CheckIcon className="size-4" />}
        </span>
        {children}
      </div>
    );
  }
)
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

function DropdownMenuRadioGroup({ children, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dropdown-menu-radio-group" {...props}>{children}</div>;
}

interface DropdownMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
}

const DropdownMenuRadioItem = React.forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ className, children, checked, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-radio-item"
        className={cn(
          "hover:bg-slate-100 relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none",
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex size-3.5 items-center justify-center text-slate-700">
          {checked && <CircleIcon className="size-2 fill-current" />}
        </span>
        {children}
      </div>
    );
  }
)
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, inset, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-label"
        data-inset={inset}
        className={cn(
          "px-2 py-1.5 text-sm font-semibold text-slate-500",
          className
        )}
        {...props}
      />
    );
  }
)
DropdownMenuLabel.displayName = "DropdownMenuLabel"

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-separator"
      className={cn("bg-slate-200 -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

interface DropdownMenuSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
  asChild?: boolean;
}

const DropdownMenuSubTrigger = React.forwardRef<HTMLDivElement, DropdownMenuSubTriggerProps>(
  ({ className, inset, asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        ref,
        className: cn(
          "hover:bg-slate-100 flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none text-slate-750",
          className,
          child.props.className
        )
      });
    }

    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-sub-trigger"
        data-inset={inset}
        className={cn(
          "hover:bg-slate-100 flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none text-slate-750",
          className
        )}
        {...props}
      >
        {children}
        <ChevronRightIcon className="ml-auto size-4" />
      </div>
    );
  }
)
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

interface DropdownMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuSubContent = React.forwardRef<HTMLDivElement, DropdownMenuSubContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-sub-content"
        className={cn(
          "bg-white absolute left-full top-0 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg mt-0 ml-1 animate-fadeIn",
          className
        )}
        {...props}
      />
    );
  }
)
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
