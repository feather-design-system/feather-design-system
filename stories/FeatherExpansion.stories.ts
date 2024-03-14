import type { Meta, StoryObj } from "@storybook/vue3";
import { FeatherExpansionPanel } from "@featherds/expansion";
import "@featherds/styles/dist/style.css";

const meta: Meta<typeof FeatherExpansionPanel> = {
  title: "FeatherDS/ExpansionPanel/FeatherExpansionPanel",
  component: FeatherExpansionPanel,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "boolean" },
    level: { control: "number" },
    title: { control: "text" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    modelValue: false,
    level: 2,
    title: "More Details",
    loading: false,
    disabled: false,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot",
        template: `{{args.default || 'This is the panel content area.  Add your own text here by modifying the Default slot.'}}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Expansion: Story = {
  args: {
    title: "More Details",
  },
};
