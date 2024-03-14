import type { Meta, StoryObj } from "@storybook/vue3";
import { FeatherDrawer } from "@featherds/drawer";
import "@featherds/styles/dist/style.css";

const meta: Meta<typeof FeatherDrawer> = {
  title: "FeatherDS/Drawer/FeatherDrawer",
  component: FeatherDrawer,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "boolean" },
    width: { control: "text" },
    labels: { control: "object" },
    left: { control: "boolean" },
    hideClose: { control: "boolean" },
  },
  args: {
    modelValue: false,
    width: "10em",
    labels: {
      title: "REQUIRED",
      close: "Close Drawer",
    },
    left: false,
    hideClose: false,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot",
        template: `{{args.default || 'This is the drawer content area.  Add your own text here by modifying the Default slot.'}}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DrawerRight: Story = {
  args: {
    modelValue: true,
    width: "20rem",
  },
};
export const DrawerLeft: Story = {
  args: {
    modelValue: true,
    width: "20rem",
    left: true,
  },
};
