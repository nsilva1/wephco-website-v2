"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
} | null>(null);

function Tabs({
  className,
  value,
  onValueChange,
  defaultValue,
  orientation = "horizontal",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
}) {
  const [activeTab, setActiveTab] = React.useState(defaultValue || "");
  const currentTab = value !== undefined ? value : activeTab;

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ value: currentTab, onValueChange: handleTabChange, orientation }}>
      <div
        data-slot="tabs"
        data-orientation={orientation}
        className={cn(
          "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof tabsListVariants>) {
  return (
    <div
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

function TabsTrigger({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<"button"> & { value: string }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) return null;
  const isSelected = ctx.value === value;
  return (
    <button
      type="button"
      data-slot="tabs-trigger"
      data-state={isSelected ? "active" : "inactive"}
      onClick={() => ctx.onValueChange?.(value)}
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx || ctx.value !== value) return null;
  return (
    <div
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
