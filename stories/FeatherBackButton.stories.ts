import type { Meta, StoryObj } from "@storybook/vue3";
import { FeatherBackButton } from "@featherds/back-button";

const meta: Meta<typeof FeatherBackButton> = {
  title: "FeatherDS/BackButton/FeatherBackButton",
  component: FeatherBackButton,
  tags: ["autodocs"],
  argTypes: {
    // @ts-ignore
    slot_default: {
      control: "text",
      description: "default slot contents",
    },
    longHover: {
      control: "number",
      description: "hover reaction time in milliseconds",
    },
  },
  args: {
    // @ts-ignore
    slot_default: "go back",
    longHover: 500,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        template: `{{args._default ? args._default : "go back"}}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    // @ts-ignore
    slot_default: { control: "text" },
    longHover: { control: "number" },
  },
  args: {
    // @ts-ignore
    slot_default: "go back",
    longHover: 500,
  },
  render: (args: any) => ({
    components: { FeatherBackButton },
    setup() {
      return (args);
    },
    template: `
    <FeatherBackButton
      :long-hover="${args.longHover}">
        ${args.slot_default}
    </FeatherBackButton>
    `,
  }),
};


