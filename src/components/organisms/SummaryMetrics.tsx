import React from "react";
import type { Metrics } from "@/lib/types";
import { Card } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Percent, Timer, DollarSign, AlertOctagon } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils/shared";

export interface SummaryMetricsProps {
  metrics: Metrics;
}

const Stat: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: React.ReactNode;
}> = ({ icon, label, value, sub }) => (
  <Card padding="lg">
    <div className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-md bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-sm text-neutral-600 dark:text-neutral-300">
          {label}
        </div>
        <div className="text-xl font-semibold tracking-tight">{value}</div>
        {sub ? <div className="mt-1">{sub}</div> : null}
      </div>
    </div>
  </Card>
);

export const SummaryMetrics: React.FC<SummaryMetricsProps> = ({ metrics }) => {
  return (
    <section
      aria-labelledby="metrics-heading"
      className="mx-auto max-w-6xl px-4"
    >
      <h2 id="metrics-heading" className="sr-only">
        Summary metrics
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={<Percent className="h-4 w-4" aria-hidden />}
          label="Redundancy"
          value={formatPercent(metrics.redundancyPercent)}
          sub={<Badge tone="warning">Opportunity to dedupe</Badge>}
        />
        <Stat
          icon={<Timer className="h-4 w-4" aria-hidden />}
          label="Predicted runtime reduction"
          value={formatPercent(metrics.predictedRuntimeReductionPercent)}
          sub={
            <Badge tone="success">
              −{formatPercent(metrics.predictedRuntimeReductionPercent)}
            </Badge>
          }
        />
        <Stat
          icon={<DollarSign className="h-4 w-4" aria-hidden />}
          label="Estimated monthly CI savings"
          value={formatCurrency(metrics.estimatedMonthlyCISavingsUsd)}
          sub={<Badge tone="success">Savings</Badge>}
        />
        <Stat
          icon={<AlertOctagon className="h-4 w-4" aria-hidden />}
          label="Flaky tests"
          value={String(metrics.flakyTestsCount ?? 0)}
          sub={
            <Badge
              tone={(metrics.flakyTestsCount ?? 0) > 0 ? "danger" : "neutral"}
            >
              {(metrics.flakyTestsCount ?? 0) > 0 ? "Needs attention" : "None"}
            </Badge>
          }
        />
      </div>
    </section>
  );
};

export default SummaryMetrics;
