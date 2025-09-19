"use client";

import React from "react";
import type { RecommendationRow } from "@/lib/types";
import { ConfidenceBar } from "@/components/atoms/ConfidenceBar";
import { Badge } from "@/components/atoms/Badge";
import { ToggleGroup } from "@/components/atoms/ToggleGroup";
import { classNames, formatDurationMs } from "@/lib/utils/shared";

export interface RecommendationsTableProps {
  rows: RecommendationRow[];
  onRowSelect?: (id: string) => void;
}

type SortKey = "confidence" | "time";

export const RecommendationsTable: React.FC<RecommendationsTableProps> = ({
  rows,
  onRowSelect,
}) => {
  const [sortKey, setSortKey] = React.useState<SortKey>("confidence");

  const sorted = React.useMemo(() => {
    const clone = [...rows];
    clone.sort((a, b) => {
      if (sortKey === "confidence") return b.confidence - a.confidence;
      return b.estMsSaved - a.estMsSaved;
    });
    return clone;
  }, [rows, sortKey]);

  return (
    <section className="mx-auto max-w-6xl px-4" aria-labelledby="recs-heading">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 id="recs-heading" className="text-base font-semibold">
          Recommendations
        </h2>
        <ToggleGroup
          aria-label="Sort by"
          size="sm"
          options={[
            { label: "Confidence", value: "confidence" },
            { label: "Time saved", value: "time" },
          ]}
          value={sortKey}
          onChange={(v) => setSortKey(v as SortKey)}
        />
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-md border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">
          No recommendations yet. Load a sample suite to see suggestions.
        </div>
      ) : (
        <div className="overflow-auto rounded-md border border-neutral-200 dark:border-neutral-800">
          <table className="min-w-full border-separate border-spacing-0">
            <thead className="sticky top-0 bg-white text-sm text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
              <tr>
                <th className="sticky left-0 z-10 border-b border-neutral-200 bg-white px-3 py-2 text-left font-medium dark:border-neutral-800 dark:bg-neutral-900">
                  Tests
                </th>
                <th className="border-b border-neutral-200 px-3 py-2 text-left font-medium dark:border-neutral-800">
                  Action
                </th>
                <th className="border-b border-neutral-200 px-3 py-2 text-left font-medium dark:border-neutral-800">
                  Confidence
                </th>
                <th className="border-b border-neutral-200 px-3 py-2 text-left font-medium dark:border-neutral-800">
                  Est. time saved
                </th>
                <th className="border-b border-neutral-200 px-3 py-2 text-left font-medium dark:border-neutral-800">
                  Flags
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr
                  key={row.id}
                  className="group cursor-pointer hover:bg-neutral-50 focus-within:bg-neutral-50 dark:hover:bg-neutral-800 dark:focus-within:bg-neutral-800"
                  onClick={() => onRowSelect?.(row.id)}
                >
                  <td className="sticky left-0 z-[1] bg-white px-3 py-2 text-sm dark:bg-neutral-900">
                    <div className="flex max-w-[360px] flex-wrap items-center gap-2">
                      {row.tests.map((t) => (
                        <Badge key={t} size="sm" tone="neutral">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-sm capitalize">{row.action}</td>
                  <td className="px-3 py-2">
                    <ConfidenceBar value={row.confidence} labelVisible />
                  </td>
                  <td className="px-3 py-2 text-sm">
                    {formatDurationMs(row.estMsSaved)}
                  </td>
                  <td className="px-3 py-2 text-sm">
                    <div className="flex flex-wrap gap-2">
                      {row.flags.map((f) => (
                        <Badge
                          key={f}
                          size="sm"
                          tone={
                            f === "flaky"
                              ? "danger"
                              : f === "long-runner"
                              ? "warning"
                              : "info"
                          }
                        >
                          {f}
                        </Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default RecommendationsTable;
