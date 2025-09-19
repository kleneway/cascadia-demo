import type { Meta, StoryObj } from "@storybook/react";
import { ImpactSummary } from "../components/organisms/ImpactSummary";

const meta = {
  title: "Organisms/ImpactSummary",
  component: ImpactSummary,
  tags: ["autodocs"],
} satisfies Meta<typeof ImpactSummary>;

export default meta;
type Story = StoryObj<typeof ImpactSummary>;

export const Default: Story = {
  args: {
    beforeMinutes: 120,
    afterMinutes: 82,
    monthlyCostBefore: 2500,
    monthlyCostAfter: 1680,
  },
};

export const NoSavings: Story = {
  args: {
    beforeMinutes: 60,
    afterMinutes: 60,
    monthlyCostBefore: 1000,
    monthlyCostAfter: 1000,
  },
};

export const DramaticSavings: Story = {
  args: {
    beforeMinutes: 200,
    afterMinutes: 40,
    monthlyCostBefore: 5000,
    monthlyCostAfter: 1000,
  },
};
