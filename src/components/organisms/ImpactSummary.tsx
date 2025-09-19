import React from "react";
import { Card } from "@/components/atoms/Card";
import { formatCurrency } from "@/lib/utils/shared";

export interface ImpactSummaryProps {
  beforeMinutes: number;
  afterMinutes: number;
  monthlyCostBefore: number;
  monthlyCostAfter: number;
}

function Bar({
  label,
  before,
  after,
}: {
  label: string;
  before: number;
  after: number;
}) {
  const max = Math.max(before, after, 1);
  const beforePct = Math.round((before / max) * 100);
  const afterPct = Math.round((after / max) * 100);
  return (
    <div>
      <div className="mb-1 text-sm text-neutral-600 dark:text-neutral-300">
        {label}
      </div>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-[11px]">
            <span className="text-neutral-600 dark:text-neutral-400">
              Before
            </span>
            <span className="font-medium">{before}</span>
          </div>
          <div className="h-2 rounded bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-2 rounded bg-neutral-500"
              style={{ width: `${beforePct}%` }}
              aria-label={`Before: ${before}`}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-[11px]">
            <span className="text-neutral-600 dark:text-neutral-400">
              After
            </span>
            <span className="font-medium">{after}</span>
          </div>
          <div className="h-2 rounded bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-2 rounded bg-primary-600"
              style={{ width: `${afterPct}%` }}
              aria-label={`After: ${after}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const ImpactSummary: React.FC<ImpactSummaryProps> = ({
  beforeMinutes,
  afterMinutes,
  monthlyCostBefore,
  monthlyCostAfter,
}) => {
  return (
    <section
      className="mx-auto max-w-6xl px-4"
      aria-labelledby="impact-heading"
    >
      <h2 id="impact-heading" className="mb-2 text-base font-semibold">
        Impact summary
      </h2>
      <Card>
        <div className="space-y-6 p-4">
          <Bar
            label="Runtime (minutes)"
            before={beforeMinutes}
            after={afterMinutes}
          />
          <Bar
            label="Monthly CI cost"
            before={monthlyCostBefore}
            after={monthlyCostAfter}
          />
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Assumes typical parallelization and average CI executor pricing.
            Estimates are approximate.
          </p>
        </div>
      </Card>
    </section>
  );
};

export default ImpactSummary;
