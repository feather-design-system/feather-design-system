import { Meta, StoryObj } from "@storybook/vue3";
import { FeatherAppLayout } from "@featherds/app-layout";

import "./FeatherAppLayout.css";

const meta: Meta<typeof FeatherAppLayout> = {
  title: "FeatherDS/AppLayout/FeatherAppLayout",
  component: FeatherAppLayout,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    contentLayout: { control: "select", options: ["full", "centered"] },
    navLayout: { control: "select", options: ["horizontal", "vertical"] },
  },
  args: {
    contentLayout: "full",
    navLayout: "horizontal",
  },
  render: (args) => ({
    components: {
      FeatherAppLayout,
    },
    setup() {
      return { args };
    },
    template: `
    <FeatherAppLayout :contentLayout="args.contentLayout" :navLayout="args.navLayout">
      <template #header>
        <div>HEADER goes here</div>
      </template>
      <template #rail>
        <div>RAIL goes here</div>
      </template>
      <template #default>
        <div class=".feather-row"><strong>MAIN Content goes here</strong></div>
        <div class=".feather-row"><strong>MAIN Content goes here</strong></div>
        <div class=".feather-row"><strong>MAIN Content goes here</strong></div>
      </template>
      <template #footer>
        <div>FOOTER</div>
      </template>
    </FeatherAppLayout>
    `,
  }),
};
