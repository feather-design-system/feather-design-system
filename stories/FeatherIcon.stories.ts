import { markRaw } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { FeatherIcon } from "@featherds/icon";
import "@featherds/styles/dist/style.css";

import Add from "@featherds/icon/action/Add";
import Location from "@featherds/icon/action/Location";

const add = () => markRaw(Add);
const location = () => markRaw(Location);

const meta: Meta<typeof FeatherIcon> = {
  title: "FeatherDS/Icon/FeatherIcon",
  component: FeatherIcon,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    flex: { control: "boolean" },
    title: { control: "text" },
  },
  args: {
    flex: false,
    title: "",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const IconAdd: Story = {
  args: {
    title: "Add",
    icon: add(),
  },
};
export const IconLocation: Story = {
  args: {
    title: "Location",
    icon: location(),
  },
};
