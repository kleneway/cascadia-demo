import type {
  Impact,
  Metrics,
  OverlapMatrix,
  RecommendationRow,
} from "@/lib/types";

export const testIds = [
  "auth/login",
  "auth/signup",
  "cart/add_remove",
  "checkout/happy_path",
  "checkout/edge_cases",
  "profile/update",
];

// Roughly 30–50% redundancy across several pairs
export const overlapMatrix: OverlapMatrix = [
  [100, 62, 18, 12, 10, 8],
  [62, 100, 14, 10, 9, 6],
  [18, 14, 100, 55, 42, 12],
  [12, 10, 55, 100, 66, 15],
  [10, 9, 42, 66, 100, 12],
  [8, 6, 12, 15, 12, 100],
];

export const recommendations: RecommendationRow[] = [
  {
    id: "rec-1",
    tests: ["cart/add_remove", "checkout/happy_path"],
    action: "merge",
    confidence: 78,
    estMsSaved: 120000,
    flags: ["long-runner"],
  },
  {
    id: "rec-2",
    tests: ["auth/login", "auth/signup"],
    action: "refactor",
    confidence: 71,
    estMsSaved: 45000,
    flags: [],
  },
  {
    id: "rec-3",
    tests: ["checkout/edge_cases"],
    action: "remove",
    confidence: 54,
    estMsSaved: 30000,
    flags: ["flaky"],
  },
  {
    id: "rec-4",
    tests: ["profile/update"],
    action: "refactor",
    confidence: 49,
    estMsSaved: 12000,
    flags: ["critical"],
  },
];

export const metrics: Metrics = {
  redundancyPercent: 38,
  predictedRuntimeReductionPercent: 32,
  estimatedMonthlyCISavingsUsd: 820,
  flakyTestsCount: 3,
};

export const impact: Impact = {
  beforeMinutes: 120,
  afterMinutes: 82,
  monthlyCostBefore: 2500,
  monthlyCostAfter: 1680,
};
