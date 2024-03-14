import type { Meta, StoryObj } from "@storybook/vue3";
import { BadgeTypes, FeatherTextBadge } from "@featherds/badge";

const meta: Meta<typeof FeatherTextBadge> = {
  title: "FeatherDS/Badge/FeatherTextBadge",
  component: FeatherTextBadge,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["info", "error"],
    },
  },
  args: {
    type: BadgeTypes.info,
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

export const TextBadgeInfo: Story = {
  args: {
    type: BadgeTypes.info,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        template: `{{args.default ? args.default : "processing"}}`,
      },
    },
  },
};
export const TextBadgeError: Story = {
  args: {
    type: BadgeTypes.error,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        template: `{{args.default ? args.default : "network error"}}`,
      },
    },
  },
};
