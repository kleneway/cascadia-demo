import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "../components/organisms/EmptyState";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Organisms/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    onUseSample: action("use-sample"),
  },
};

export const CompactViewport: Story = {
  args: { onUseSample: action("use-sample") },
  parameters: { viewport: { defaultViewport: "iphonex" } },
};

export const LongCopy: Story = {
  render: () => (
    <div className="max-w-xl">
      <EmptyState onUseSample={action("use-sample")} />
      <p className="mt-4 text-sm">
        Localization test: This sentence demonstrates handling of longer,
        localized content strings within the EmptyState component.
      </p>
    </div>
  ),
};
