"use client";

import React from "react";
import { FileSearch } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export interface EmptyStateProps {
  onUseSample: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onUseSample }) => {
  const [showInfo, setShowInfo] = React.useState(false);
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center">
      <div className="mb-4 rounded-full bg-neutral-100 p-3 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
        <FileSearch className="h-6 w-6" aria-hidden />
      </div>
      <h2 className="text-lg font-semibold">Analyze your test suite</h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
        Load a sample to see redundancy, optimization opportunities, and impact
        in seconds.
      </p>
      <div className="mt-6 flex w-full max-w-sm flex-col items-stretch gap-2 sm:flex-row">
        <Button fullWidth onClick={onUseSample}>
          Use sample suite
        </Button>
        <Button
          variant="ghost"
          fullWidth
          onClick={() => setShowInfo((v) => !v)}
        >
          What we analyze
        </Button>
      </div>
      {showInfo ? (
        <div className="mt-4 w-full text-left text-sm text-neutral-700 dark:text-neutral-300">
          <ul className="list-inside list-disc space-y-1">
            <li>Coverage overlap between tests (redundancy)</li>
            <li>Flaky tests and long-running cases</li>
            <li>Refactor/merge/remove opportunities with estimated savings</li>
          </ul>
        </div>
      ) : null}
    </section>
  );
};

export default EmptyState;
