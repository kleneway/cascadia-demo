import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/atoms/Badge";
import { Info, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A semantic badge for status and annotations. Supports tone, size, dot, icon, and pill.",
      },
    },
  },
  argTypes: {
    tone: {
      control: { type: "radio" },
      options: ["neutral", "info", "success", "warning", "danger"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md"],
    },
    pill: { control: { type: "boolean" } },
    dot: { control: { type: "boolean" } },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="info" icon={<Info />}>
        Info
      </Badge>
      <Badge tone="success" icon={<CheckCircle />}>
        Success
      </Badge>
      <Badge tone="warning" icon={<AlertTriangle />}>
        Warning
      </Badge>
      <Badge tone="danger" icon={<AlertCircle />}>
        Danger
      </Badge>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="w-48">
        <Badge tone="neutral" size="md" className="block truncate">
          This is a very long badge label that should truncate on narrow width
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <Badge tone="info" dot>
          Dot + label
        </Badge>
        <Badge tone="success" pill icon={<CheckCircle />}>
          Pill with icon
        </Badge>
        <Badge tone="warning" pill dot>
          Pill with dot
        </Badge>
        <Badge tone="danger" aria-label="Error" dot />
      </div>
    </div>
  ),
};

export const A11y: Story = {
  render: () => (
    <div className="flex flex-col gap-2 text-sm text-neutral-700 dark:text-neutral-300">
      <p>Icon-only badges should provide an aria-label.</p>
      <div className="flex gap-3">
        <Badge tone="danger" aria-label="Error state" icon={<AlertCircle />} />
        <Badge
          tone="success"
          aria-label="All checks passed"
          icon={<CheckCircle />}
        />
      </div>
    </div>
  ),
};
