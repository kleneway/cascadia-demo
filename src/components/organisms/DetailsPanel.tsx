"use client";

import React from "react";
import { X, Check, Ban } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { toast } from "react-toastify";

export interface DetailsData {
  tests: string[];
  overlapPercent: number;
  assertionsOverlapPercent?: number;
  suggestedSteps: string[];
  riskLevel: "low" | "medium" | "high";
  potentialSavingsMs?: number;
}

export interface DetailsPanelProps {
  open: boolean;
  onClose: () => void;
  data: DetailsData;
}

export const DetailsPanel: React.FC<DetailsPanelProps> = ({
  open,
  onClose,
  data,
}) => {
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const riskTone =
    data.riskLevel === "high"
      ? "danger"
      : data.riskLevel === "medium"
      ? "warning"
      : "neutral";

  return (
    <div
      className="fixed inset-0 z-40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="details-title"
      aria-describedby="details-desc"
    >
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 w-full max-w-md overflow-hidden bg-white shadow-xl outline-none transition-transform dark:bg-neutral-900"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
          <div>
            <h2 id="details-title" className="text-base font-semibold">
              Suggested action
            </h2>
            <p
              id="details-desc"
              className="text-sm text-neutral-600 dark:text-neutral-300"
            >
              Review the rationale and accept or dismiss the suggestion.
            </p>
          </div>
          <Button
            variant="ghost"
            aria-label="Close"
            onClick={onClose}
            rightIcon={<X />}
          />
        </div>
        <div className="space-y-4 overflow-auto p-4">
          <div>
            <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
              Tests
            </h3>
            <p className="mt-1 text-sm text-neutral-800 dark:text-neutral-100">
              {data.tests.join(", ")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge tone="warning">
              Overlap: {Math.round(data.overlapPercent)}%
            </Badge>
            {typeof data.assertionsOverlapPercent === "number" ? (
              <Badge tone="info">
                Assertions overlap: {Math.round(data.assertionsOverlapPercent)}%
              </Badge>
            ) : null}
            {typeof data.potentialSavingsMs === "number" ? (
              <Badge tone="success">
                Potential savings: {Math.round(data.potentialSavingsMs / 1000)}s
              </Badge>
            ) : null}
            <Badge tone={riskTone as any}>Risk: {data.riskLevel}</Badge>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
              Suggested steps
            </h3>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-neutral-800 dark:text-neutral-100">
              {data.suggestedSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
          <Button
            variant="secondary"
            leftIcon={<Ban />}
            onClick={() => {
              toast.info("Suggestion dismissed.");
              onClose();
            }}
          >
            Dismiss
          </Button>
          <Button
            variant="primary"
            leftIcon={<Check />}
            onClick={() => {
              toast.success("Suggestion accepted.");
              onClose();
            }}
          >
            Accept suggestion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPanel;
