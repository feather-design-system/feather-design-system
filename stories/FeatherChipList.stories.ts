import type { Meta, StoryObj } from "@storybook/vue3";

import { FeatherChipList, FeatherChip } from "@featherds/chips";

import { ChipSingle } from "./FeatherChip.stories";

const meta: Meta<typeof FeatherChipList> = {
  title: "FeatherDS/Chips/FeatherChipList",
  component: FeatherChipList,
  subcomponents: { FeatherChip },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    label: "Chips!",
    mode: "list",
    modelValue: "", // only used in radio mode???
    condensed: false,
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot for button contents",
        component: FeatherChip,
        template: `<FeatherChip></FeatherChip>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeatherChipList>;

export const SingleChip: Story = {
  render: (args) => ({
    components: { FeatherChipList, FeatherChip },
    setup() {
      return { args };
    },
    template: `
    <FeatherChipList v-bind="args">
      <template v-slot:default>
        <FeatherChip>
          <template v-slot:default>Jeff</template>
        </FeatherChip>
      </template>
    </FeatherChipList>
    `,
  }),
  args: {
    ...ChipSingle.args,
  },
};
export const MultipleChips: Story = {
  render: (args) => ({
    components: { FeatherChipList, FeatherChip },
    setup() {
      return { args };
    },
    template: `
    <FeatherChipList v-bind="args">
      <template v-slot:default>
        <FeatherChip>
          <template v-slot:default>Jeff</template>
        </FeatherChip>
        <FeatherChip>
          <template v-slot:default>Brian</template>
        </FeatherChip>
      </template>
    </FeatherChipList>
    `,
  }),
};
