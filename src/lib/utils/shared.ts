import { cn } from "@/lib/utils";
import type { ClassValue } from "clsx";

export function classNames(...inputs: ClassValue[]) {
  return cn(inputs);
}

export function formatPercent(value: number, fractionDigits = 0): string {
  const clamped = Math.max(
    -100,
    Math.min(100, Number.isFinite(value) ? value : 0),
  );
  return `${clamped.toFixed(fractionDigits)}%`;
}

export function formatDurationMs(ms: number): string {
  if (!Number.isFinite(ms)) return "0 ms";
  if (Math.abs(ms) < 1000) return `${Math.round(ms)} ms`;
  const seconds = ms / 1000;
  return `${seconds.toFixed(seconds >= 10 ? 0 : 1)} s`;
}

export function formatCurrency(
  value: number,
  currency: string = "USD",
): string {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  return formatter.format(Number.isFinite(value) ? value : 0);
}
