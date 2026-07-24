"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  items: Array<{ value: string; label: string }>;
  registerItem: (value: string, label: string) => void;
  unregisterItem: (value: string) => void;
  disabled?: boolean;
} | null>(null);

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

function Select({
  value,
  onValueChange,
  defaultValue,
  disabled = false,
  children,
  ...props
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || "");
  const [items, setItems] = React.useState<Array<{ value: string; label: string }>>([]);

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const registerItem = React.useCallback((val: string, label: string) => {
    setItems((prev) => {
      if (prev.some((i) => i.value === val)) return prev;
      return [...prev, { value: val, label }];
    });
  }, []);

  const unregisterItem = React.useCallback((val: string) => {
    setItems((prev) => prev.filter((i) => i.value !== val));
  }, []);

  const handleValueChange = (val: string) => {
    setSelectedValue(val);
    onValueChange?.(val);
    setOpen(false);
  };

  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <SelectContext.Provider
      value={{
        value: selectedValue,
        onValueChange: handleValueChange,
        open,
        setOpen,
        selectedValue,
        setSelectedValue,
        items,
        registerItem,
        unregisterItem,
        disabled,
      }}
    >
      <div ref={containerRef} className="relative inline-block w-full animate-fadeIn" data-slot="select">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function SelectGroup({ children, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="select-group" {...props}>{children}</div>;
}

function SelectValue({ placeholder, className, ...props }: React.ComponentProps<"span"> & { placeholder?: string }) {
  const ctx = React.useContext(SelectContext);
  if (!ctx) return null;
  const currentItem = ctx.items.find((i) => i.value === ctx.selectedValue);
  return (
    <span data-slot="select-value" className={cn("line-clamp-1 flex items-center gap-2", className)} {...props}>
      {currentItem ? currentItem.label : placeholder}
    </span>
  );
}

function SelectTrigger({
  className,
  children,
  size = "default",
  ...props
}: React.ComponentProps<"button"> & { size?: "sm" | "default" }) {
  const ctx = React.useContext(SelectContext);
  if (!ctx) return null;
  const isDisabled = props.disabled || ctx.disabled;
  return (
    <button
      type="button"
      data-slot="select-trigger"
      data-size={size}
      disabled={isDisabled}
      onClick={() => ctx.setOpen(!ctx.open)}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-4 opacity-50 shrink-0" />
    </button>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<"div"> & { position?: string }) {
  const ctx = React.useContext(SelectContext);
  if (!ctx || !ctx.open) return null;
  return (
    <div
      data-slot="select-content"
      className={cn(
        "bg-popover text-popover-foreground absolute z-50 mt-1 max-h-60 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md p-1 bg-white",
        position === "popper" && "top-full left-0 w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs font-semibold", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  const ctx = React.useContext(SelectContext);
  if (!ctx) return null;

  const label = typeof children === "string" ? children : value;

  React.useEffect(() => {
    ctx.registerItem(value, label);
    return () => ctx.unregisterItem(value);
  }, [value, label, ctx.registerItem, ctx.unregisterItem]);

  const isSelected = ctx.selectedValue === value;

  return (
    <div
      data-slot="select-item"
      onClick={() => !ctx.disabled && ctx.onValueChange?.(value)}
      className={cn(
        "hover:bg-slate-100 relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-slate-800",
        isSelected && "bg-slate-100 font-medium",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        {isSelected && <CheckIcon className="size-4 text-slate-800" />}
      </span>
      <span>{children}</span>
    </div>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton() {
  return null;
}

function SelectScrollDownButton() {
  return null;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
