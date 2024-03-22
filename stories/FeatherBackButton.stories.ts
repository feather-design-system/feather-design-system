import type { Meta, StoryObj } from "@storybook/vue3";
import { FeatherBackButton } from "@featherds/back-button";

const meta: Meta<typeof FeatherBackButton> = {
  title: "FeatherDS/BackButton/FeatherBackButton",
  component: FeatherBackButton,
  tags: ["autodocs"],
  argTypes: {
    longHover: {
      control: "number",
      description: "hover reaction time in milliseconds",
    },
  },
  args: {
    longHover: 500,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        template: `{{args.default ? args.default : "go back"}}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Back: Story = {};
