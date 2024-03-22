import type { Meta, StoryObj } from "@storybook/vue3";
import { BadgeTypes, FeatherBadge } from "@featherds/badge";

const infoBadge = [
  {
    type: BadgeTypes.info,
    title: "Assigned to Engineering",
  },
];
const errorBadge = [
  {
    type: BadgeTypes.error,
    title: "Network Error",
  },
];
const allStatusBadge = [
  {
    type: BadgeTypes.info,
    title: "In Process",
  },
  {
    type: BadgeTypes.error,
    title: "Network Error",
  },
];

const meta: Meta<typeof FeatherBadge> = {
  title: "FeatherDS/Badge/FeatherBadge",
  component: FeatherBadge,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    badges: infoBadge,
    inline: false,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        template: `{{args.default ? args.default : "assigned"}}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BadgeInfoSingle: Story = {
  args: {
    badges: infoBadge,
  },
};
export const BadgeErrorSingle: Story = {
  args: {
    badges: errorBadge,
  },
};
export const BadgeAll: Story = {
  args: {
    badges: allStatusBadge,
  },
};
