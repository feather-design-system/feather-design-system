import { Meta, StoryObj } from "@storybook/vue3";

import { FeatherInput } from "@featherds/input";

const meta: Meta<typeof FeatherInput> = {
  title: "FeatherDS/Input/FeatherInput",
  component: FeatherInput,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    modelValue: { control: "text" },
  },
  args: {
    modelValue: "Jeff",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "First name",
  },
};
export const DefaultWithHint: Story = {
  args: {
    label: "First name",
    hint: `Applicant first name as it appears on the birth certificate`,
  },
};
export const Error: Story = {
  args: {
    label: "First name",
    error: "That's not your name",
  },
};
export const Clear: Story = {
  args: {
    label: "First name",
    clear: "Clear this field?",
  },
};
export const NumberType: Story = {
  argTypes: {
    modelValue: { control: "number" },
  },
  args: {
    modelValue: 2,
    label: "Number of items",
    type: "number",
    hint: `This must be a numeric value.`,
  },
};
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
export const MaxLength: Story = {
  args: {
    ...Default.args,
    maxlength: 5,
    hint: "Up to 5 characters allowed",
  },
};
export const HiddenLabel: Story = {
  argTypes: {
    hideLabel: { control: "boolean" },
    hint: { control: "text" },
  },
  args: {
    ...Default.args,
    hideLabel: true,
    hint: "No label",
  },
};
