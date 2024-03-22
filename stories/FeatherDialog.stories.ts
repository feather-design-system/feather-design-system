import { Meta, StoryObj } from "@storybook/vue3";
// import { withActions } from "@storybook/addon-actions/decorator";
import { fn } from "@storybook/test";

import { FeatherDialog } from "@featherds/dialog";
import { FeatherButton } from "@featherds/button";

const meta: Meta<typeof FeatherDialog> = {
  title: "FeatherDS/Dialog/FeatherDialog",
  component: FeatherDialog,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "boolean" },
    labels: { control: "object" },
    hideClose: { control: "boolean" },
    hideTitle: { control: "boolean" },
    relative: { control: "boolean" },
  },
  args: {
    modelValue: false,
    labels: {
      title: "Default Dialog",
      close: "Close Dialog",
    },
    hideClose: false,
    hideTitle: false,
    relative: false,
    onHidden: fn(),
    onShown: fn(),
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot",
        template: `{{args.default || 'This is the panel content area.  Add your own text here by modifying the Default slot.'}}`,
      },
      footer: {
        description: "Footer slot",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
  },
};

export const WithButton: Story = {
  args: {
    modelValue: true,
    labels: {
      title: "Ok to Submit?",
      close: "Close Dialog (Cancel)",
    },
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot",
        template: `{{args.default || 'This is the panel content area.  Add your own text here by modifying the Default slot.'}}`,
      },
      footer: {
        description: "Content area for button",
        component: { FeatherButton },
        template: `<FeatherButton secondary>OK</FeatherButton>`,
      },
    },
  },
};
