import type { Meta, StoryObj } from "@storybook/vue3";
import { FeatherButton } from "@featherds/button";
import { FeatherCard } from "@featherds/card";
import "@featherds/styles/dist/style.css";

const meta: Meta<typeof FeatherCard> = {
  title: "FeatherDS/Card/FeatherCard",
  component: FeatherCard,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    href: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    title: "Card Title",
    subtitle: "Card Subtitle",
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot",
        template: `{{args.default || 'This is the content area.  Add your own text here by modifying the Default slot.'}}`,
      },
      actions: {
        description: "Actions slot for buttons",
        component: { FeatherButton },
        template:
          "<FeatherButton secondary>{{args.actions || 'learn more'}}</FeatherButton>",
      },
    },
  },
};
export const AsAnchor: Story = {
  args: {
    title: "Card Title",
    subtitle: "Card Subtitle",
    href: "https://www.google.com",
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot",
        template: `{{args.default || 'This is the content area.  Add your own text here by modifying the Default slot.'}}`,
      },
    },
  },
};
