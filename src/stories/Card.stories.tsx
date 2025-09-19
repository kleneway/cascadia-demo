import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../components/atoms/Card";

const meta = {
  title: "Atoms/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A container with border, rounded corners, and optional padding. Supports clickable and selected states.",
      },
    },
  },
  argTypes: {
    padding: {
      control: { type: "radio" },
      options: ["sm", "md", "lg", "none"],
    },
    clickable: { control: { type: "boolean" } },
    selected: { control: { type: "boolean" } },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    padding: "md",
    children: (
      <div>
        <h3 className="text-base font-semibold">Card title</h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          This is some body content inside the card. It should be concise and
          readable.
        </p>
      </div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    clickable: true,
    children: (
      <div>
        <h3 className="text-base font-semibold">Clickable card</h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Hover and focus should be visible. Press Enter/Space to activate.
        </p>
      </div>
    ),
  },
};

export const ZeroPadding: Story = {
  args: {
    padding: "none",
    children: (
      <div className="p-4">
        <h3 className="text-base font-semibold">No internal padding</h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Content controls spacing.
        </p>
      </div>
    ),
  },
};

export const OverflowContent: Story = {
  render: () => (
    <div className="w-64">
      <Card padding="sm">
        <div className="max-h-32 overflow-auto space-y-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <p
              key={i}
              className="text-sm text-neutral-700 dark:text-neutral-300"
            >
              Line {i + 1}: Scroll within this card to see overflow handling.
            </p>
          ))}
        </div>
      </Card>
    </div>
  ),
};

export const A11y: Story = {
  render: () => (
    <Card clickable>
      <div>
        <h3 className="text-base font-semibold">Keyboard focus</h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Tab to this card to see focus ring. Role is set for interactive cards.
        </p>
      </div>
    </Card>
  ),
};
