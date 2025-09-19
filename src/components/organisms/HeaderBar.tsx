"use client";

import React from "react";
import { Button } from "@/components/atoms/Button";
import { Database, RotateCcw } from "lucide-react";
import { toast } from "react-toastify";

export interface HeaderBarProps {
  onLoadSample: () => void;
  onReset: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onLoadSample,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight md:text-xl">
            QA Optimization Assistant
          </h1>
          <p className="mt-0.5 truncate text-sm text-neutral-600 dark:text-neutral-300">
            Find redundant tests, refactor opportunities, and immediate CI
            savings.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              onReset();
              toast.info("Prototype reset.");
            }}
            leftIcon={<RotateCcw />}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onLoadSample();
              toast.success("Sample test suite loaded.");
            }}
            leftIcon={<Database />}
          >
            Use sample suite
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
