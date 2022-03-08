<template>
  <section>
    <p>
      The results of this autocomplete appear in a grid. Please check out the
      <a href="#grid-config">Grid Config</a>
    </p>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Users"
      v-model="value"
      :loading="loading"
      :results="results"
      text-prop="name"
      type="multi"
      @search="search"
      :grid-config="config"
    ></FeatherAutocomplete>
  </section>
</template>
<script lang="ts">
import {
  FeatherAutocomplete,
  IAutocompleteGridColumn,
  IAutocompleteItemType,
} from "@featherds/autocomplete";
import people from "./userObjects";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      timeout: -1,
      loading: false,
      results: [] as IAutocompleteItemType[],
      value: [] as IAutocompleteItemType[],
      config: [
        {
          title: "Name",
          prop: "name",
        },
        {
          title: "Email",
          prop: "email",
        },
        {
          title: "Car",
          prop: "car",
        },
        {
          title: "Order",
          prop: "order",
          align: "right",
        },
      ] as IAutocompleteGridColumn[],
    };
  },
  methods: {
    search(q: string) {
      this.loading = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.results = people.filter(
          (x) => x.name.toLowerCase().indexOf(q) > -1
        );

        this.loading = false;
      }, 500);
    },
  },
  components: {
    FeatherAutocomplete,
  },
});
</script>
<style lang="scss" scoped>
.my-autocomplete {
  width: 25rem !important;
}
</style>
