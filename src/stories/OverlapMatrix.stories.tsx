import type { Meta, StoryObj } from "@storybook/react";
import { OverlapMatrix } from "../components/organisms/OverlapMatrix";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Organisms/OverlapMatrix",
  component: OverlapMatrix,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof OverlapMatrix>;

export default meta;
type Story = StoryObj<typeof OverlapMatrix>;

export const Default: Story = {
  args: {
    testIds: ["A", "B", "C", "D", "E"],
    matrix: [
      [100, 62, 18, 12, 10],
      [62, 100, 14, 10, 9],
      [18, 14, 100, 55, 42],
      [12, 10, 55, 100, 66],
      [10, 9, 42, 66, 100],
    ],
    onSelectPair: action("select-pair"),
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="w-[260px]">
        <OverlapMatrix
          testIds={["X", "Y"]}
          matrix={[
            [100, 80],
            [80, 100],
          ]}
          onSelectPair={action("select-2x2")}
        />
      </div>
      <div className="max-w-full">
        <OverlapMatrix
          testIds={Array.from({ length: 10 }, (_, i) => `T${i + 1}`)}
          matrix={Array.from({ length: 10 }, (_, i) =>
            Array.from({ length: 10 }, (_, j) =>
              i === j ? 100 : Math.floor(Math.random() * 80),
            ),
          )}
          onSelectPair={action("select-10x10")}
        />
      </div>
    </div>
  ),
};

export const A11y: Story = {
  args: {
    testIds: ["A", "B", "C"],
    matrix: [
      [100, 30, 0],
      [30, 100, 50],
      [0, 50, 100],
    ],
  },
};
