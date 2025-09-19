"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type CardPadding = "sm" | "md" | "lg" | "none";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  clickable?: boolean;
  selected?: boolean;
  role?: React.AriaRole;
}

const paddingClasses: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, padding = "md", clickable, selected, role, onClick, ...props },
    ref,
  ) => {
    const interactive = clickable || typeof onClick === "function";

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-neutral-200 bg-white shadow-sm transition-colors dark:border-neutral-800 dark:bg-neutral-900",
          paddingClasses[padding],
          interactive &&
            "cursor-pointer hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 dark:hover:bg-neutral-800",
          selected &&
            "ring-2 ring-primary-600 ring-offset-2 dark:ring-primary-500",
          className,
        )}
        tabIndex={interactive ? 0 : props.tabIndex}
        role={interactive ? role ?? "button" : role}
        onKeyDown={(e) => {
          if (!interactive) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.(
              e as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>,
            );
          }
        }}
        onClick={onClick}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export default Card;
