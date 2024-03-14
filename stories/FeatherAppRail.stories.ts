import { Meta, StoryObj } from "@storybook/vue3";
import {
  FeatherAppRail,
  FeatherAppRailNavItem,
  FeatherAppRailNavHeader,
  FeatherAppHeader,
  IconTextAnimate,
} from "@featherds/app-rail";
import { FeatherAppLayout } from "@featherds/app-layout";
import { FeatherIcon } from "@featherds/icon";
import { FeatherButton } from "@featherds/button";

import Home from "@featherds/icon/action/Home";
import Ambulance from "@featherds/icon/medical/Ambulance";
import Drug from "@featherds/icon/medical/Drug";
import Provider from "@featherds/icon/medical/Provider";
import Reporting from "@featherds/icon/action/Reporting";
import IdCard from "@featherds/icon/communication/IdCard";
import Attachment from "@featherds/icon/file/Attachment";

const meta: Meta<typeof FeatherAppRail> = {
  title: "FeatherDS/AppRail/FeatherAppRail",
  component: FeatherAppRail,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    content: {
      control: "text",
      description: "ID of the main content of the page (accessibility).",
    },
    labels: { control: "object" },
    // @ts-ignore
    appLayoutContentLayout: {
      control: "select",
      options: ["full", "center"],
    },
    appLayoutNavLayout: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    content: "main-content",
    labels: {
      skip: "Skip to main content",
    },
    // @ts-ignore
    appLayoutContentLayout: "full",
    appLayoutNavLayout: "vertical",
  },
  render: (args) => ({
    components: {
      FeatherAppLayout,
      FeatherAppRail,
      FeatherAppRailNavItem,
      FeatherAppRailNavHeader,
      FeatherAppHeader,
      IconTextAnimate,
      FeatherButton,
      FeatherIcon,
    },
    data() {
      return {
        ambulance: Ambulance,
        home: Home,
        pharmacy: Drug,
        provider: Provider,
        reporting: Reporting,
        card: IdCard,
        attachment: Attachment,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <div class="app-rail-story">
      <FeatherAppLayout :contentLayout="args.appLayoutContentLayout" :navLayout="args.appLayoutNavLayout">
        <template #header>
          <FeatherAppHeader>
            <div class="header-section">
              <div class="left">
                Header goes here
              </div>
            </div>
          </FeatherAppHeader>
        </template>
        <template #rail>
          <FeatherAppRail :content="args.content" :labels="args.labels">
            <template #icon>
              <IconTextAnimate>
                <template #icon>
                  <FeatherIcon :icon="home" title="Home" :flex="true"/>
                </template>
                <template #text>
                  <span>Home</span>
                </template>
              </IconTextAnimate>
            </template>
            <template #nav>
              <FeatherAppRailNavHeader title="Applications" />
              <FeatherAppRailNavItem :icon="provider" :title="'Visit Physician'" />
              <FeatherAppRailNavItem :icon="pharmacy" :title="'Pharmacy'" />
              <FeatherAppRailNavItem :icon="ambulance" :title="'Ambulance Services'" />
              <FeatherAppRailNavHeader title="Back Office" />
              <FeatherAppRailNavItem :icon="reporting" :title="'Reporting'" />
              <FeatherAppRailNavItem :icon="card" :title="'ID Card'" />
              <FeatherAppRailNavItem :icon="attachment" :title="'Send Attachments'" />
            </template>
          </FeatherAppRail>
        </template>
        <template #default>
          <div class="feather-row">
            <strong>Main Content goes here</strong>
          </div>
          <div class="feather-row">
            <strong>Main Content goes here</strong>
          </div>
          <div class="feather-row">
            <strong>Main Content goes here</strong>
          </div>
      </FeatherAppLayout>
    </div>
    `,
  }),
};
