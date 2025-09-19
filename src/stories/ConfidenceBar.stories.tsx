import type { Meta, StoryObj } from "@storybook/react";
import { ConfidenceBar } from "../components/atoms/ConfidenceBar";

const meta = {
  title: "Atoms/ConfidenceBar",
  component: ConfidenceBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays a 0–100 confidence value with semantic colors, labels, and aria attributes.",
      },
    },
  },
  argTypes: {
    value: { control: { type: "number", min: 0, max: 100, step: 1 } },
    labelVisible: { control: { type: "boolean" } },
  },
} satisfies Meta<typeof ConfidenceBar>;

export default meta;
type Story = StoryObj<typeof ConfidenceBar>;

export const Default: Story = {
  args: {
    value: 72,
    labelVisible: true,
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <ConfidenceBar value={0} />
      <ConfidenceBar value={50} />
      <ConfidenceBar value={100} />
      <div>
        <ConfidenceBar value={145} title=">100 value is clamped to 100%" />
        <p className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-400">
          Values >100 are clamped to 100.
        </p>
      </div>
    </div>
  ),
};

export const A11y: Story = {
  render: () => (
    <div className="w-80">
      <ConfidenceBar value={68} labelVisible minLabel="Low" maxLabel="High" />
      <p className="mt-2 text-[12px] text-neutral-700 dark:text-neutral-300">
        Role is progressbar with aria-valuemin/max/now.
      </p>
    </div>
  ),
};


