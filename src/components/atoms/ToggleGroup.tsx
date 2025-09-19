"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type ToggleSize = "sm" | "md";

export interface ToggleOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface ToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  size?: ToggleSize;
  name?: string;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options,
  value,
  onChange,
  size = "md",
  name,
  className,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  const handleArrow = (dir: -1 | 1) => {
    if (options.length === 0) return;
    const next = (selectedIndex + dir + options.length) % options.length;
    onChange(options[next].value);
  };

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={props["aria-label"]}
      className={cn(
        "inline-flex flex-wrap items-center gap-1 rounded-md border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900",
        className,
      )}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handleArrow(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleArrow(1);
        }
      }}
      {...props}
    >
      {options.map((opt, idx) => {
        const checked =
          opt.value === value || (value === undefined && idx === 0);
        const id = `${name ?? "togglegroup"}-${idx}`;
        return (
          <label key={opt.value} className="relative">
            <input
              id={id}
              type="radio"
              name={name ?? "togglegroup"}
              className="sr-only"
              checked={checked}
              onChange={() => onChange(opt.value)}
              aria-checked={checked}
              role="radio"
            />
            <span
              className={cn(
                "inline-flex select-none items-center gap-2 rounded-md text-sm font-medium outline-none ring-offset-2 transition-colors focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-background",
                size === "sm" ? "px-2 py-1" : "px-3 py-1.5",
                checked
                  ? "bg-primary-600 text-white"
                  : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
              )}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(opt.value);
                }
              }}
            >
              {opt.icon ? (
                <span aria-hidden className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">
                  {opt.icon}
                </span>
              ) : null}
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default ToggleGroup;
