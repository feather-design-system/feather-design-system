<template>
  <section>
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
<script>
import { FeatherAutocomplete } from "@featherds/autocomplete";
import people from "./userObjects";
export default {
  data() {
    return {
      timeout: -1,
      loading: false,
      results: [],
      value: [],
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
      ],
    };
  },
  methods: {
    search(q) {
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
};
</script>
<style lang="scss" scoped>
.my-autocomplete {
  width: 400px !important;
}
</style>
