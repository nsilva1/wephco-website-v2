"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Switch({
  className,
  checked,
  onCheckedChange,
  disabled,
  ...props
}: {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
} & Omit<React.ComponentProps<"button">, "checked" | "onChange">) {
  const [checkedState, setCheckedState] = React.useState(false);
  const isChecked = checked !== undefined ? checked : checkedState;

  const handleToggle = () => {
    if (disabled) return;
    if (checked === undefined) {
      setCheckedState(!isChecked);
    }
    onCheckedChange?.(!isChecked);
  };

  return (
    <button
      type="button"
      data-slot="switch"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        "peer focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        isChecked ? "bg-primary" : "bg-slate-300 dark:bg-slate-700",
        className
      )}
      {...props}
    >
      <span
        data-slot="switch-thumb"
        className={cn(
          "bg-white pointer-events-none block size-4 rounded-full ring-0 transition-transform",
          isChecked ? "translate-x-[calc(100%-2px)]" : "translate-x-0"
        )}
      />
    </button>
  );
}

export { Switch }
