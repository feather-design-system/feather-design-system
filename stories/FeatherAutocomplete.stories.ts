import { Meta, StoryObj } from "@storybook/vue3";

import {
  FeatherAutocomplete,
  IAutocompleteItemType,
} from "@featherds/autocomplete";

const data = [
  { _text: "Cairn Terrier", name: "Cairn Terrier" },
  { _text: "German Shephard", name: "German Shephard" },
  { _text: "Australian Shephard", name: "Australian Shephard" },
  { _text: "Collie", name: "Collie" },
  { _text: "Poodle", name: "Poodle" },
  { _text: "Doberman Pinscher", name: "Doberman Pinscher" },
  { _text: "Golden Retriever", name: "Golden Retriever" },
  { _text: "Labrador Retriever", name: "Labrador Retriever" },
  { _text: "Great Dane", name: "Great Dane" },
  { _text: "Jack Russell Terrier", name: "Jack Russell Terrier" },
  { _text: "Dachshund", name: "Dachshund" },
  { _text: "Bull Terrier", name: "Bull Terrier" },
  { _text: "English Bulldog", name: "English Bulldog" },
];

const meta: Meta<typeof FeatherAutocomplete> = {
  title: "FeatherDS/Autocomplete/FeatherAutocomplete",
  component: FeatherAutocomplete,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    results: { control: "object" },
  },
  args: {
    results: data,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSingle: Story = {
  args: {
    hint: "Select your favorite dog breed",
  },
  render: (args) => ({
    components: { FeatherAutocomplete },
    data() {
      return {
        timeout: -1,
        loading: false,
        results: [] as IAutocompleteItemType[],
        value: undefined as unknown as IAutocompleteItemType,
      };
    },
    setup() {
      return { args };
    },
    methods: {
      search(q: string) {
        this.loading = true;
        clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => {
          this.results = data
            .filter(
              (x) =>
                x._text.indexOf(q) > -1 || x._text.toLowerCase().indexOf(q) > -1
            )
            .map((x) => ({
              _text: x._text,
              name: x.name,
            }));
          this.loading = false;
        }, 500);
      },
    },
    template: `
    <FeatherAutocomplete
     label="Dog Breed"
     :hint="args.hint"
     v-model="value"
     type="single"
     :loading="loading"
     :results="results"
     @search="search"
     spellcheck="false"
    >
    </FeatherAutocomplete>
    `,
  }),
};

export const DefaultMulti: Story = {
  args: {
    hint: "Choose your favorite dog breeds. (Can choose more than one)",
  },
  render: (args) => ({
    components: { FeatherAutocomplete },
    data() {
      return {
        timeout: -1,
        loading: false,
        results: [] as IAutocompleteItemType[],
        value: undefined as unknown as IAutocompleteItemType[],
      };
    },
    setup() {
      return { args };
    },
    methods: {
      search(q: string) {
        this.loading = true;
        clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => {
          this.results = data
            .filter(
              (x) =>
                x._text.indexOf(q) > -1 || x._text.toLowerCase().indexOf(q) > -1
            )
            .map((x) => ({
              _text: x._text,
              name: x.name,
            }));
          this.loading = false;
        }, 500);
      },
    },
    template: `
    <FeatherAutocomplete
     label="Dog Breeds"
     type="multi"
     :hint=args.hint
     v-model="value"
     :loading="loading"
     :results="results"
     @search="search"
     spellcheck="false"
    >
    </FeatherAutocomplete>
    `,
  }),
};
// export const DefaultSingleSearch: Story = {
//   args: {
//     ...DefaultSingle.args,
//     onSearch: fn(),
//   },
//   play: async ({ args, canvasElement, step }) => {
//     const canvas = within(canvasElement);

//     await step("Enter search criteria", async () => {
//       await userEvent.type(canvas.getByText("Dog Breed"), "ca");
//     });

//     await step("Search...", async () => {
//       console.log(args.results?.length);
//       // await userEvent.hover(canvas.getByRole("textbox"));
//       // await userEvent.unhover(canvas.getByRole("textbox"));
//       // await userEvent.selectOptions("select")
//       await userEvent.click(canvas.getByRole("combobox"));
//       await search(args);
//     });
//   },
// };

export const MinChar: Story = {
  render: (args) => ({
    components: { FeatherAutocomplete },
    data() {
      return {
        timeout: -1,
        loading: false,
        results: [] as IAutocompleteItemType[],
        value: undefined as unknown as IAutocompleteItemType,
      };
    },
    setup() {
      return { args };
    },
    methods: {
      search(q: string) {
        this.loading = true;
        clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => {
          this.results = data
            .filter(
              (x) =>
                x._text.indexOf(q) > -1 || x._text.toLowerCase().indexOf(q) > -1
            )
            .map((x) => ({
              _text: x._text,
              name: x.name,
            }));
          this.loading = false;
        }, 500);
      },
    },
    template: `
    <FeatherAutocomplete
     label="Dog Breed"
     :hint="args.hint"
     v-model="value"
     type="single"
     :loading="loading"
     :results="results"
     @search="search"
     spellcheck="false"
     :minChar=3
    >
    </FeatherAutocomplete>
    `,
  }),
};

export const Loading: Story = {
  render: (args) => ({
    components: { FeatherAutocomplete },
    data() {
      return {
        timeout: -1,
        loading: true,
        results: [] as IAutocompleteItemType[],
        value: undefined as unknown as IAutocompleteItemType,
      };
    },
    setup() {
      return { args };
    },
    methods: {
      search(q: string) {
        this.loading = true;
        clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => {
          this.results = data
            .filter(
              (x) =>
                x._text.indexOf(q) > -1 || x._text.toLowerCase().indexOf(q) > -1
            )
            .map((x) => ({
              _text: x._text,
              name: x.name,
            }));
          this.loading = false;
        }, 500);
      },
    },
    template: `
    <FeatherAutocomplete
     label="Dog Breed"
     :hint="args.hint"
     v-model="value"
     type="single"
     :loading="loading"
     :results="results"
     @search="search"
     spellcheck="false"
    >
    </FeatherAutocomplete>
    `,
  }),
};
