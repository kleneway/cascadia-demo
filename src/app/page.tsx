"use client";

import React from "react";
import { ThemeAwareToast } from "@/components/theme/ThemeAwareToast";
import { HeaderBar } from "@/components/organisms/HeaderBar";
import { EmptyState } from "@/components/organisms/EmptyState";
import { SummaryMetrics } from "@/components/organisms/SummaryMetrics";
import { OverlapMatrix } from "@/components/organisms/OverlapMatrix";
import { RecommendationsTable } from "@/components/organisms/RecommendationsTable";
import { ImpactSummary } from "@/components/organisms/ImpactSummary";
import { DetailsPanel } from "@/components/organisms/DetailsPanel";
import {
  impact,
  metrics,
  overlapMatrix,
  recommendations,
  testIds,
} from "@/lib/sampleData/testSuiteSample";

export default function Page() {
  const [loaded, setLoaded] = React.useState(false);
  const [selectedPair, setSelectedPair] = React.useState<null | {
    i: number;
    j: number;
  }>(null);
  const [selectedGroupId, setSelectedGroupId] = React.useState<string | null>(
    null,
  );

  const handleLoad = () => setLoaded(true);
  const handleReset = () => {
    setLoaded(false);
    setSelectedPair(null);
    setSelectedGroupId(null);
  };

  const selectedRec = recommendations.find((r) => r.id === selectedGroupId);

  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <a href="#content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <HeaderBar onLoadSample={handleLoad} onReset={handleReset} />
      <main id="content" className="mx-auto w-full max-w-7xl space-y-8 py-6">
        {!loaded ? (
          <EmptyState onUseSample={handleLoad} />
        ) : (
          <>
            <SummaryMetrics metrics={metrics} />
            <OverlapMatrix
              testIds={testIds}
              matrix={overlapMatrix}
              onSelectPair={(i, j) => setSelectedPair({ i, j })}
            />
            <RecommendationsTable
              rows={recommendations}
              onRowSelect={(id) => setSelectedGroupId(id)}
            />
            <ImpactSummary
              beforeMinutes={impact.beforeMinutes}
              afterMinutes={impact.afterMinutes}
              monthlyCostBefore={impact.monthlyCostBefore}
              monthlyCostAfter={impact.monthlyCostAfter}
            />
          </>
        )}
      </main>
      <DetailsPanel
        open={!!selectedGroupId}
        onClose={() => setSelectedGroupId(null)}
        data={{
          tests: selectedRec?.tests ?? [],
          overlapPercent: selectedPair
            ? overlapMatrix[selectedPair.i]?.[selectedPair.j] ?? 0
            : 0,
          suggestedSteps: [
            "Extract common setup",
            "Merge overlapping assertions",
            "Remove redundant navigation",
          ],
          riskLevel: "medium",
          potentialSavingsMs: selectedRec?.estMsSaved,
        }}
      />
      <ThemeAwareToast />
    </div>
  );
}
