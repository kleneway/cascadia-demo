import React from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "neutral" | "info" | "success" | "warning" | "danger";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
  pill?: boolean;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral:
    "bg-neutral-100 text-neutral-800 ring-1 ring-inset ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:ring-neutral-700",
  info: "bg-aurora-100 text-aurora-700 ring-1 ring-inset ring-aurora-200 dark:bg-aurora-800 dark:text-aurora-100 dark:ring-aurora-700",
  success:
    "bg-green-100 text-green-800 ring-1 ring-inset ring-green-200 dark:bg-green-900 dark:text-green-100 dark:ring-green-800",
  warning:
    "bg-sunset-100 text-sunset-800 ring-1 ring-inset ring-sunset-200 dark:bg-sunset-900 dark:text-sunset-100 dark:ring-sunset-800",
  danger:
    "bg-error-100 text-error-800 ring-1 ring-inset ring-error-200 dark:bg-error-900 dark:text-error-100 dark:ring-error-800",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1",
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  tone = "neutral",
  size = "sm",
  dot,
  icon,
  pill,
  children,
  ...props
}) => {
  const radius = pill ? "rounded-full" : "rounded-md";
  const showOnlySymbol = !children && (dot || icon);

  return (
    <span
      role="status"
      className={cn(
        "inline-flex items-center gap-1.5 font-medium leading-none",
        radius,
        toneClasses[tone],
        sizeClasses[size],
        className,
      )}
      {...props}
      aria-label={showOnlySymbol ? props["aria-label"] : undefined}
    >
      {dot ? (
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full bg-current"
        />
      ) : null}
      {icon ? (
        <span aria-hidden className="shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
};

export default Badge;
