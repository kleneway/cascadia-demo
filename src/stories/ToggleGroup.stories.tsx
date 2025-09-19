import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup } from "../components/atoms/ToggleGroup";
import { action } from "@storybook/addon-actions";
import { Grid, List, Settings, Star, Edit, Trash2 } from "lucide-react";
import React from "react";

const meta = {
  title: "Atoms/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: { control: { type: "radio" }, options: ["sm", "md"] },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("grid");
    return (
      <ToggleGroup
        aria-label="View mode"
        size="md"
        options={[
          { label: "Grid", value: "grid", icon: <Grid /> },
          { label: "List", value: "list", icon: <List /> },
          { label: "Settings", value: "settings", icon: <Settings /> },
        ]}
        value={value}
        onChange={(v) => {
          setValue(v);
          action("change")(v);
        }}
      />
    );
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-300">
          Single option
        </p>
        <ToggleGroup
          aria-label="Single option"
          size="sm"
          options={[{ label: "Only", value: "only", icon: <Star /> }]}
          value={"only"}
          onChange={action("single-change")}
        />
      </div>
      <div className="w-64">
        <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-300">
          Many options, wrap on small width
        </p>
        <ToggleGroup
          aria-label="Many options"
          size="sm"
          options={[
            { label: "Edit", value: "edit", icon: <Edit /> },
            { label: "Delete", value: "delete", icon: <Trash2 /> },
            { label: "Grid", value: "grid", icon: <Grid /> },
            { label: "List", value: "list", icon: <List /> },
            { label: "Settings", value: "settings", icon: <Settings /> },
            { label: "Star", value: "star", icon: <Star /> },
          ]}
          value={"edit"}
          onChange={action("many-change")}
        />
      </div>
    </div>
  ),
};

export const A11y: Story = {
  render: () => {
    const [value, setValue] = React.useState("edit");
    return (
      <div className="flex flex-col gap-2">
        <ToggleGroup
          aria-label="Editor actions"
          options={[
            { label: "Edit", value: "edit", icon: <Edit /> },
            { label: "Delete", value: "delete", icon: <Trash2 /> },
          ]}
          value={value}
          onChange={setValue}
        />
        <p className="text-[12px] text-neutral-700 dark:text-neutral-300">
          Use Left/Right arrow keys to change selection. Roles are radiogroup
          and radio.
        </p>
      </div>
    );
  },
};
