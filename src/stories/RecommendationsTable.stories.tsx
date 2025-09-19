import type { Meta, StoryObj } from "@storybook/react";
import { RecommendationsTable } from "../components/organisms/RecommendationsTable";
import { action } from "@storybook/addon-actions";
import { recommendations } from "../lib/sampleData/testSuiteSample";

const meta = {
  title: "Organisms/RecommendationsTable",
  component: RecommendationsTable,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof RecommendationsTable>;

export default meta;
type Story = StoryObj<typeof RecommendationsTable>;

export const Default: Story = {
  args: {
    rows: recommendations,
    onRowSelect: action("row-select"),
  },
};

export const Empty: Story = {
  args: {
    rows: [],
  },
};

export const ManyRows: Story = {
  args: {
    rows: Array.from({ length: 40 }, (_, i) => ({
      id: `r-${i}`,
      tests: ["A", "B", "C"].slice(0, (i % 3) + 1),
      action: (i % 3 === 0
        ? "merge"
        : i % 3 === 1
        ? "refactor"
        : "remove") as any,
      confidence: Math.max(10, (i * 7) % 100),
      estMsSaved: ((i * 2317) % 240000) + 5000,
      flags: (i % 5 === 0
        ? ["flaky"]
        : i % 5 === 1
        ? ["long-runner"]
        : []) as any,
    })),
  },
};
