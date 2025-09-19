import type { Meta, StoryObj } from "@storybook/react";
import { SummaryMetrics } from "../components/organisms/SummaryMetrics";

const meta = {
  title: "Organisms/SummaryMetrics",
  component: SummaryMetrics,
  tags: ["autodocs"],
} satisfies Meta<typeof SummaryMetrics>;

export default meta;
type Story = StoryObj<typeof SummaryMetrics>;

export const Default: Story = {
  args: {
    metrics: {
      redundancyPercent: 38,
      predictedRuntimeReductionPercent: 32,
      estimatedMonthlyCISavingsUsd: 820,
      flakyTestsCount: 3,
    },
  },
};

export const EdgeCases: Story = {
  args: {
    metrics: {
      redundancyPercent: 0,
      predictedRuntimeReductionPercent: 0,
      estimatedMonthlyCISavingsUsd: 0,
      flakyTestsCount: 0,
    },
  },
};
