import { Meta, StoryObj } from "@storybook/vue3";
import { markRaw } from "vue";
import {
  FeatherPopover,
  PointerAlignment,
  PopoverPlacement,
} from "@featherds/popover";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import Info from "@featherds/icon/action/Info";

const meta: Meta<typeof FeatherPopover> = {
  title: "FeatherDS/Popover/FeatherPopover",
  component: FeatherPopover,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    pointerAlignment: {
      control: "select",
      options: ["center", "left", "right"],
    },
  },
  args: {
    placement: PopoverPlacement.top,
    pointerAlignment: PointerAlignment.center,
  },
  // parameters: {
  //   slots: {
  //     default: {
  //       description: "Default slot for button contents",
  //       template: `{{args.default ? args.default || "TITLE"}}`,
  //     },
  //     trigger: {
  //       description: "Trigger component slot for button contents",
  //       component: { FeatherButton },
  //       template: `<FeatherButton secondary>{{ args.trigger ? args.trigger : "DEMO" }}</FeatherButton>`,
  //     },
  //   },
  // },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonTrigger: Story = {
  render: (args) => ({
    components: {
      FeatherPopover,
      FeatherButton,
      FeatherIcon,
    },
    data() {
      return { title: "Feather Popover" };
    },
    setup() {
      return { args };
    },
    computed: {
      info() {
        return markRaw(Info);
      },
    },
    template: `
      <FeatherPopover
        :placement=args.placement
        :pointerAlignment=args.pointerAlignment>
        <template #default>
          <div>
            <h4>{{title}}</h4>

            <p>This popover was triggered by clicking the 'Learn More' Feather Button</p>
            <a href="#" target="_blank">Click to open in a new window.</a>
          </div>
        </template>
        <template #trigger="{ attrs, on }">
          <div style="display:flex;height:80vh;justify-content:center;align-items:center;">
            <FeatherButton
              secondary
              v-bind="attrs"
              v-on="on"
              >Learn More
            </FeatherButton>
          </div>
        </template>
      </FeatherPopover>
      `,
  }),
};

export const IconTrigger: Story = {
  render: (args) => ({
    components: {
      FeatherPopover,
      FeatherButton,
      FeatherIcon,
    },
    data() {
      return { title: "Feather Popover" };
    },
    setup() {
      return { args };
    },
    computed: {
      info() {
        return markRaw(Info);
      },
    },
    template: `
      <FeatherPopover
        :placement=args.placement
        :pointerAlignment=args.pointerAlignment>
        <template #default>
          <div>
            <h4>{{title}}</h4>

            <p>This popover was triggered by a Feather Icon click.</p>
            <a href="#" target="_blank"> random link i guess</a>
          </div>
        </template>
        <template #trigger="{ attrs, on }">
          <div style="display:flex;height:80vh;justify-content:center;align-items:center;">
              <FeatherIcon :icon=info style="font-size:2.25em;" v-bind="attrs" v-on="on"/>
          </div>
        </template>
      </FeatherPopover>
      `,
  }),
};
