// Shared domain types for the prototype

export type TestCase = {
  id: string;
  name: string;
  durationMs?: number;
  flaky?: boolean;
};

export type RecommendationAction = "merge" | "remove" | "refactor";

export type RecommendationFlag = "flaky" | "long-runner" | "critical";

export type RecommendationRow = {
  id: string;
  tests: string[]; // test ids
  action: RecommendationAction;
  confidence: number; // 0-100
  estMsSaved: number;
  flags: RecommendationFlag[];
};

export type Metrics = {
  redundancyPercent: number; // 0-100
  predictedRuntimeReductionPercent: number; // 0-100
  estimatedMonthlyCISavingsUsd: number; // dollars
  flakyTestsCount?: number;
};

export type Impact = {
  beforeMinutes: number;
  afterMinutes: number;
  monthlyCostBefore: number;
  monthlyCostAfter: number;
};

export type OverlapMatrix = number[][]; // values 0-100, square matrix
