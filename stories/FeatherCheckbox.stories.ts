import type { Meta, StoryObj } from "@storybook/vue3";
import { FeatherCheckbox } from "@featherds/checkbox";

const meta: Meta<typeof FeatherCheckbox> = {
  title: "FeatherDS/Checkbox/FeatherCheckbox",
  component: FeatherCheckbox,
  tags: ["autodocs"],
  args: {},
  parameters: {
    slots: {
      default: {
        description: "Default slot for checkbox label",
        template: `{{args.default ? args.default : "U.S. Citizen?"}}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultCheckbox: Story = {
  argTypes: {
    modelValue: { control: "boolean" },
  },
  args: {
    modelValue: false,
  },
  render: (args) => ({
    components: {
      FeatherCheckbox,
    },
    data() {
      return {
        value: false,
      };
    },
    setup() {
      return { args };
    },
    template: `
      <FeatherCheckbox
        id="citizen"
        v-model="args.modelValue"
        >{{args.default ? args.default : "U.S. Citizen?"}}
      </FeatherCheckbox>
    `,
  }),
};
export const Indeterminate: Story = {
  args: {},
  render: (args) => ({
    components: {
      FeatherCheckbox,
    },
    data() {
      return {
        firstChild: false,
        secondChild: false,
      };
    },
    computed: {
      allChildren() {
        return this.firstChild && this.secondChild;
      },
      indeterminate() {
        if (this.firstChild && !this.secondChild) {
          return true;
        }
        if (!this.firstChild && this.secondChild) {
          return true;
        }
        return false;
      },
    },
    methods: {
      handleParent(v: boolean) {
        if (v === undefined) {
          return;
        }
        this.firstChild = v;
        this.secondChild = v;
      },
    },
    setup() {
      return { args };
    },
    template: `
    <div>
      <FeatherCheckbox
        id="parent"
        :modelValue="allChildren"
        @update:modelValue="handleParent"
        :indeterminate="indeterminate"
        >{{args.default ? args.default : "All Tasks Completed?"}}
      </FeatherCheckbox>
      <ul>
        <li>
          <FeatherCheckbox
            id="firstChild"
            v-model="firstChild"
          >1st Task
          </FeatherCheckbox>
        </li>
        <li>
          <FeatherCheckbox
            id="secondChild"
            v-model="secondChild"
          >2nd Task
          </FeatherCheckbox>
        </li>
      </ul>
    </div>
  `,
  }),
};
