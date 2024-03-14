import type { Meta, StoryObj } from "@storybook/vue3";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";

import EditMode from "@featherds/icon/action/EditMode";
import Email from "@featherds/icon/action/Email";
import Location from "@featherds/icon/action/Location";

const meta: Meta<typeof FeatherButton> = {
  title: "FeatherDS/Button/FeatherButton",
  component: FeatherButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // argTypes: {
  //   primary: { control: "boolean" },
  //   secondary: { control: "boolean" },
  //   text: { control: "boolean" },
  //   disabled: { control: "boolean" },
  //   asAnchor: { control: "boolean" },
  //   onColor: { control: "boolean" },
  // },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    disabled: false,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        template: `{{args.default ? args.default : "primary button"}}`,
      },
    },
  },
};
export const Secondary: Story = {
  args: {
    secondary: true,
    disabled: false,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        template: `{{args.default ? args.default : "secondary button"}}`,
      },
    },
  },
};
export const Text: Story = {
  args: {
    text: true,
    disabled: false,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        template: `{{args.default ? args.default : "text button"}}`,
      },
    },
  },
};
export const PrimaryIconLabel: Story = {
  argTypes: {},
  args: {},
  render: (args) => ({
    components: { FeatherButton, FeatherIcon },
    data() {
      return {
        location: Location,
      };
    },
    setup() {
      return { args };
    },
    template: `
      <FeatherButton primary>
        <template #icon>
          <FeatherIcon :icon="location" aria-hidden="true" focusable="false"  />
        </template>
        Directions
      </FeatherButton>
    `,
  }),
  // args: {
  //   primary: true,
  //   disabled: false,
  // },
  // parameters: {
  //   slots: {
  //     icon: {
  //       description: "Slot for placing icon",
  //       component: { FeatherIcon },
  //       template: `<FeatherIcon :icon='location'> </FeatherIcon>`,
  //     },
  //     default: {
  //       description: "Default slot for button contents",
  //       template: `{{args.default ? args.default : "primary button"}}`,
  //     },
  //   },
  // },
};
export const SecondaryIconLabel: Story = {
  argTypes: {},
  args: {},
  render: (args) => ({
    components: { FeatherButton, FeatherIcon },
    data() {
      return {
        email: Email,
      };
    },
    setup() {
      return { args };
    },
    template: `
      <FeatherButton secondary>
        <template #icon>
          <FeatherIcon :icon="email" aria-hidden="true" focusable="false"  />
        </template>
        Feedback
      </FeatherButton>
    `,
  }),
};
export const TextIconLabel: Story = {
  argTypes: {},
  args: {},
  render: (args) => ({
    components: { FeatherButton, FeatherIcon },
    data() {
      return {
        editMode: EditMode,
      };
    },
    setup() {
      return { args };
    },
    template: `
      <FeatherButton text>
        <template #icon>
          <FeatherIcon :icon="editMode" aria-hidden="true" focusable="false"  />
        </template>
        Edit
      </FeatherButton>
    `,
  }),
};
export const PrimaryDisabled: Story = {
  args: {
    primary: true,
    disabled: true,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        template: `{{args.default ? args.default : "primary button"}}`,
      },
      // icon: {},
    },
  },
};
export const SecondaryDisabled: Story = {
  args: {
    secondary: true,
    disabled: true,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        template: `{{args.default ? args.default : "disabled button"}}`,
      },
    },
  },
};

export const TextDisabled: Story = {
  args: {
    text: true,
    disabled: true,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        template: `{{args.default ? args.default : "text button"}}`,
      },
      // icon: {},
    },
  },
};
