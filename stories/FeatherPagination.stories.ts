import { Meta, StoryObj } from "@storybook/vue3";
import { FeatherPagination } from "@featherds/pagination";

const meta: Meta<typeof FeatherPagination> = {
  title: "FeatherDS/Pagination/FeatherPagination",
  component: FeatherPagination,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "number" },
    total: { control: "number" },
    pageSize: { control: "select", options: [10, 20, 50] },
    labels: { conrol: "json" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: 1,
    total: 100,
    pageSize: 10,
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    labels: {
      rowsPerPage: "Patients shown per page",
      range: "Showing ${start} - ${end} of ${total} total patients",
      first: "Go to beginning",
      last: "Go to end",
      next: "Next page",
      previous: "Previous page",
      paginationLabel: "Pagination controls",
    },
  },
};

export const CustomPageSizes: Story = {
  argTypes: {
    pageSize: { control: "select", options: [5, 10, 20, 50] },
  },
  args: {
    ...Default.args,
    pageSize: 5,
    pageSizes: [5, 10, 20, 50],
    total: 45,
  },
};
