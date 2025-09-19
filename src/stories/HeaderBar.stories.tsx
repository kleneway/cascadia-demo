import type { Meta, StoryObj } from "@storybook/react";
import { HeaderBar } from "../components/organisms/HeaderBar";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Organisms/HeaderBar",
  component: HeaderBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeaderBar>;

export default meta;
type Story = StoryObj<typeof HeaderBar>;

export const Default: Story = {
  args: {
    onLoadSample: action("load-sample"),
    onReset: action("reset"),
  },
};

export const Compact: Story = {
  args: {
    onLoadSample: action("load-sample"),
    onReset: action("reset"),
  },
  parameters: {
    viewport: { defaultViewport: "iphonex" },
  },
};
