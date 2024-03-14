import type { Meta, StoryObj } from "@storybook/vue3";
import { FeatherCheckboxGroup, FeatherCheckbox } from "@featherds/checkbox";

const meta: Meta<typeof FeatherCheckboxGroup> = {
  title: "FeatherDS/Checkbox/FeatherCheckboxGroup",
  component: FeatherCheckboxGroup,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    vertical: { control: "boolean" },
  },
  args: {
    hint: "There are no wrong answers",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Group: Story = {
  args: {
    label: "Please select burrito bowl toppings",
    vertical: false,
  },
  render: (args) => ({
    components: {
      FeatherCheckboxGroup,
      FeatherCheckbox,
    },
    data() {
      return {
        cheese: false,
        guac: false,
        sour: false,
        pico: false,
        beans: false,
      };
    },
    setup() {
      return { args };
    },
    template: `
      <div>
        <FeatherCheckboxGroup
          :label="args.label"
          :hint="args.hint"
          v-bind:["vertical"]="args.vertical"
          >
          <FeatherCheckbox v-model="cheese">cheese</FeatherCheckbox>
          <FeatherCheckbox v-model="guac">guacamole</FeatherCheckbox>
          <FeatherCheckbox v-model="sour">sour cream</FeatherCheckbox>
          <FeatherCheckbox v-model="pico">pico de gallo</FeatherCheckbox>
          <FeatherCheckbox v-model="beans">black beans</FeatherCheckbox>
        </FeatherCheckboxGroup>
      </div>
    `,
  }),
};
