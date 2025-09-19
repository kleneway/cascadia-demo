import React from "react";
import { cn } from "@/lib/utils";

export interface ConfidenceBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  labelVisible?: boolean;
  minLabel?: string;
  maxLabel?: string;
  title?: string;
}

function getColorClass(value: number): string {
  if (value < 50) return "bg-error-600";
  if (value < 75) return "bg-sunset-500";
  return "bg-green-600";
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({
  value,
  labelVisible = true,
  minLabel = "0%",
  maxLabel = "100%",
  className,
  title,
  ...props
}) => {
  const clamped = Math.max(
    0,
    Math.min(100, Number.isFinite(value) ? value : 0),
  );
  const barClass = getColorClass(clamped);

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clamped)}
        title={title ?? `${Math.round(clamped)}% confidence`}
        className="relative h-3 w-full overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800"
      >
        <div
          className={cn("h-full transition-[width] duration-300", barClass)}
          style={{ width: `${clamped}%` }}
        />
        {labelVisible ? (
          <div className="absolute inset-0 flex items-center justify-center text-[11px] font-medium text-neutral-900 dark:text-neutral-100">
            {Math.round(clamped)}%
          </div>
        ) : null}
      </div>
      <div className="mt-1 flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-400">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};

export default ConfidenceBar;
