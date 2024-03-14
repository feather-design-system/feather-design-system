import type { Meta, StoryObj } from "@storybook/vue3";
import { FeatherDateInput } from "@featherds/date-input";
import "@featherds/styles/dist/style.css";

const date = new Date();
const disabledFrom = date;
disabledFrom.setDate(disabledFrom.getDate() + 5);
const disabledTo = date;
disabledTo.setDate(disabledTo.getDate() - 5);

const meta: Meta<typeof FeatherDateInput> = {
  title: "FeatherDS/DateInput/FeatherDateInput",
  component: FeatherDateInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    modelValue: { control: "date" },
    disabledDates: { control: "object" },
  },
  args: {
    label: "Admission Date",
    modelValue: date,
  },
  parameters: {
    disabledTo: disabledTo,
    actions: {
      onclick: ["onclick", "click"],
    },
    slots: {
      pre: {
        description: "Pre slot for icon",
        template: `{{args.pre}}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // label: "Admission Date",
    // modelValue: undefined,
  },
};
export const MinYear: Story = {
  args: {
    label: "Minimum Year",
    modelValue: date,
    minYear: 2023,
  },
};
export const MaxYear: Story = {
  args: {
    label: "Maximum Year",
    maxYear: 2026,
  },
};
export const MondayFirst: Story = {
  args: {
    label: "Monday First",
    mondayFirst: true,
  },
};
export const DisabledTo: Story = {
  args: {
    label: "Disabled Dates",
    disabledDates: {
      to: disabledTo,
    },
  },
};
export const DisabledFrom: Story = {
  args: {
    label: "Disabled Dates",
    disabledDates: {
      from: disabledFrom,
    },
  },
};
