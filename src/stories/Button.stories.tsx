import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "../components/atoms/Button";
import { Plus, Trash2, ChevronRight } from "lucide-react";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A small, accessible button with variants, sizes, optional icons, and disabled/full-width states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "ghost", "destructive"],
      description: "Visual style",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md"],
      description: "Size",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Make button span full width",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disabled state",
    },
    children: {
      control: "text",
      description: "Button label/content",
    },
    onClick: {
      description: "Click handler",
      action: "clicked",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "md",
    onClick: action("click"),
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "secondary",
    size: "md",
    disabled: true,
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button variant="primary" leftIcon={<Plus />} onClick={action("add")}>
        Add item
      </Button>
      <Button
        variant="destructive"
        leftIcon={<Trash2 />}
        onClick={action("delete")}
      >
        Delete
      </Button>
      <Button
        variant="ghost"
        rightIcon={<ChevronRight />}
        onClick={action("next")}
      >
        Next
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <Button
      aria-label="Add"
      variant="primary"
      size="sm"
      leftIcon={<Plus />}
      onClick={action("icon-only")}
    />
  ),
};

export const FullWidth: Story = {
  args: {
    children: "Full width",
    fullWidth: true,
    variant: "secondary",
    size: "md",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
    size: "md",
    onClick: action("delete"),
  },
};

export const A11y: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        Tab to focus; use Enter/Space to activate. Focus outline should be
        visible.
      </p>
      <div className="flex gap-3">
        <Button onClick={action("enter-space")}>Focusable button</Button>
        <Button variant="ghost">Ghost button</Button>
      </div>
    </div>
  ),
};
