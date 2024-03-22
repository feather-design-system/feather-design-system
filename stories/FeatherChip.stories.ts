import type { Meta, StoryObj } from "@storybook/vue3";

import { FeatherChip } from "@featherds/chips";

const meta: Meta<typeof FeatherChip> = {
  title: "FeatherDS/Chips/FeatherChip",
  component: FeatherChip,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    labels: { control: "object" },
    condensed: { control: "boolean" },
  },
  args: {
    disabled: false,
    labels: Object,
    condensed: false,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        template: `{{args.default ? args.default : "potato"}}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ChipSingle: Story = {
  args: {},
};
