<template>
  <section>
    <h2>Autocomplete with ability to add new</h2>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Car Manufacturer"
      v-model="component"
      :loading="loading"
      :results="componentResults"
      type="single"
      @search="search"
      background
      allow-new
      @new="addComponent"
    ></FeatherAutocomplete>
    <h2>Single Select</h2>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Car Manufacturer"
      v-model="component2"
      :loading="loading"
      :results="componentResults"
      type="single"
      @search="search"
      background
    ></FeatherAutocomplete>
    <h2>Multi Select Autocomplete with Grid</h2>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Car Manufacturers"
      v-model="component3"
      :loading="loading"
      :results="componentResults"
      type="multi"
      :grid-config="gridConfig"
      @search="search"
      background
    ></FeatherAutocomplete>
  </section>
</template>
<script>
import { FeatherAutocomplete } from "@featherds/autocomplete";
const components = [
  { _text: "Honda", version: "v2.2.1" },
  { _text: "Mazda", version: "v3.5.0" },
  { _text: "Ford", version: "v1.2.0" },
  { _text: "Kia", version: "v2.2.3" },
];
export default {
  data() {
    return {
      timeout: -1,
      loading: false,
      componentResults: [],
      component: undefined,
      component2: undefined,
      component3: [],
      gridConfig: [
        {
          prop: "_text",
          title: "Name",
        },
        {
          prop: "version",
          title: "Version",
        },
      ],
    };
  },
  methods: {
    search(q) {
      this.loading = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.componentResults = components.filter(
          (x) => x._text.toLowerCase().indexOf(q.toLowerCase()) > -1
        );

        this.loading = false;
      }, 500);
    },
    addComponent(component) {
      const mock = {
        _text: component,
        version: `v${Math.floor(Math.random() * 3) + 1}.${
          Math.floor(Math.random() * 5) + 1
        }.${Math.floor(Math.random() * 5) + 1}`,
      };
      components.push(mock);
      this.component = mock;
    },
  },
  components: {
    FeatherAutocomplete,
  },
};
</script>
<style lang="scss" scoped>
.my-autocomplete {
  width: 400px !important;
}
</style>
