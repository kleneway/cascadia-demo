import type { Meta, StoryObj } from "@storybook/react";
import { DetailsPanel } from "../components/organisms/DetailsPanel";

const meta = {
  title: "Organisms/DetailsPanel",
  component: DetailsPanel,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DetailsPanel>;

export default meta;
type Story = StoryObj<typeof DetailsPanel>;

const baseData = {
  tests: ["cart/add_remove", "checkout/happy_path"],
  overlapPercent: 62,
  assertionsOverlapPercent: 48,
  suggestedSteps: [
    "Extract common setup into a shared helper",
    "Combine overlapping assertions into parameterized cases",
    "Remove duplicate navigation steps",
  ],
  riskLevel: "medium" as const,
  potentialSavingsMs: 120000,
};

export const Default: Story = {
  args: { open: true, data: baseData, onClose: () => {} },
};

export const LargeContent: Story = {
  args: {
    open: true,
    onClose: () => {},
    data: {
      ...baseData,
      tests: Array.from({ length: 20 }, (_, i) => `test_${i + 1}`),
      suggestedSteps: Array.from(
        { length: 12 },
        (_, i) =>
          `Step ${
            i + 1
          }: ${"This is a very long description to test scrolling and layout in the panel. "}`,
      ),
      riskLevel: "high",
    },
  },
};
