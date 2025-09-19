"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface OverlapMatrixProps {
  testIds: string[];
  matrix: number[][]; // 0-100, square
  onSelectPair?: (i: number, j: number) => void;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
}

export const OverlapMatrix: React.FC<OverlapMatrixProps> = ({
  testIds,
  matrix,
  onSelectPair,
}) => {
  const n = testIds.length;

  return (
    <section
      className="mx-auto max-w-6xl px-4"
      aria-labelledby="overlap-heading"
    >
      <h2 id="overlap-heading" className="mb-2 text-base font-semibold">
        Coverage overlap
      </h2>
      <div
        className="relative max-h-[420px] overflow-auto rounded-md border border-neutral-200 dark:border-neutral-800"
        role="grid"
        aria-rowcount={n + 1}
        aria-colcount={n + 1}
      >
        <div
          className="grid w-max"
          style={{ gridTemplateColumns: `max-content repeat(${n}, 40px)` }}
        >
          {/* Top-left empty corner */}
          <div className="sticky top-0 z-10 bg-white dark:bg-neutral-900" />
          {/* Column headers */}
          {testIds.map((id, j) => (
            <div
              key={`col-${j}`}
              className="sticky top-0 z-10 flex h-10 items-center justify-center truncate bg-white px-2 text-xs font-medium text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"
              role="columnheader"
              aria-colindex={j + 2}
              title={id}
            >
              {j + 1}
            </div>
          ))}

          {/* Rows */}
          {testIds.map((rowId, i) => (
            <React.Fragment key={`row-${i}`}>
              {/* Row header */}
              <div
                className="sticky left-0 z-10 flex h-10 items-center justify-start truncate bg-white px-2 text-xs font-medium text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"
                role="rowheader"
                aria-rowindex={i + 2}
                title={rowId}
              >
                {i + 1}
              </div>

              {/* Cells */}
              {testIds.map((_, j) => {
                const v = clamp(matrix[i]?.[j] ?? 0);
                const isDiagonal = i === j;
                const bg = isDiagonal
                  ? "bg-neutral-100 dark:bg-neutral-800"
                  : undefined;
                const color = `rgba(34,197,94, ${v / 100})`; // green-500 with alpha
                const title = isDiagonal
                  ? `${rowId}`
                  : `${rowId} ↔ ${testIds[j]} • ${v}% overlap`;
                return (
                  <button
                    key={`cell-${i}-${j}`}
                    type="button"
                    role="gridcell"
                    aria-rowindex={i + 2}
                    aria-colindex={j + 2}
                    aria-label={title}
                    className={cn(
                      "h-10 w-10 outline-none transition focus-visible:ring-2 focus-visible:ring-primary-600",
                      bg,
                    )}
                    title={title}
                    disabled={isDiagonal}
                    onClick={() => {
                      if (isDiagonal) return;
                      onSelectPair?.(i, j);
                    }}
                    style={!isDiagonal ? { backgroundColor: color } : undefined}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
        Tip: use arrow keys and Tab to navigate cells. Diagonal is muted.
      </p>
    </section>
  );
};

export default OverlapMatrix;
