import { Meta, StoryObj } from "@storybook/vue3";
import { FeatherAppBar, FeatherAppBarLink } from "@featherds/app-bar";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";

import Email from "@featherds/icon/action/Email";
import AccountCircle from "@featherds/icon/action/AccountCircle";
import Menu from "@featherds/icon/navigation/Menu";

const meta: Meta<typeof FeatherAppBar> = {
  title: "FeatherDS/AppBar/FeatherAppBar",
  component: FeatherAppBar,
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
    fullWidth: { control: "boolean" },
    scrollHide: { control: "boolean" },
  },
  args: {
    content: "main-content",
    labels: {
      skip: "Skip to main content",
      expand: "Click to expand",
    },
    fullWidth: true,
    scrollHide: true,
  },
  render: (args) => ({
    components: {
      FeatherAppBar,
      FeatherAppBarLink,
      FeatherButton,
      FeatherIcon,
    },
    data() {
      return {
        email: Email,
        account: AccountCircle,
        menu: Menu,
      };
    },
    setup() {
      return { args };
    },
    template: `
    <FeatherAppBar
      :content="args.content"
      :labels="args.labels"
      :fullWidth="args.fullWidth"
      :scrollHide="args.scrollHide"
      >
      <template #left>
        <FeatherAppBarLink url="#" :icon="menu" :title="'Menu'" target="_blank" />
        Feather AppBar
      </template>
      <template #center>
        Wednesday&nbsp;3:21&nbsp;PM
      </template>
      <template #right>
        <FeatherAppBarLink url="#" :icon="email" :title="'Email'" target="_blank" />
        <FeatherAppBarLink url="#" :icon="account" :title="'My Account'" target="_blank" />
      </template>
    </FeatherAppBar>
    <main id="main-content">
      <div>
        <h1>Lorem Ipsum</h1>
        <p style="padding: 1em">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus varius turpis, vitae molestie metus feugiat vitae. Maecenas vitae orci id turpis aliquam mollis. Nam vitae dolor nec libero molestie pulvinar. In quis sem imperdiet, mattis nunc vitae, vulputate justo. Etiam lacinia nulla vel orci venenatis, nec laoreet felis imperdiet. Vestibulum ullamcorper dui efficitur dictum euismod. Duis in velit diam. Pellentesque aliquam tortor eu quam sodales, et commodo libero dignissim. Vivamus metus sem, maximus sed scelerisque a, porta a mi. Fusce consequat dui odio, id laoreet mauris lobortis ut. Ut ullamcorper libero eu dui rhoncus, sed pulvinar dui rhoncus. Nunc molestie interdum dapibus. In eget vulputate mauris. Nullam cursus maximus nisi nec porta. Nunc nisl quam, molestie elementum libero ut, suscipit mollis neque.</p>
        <p style="padding: 1em">Pellentesque efficitur odio eu purus aliquam auctor. Nunc molestie, ante vitae iaculis pellentesque, velit velit consequat nibh, sed commodo est lectus non ipsum. Morbi vel tristique libero. Sed finibus mollis ultrices. In lobortis odio in nibh laoreet, non egestas risus fermentum. Donec imperdiet sodales lacus, eget pulvinar purus sollicitudin sed. Proin quis mauris leo. Praesent fringilla est ipsum, nec dictum felis hendrerit ut. Curabitur scelerisque vel nunc eu gravida.</p>
        <p style="padding: 1em">Quisque aliquam pharetra magna eget semper. Pellentesque vitae tincidunt dui. Nunc id feugiat ante. Curabitur et convallis nulla, id eleifend justo. Quisque congue orci et imperdiet facilisis. Nulla facilisi. Mauris et leo luctus metus pellentesque consequat ac ut sapien. Fusce a ipsum at quam dapibus commodo sit amet non erat. Mauris bibendum sem sit amet justo ultricies, nec aliquam quam dignissim. In viverra posuere quam vel convallis. Morbi ultricies erat nec justo volutpat consequat.</p>
        <p style="padding: 1em">Morbi pulvinar interdum accumsan. Pellentesque dapibus eu dui ut dignissim. Sed vestibulum felis et felis fermentum vehicula. Morbi porttitor quis ex condimentum scelerisque. In ac arcu fringilla, iaculis eros vitae, convallis elit. Morbi blandit feugiat massa, gravida hendrerit metus viverra at. Donec eu sapien ultricies, blandit mi vel, venenatis nibh. Suspendisse potenti. Mauris sit amet nulla dolor. Maecenas dictum turpis vel vestibulum malesuada. Donec bibendum, purus ut convallis dapibus, ipsum risus iaculis risus, id iaculis magna eros quis purus. Cras convallis tincidunt sapien sit amet feugiat. Vivamus ut vulputate turpis. Phasellus lacus tellus, rhoncus id dolor nec, fringilla vulputate augue.</p>
        <p style="padding: 1em">Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam ante tortor, dapibus at pharetra vel, vulputate in metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In blandit iaculis tincidunt. Cras non arcu in orci varius luctus. Vestibulum quis porttitor metus. Sed accumsan leo a quam placerat feugiat at sit amet leo. Vestibulum luctus hendrerit mi nec malesuada.</p>
      </div>
    </main>
    `,
  }),
};
