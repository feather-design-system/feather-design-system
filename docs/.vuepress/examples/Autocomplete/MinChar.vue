<template>
  <section>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Users"
      type="single"
      v-model="value"
      :loading="loading"
      :results="results"
      @search="search"
      :min-char="2"
      :labels="labels"
    ></FeatherAutocomplete>
  </section>
</template>
<script>
import { FeatherAutocomplete } from "@featherds/autocomplete";
import names from "./users";
export default {
  data() {
    return {
      timeout: -1,
      loading: false,
      results: [],
      value: undefined,
      minChar: 2,
      labels: {
        minChar: "ASK UX FOR MIN CHAR TEXT ${min}",
        noResults: "ASK UX FOR NO RESULTS TEXT",
        clear: " ASK UX FOR CLEAR TEXT",
      },
    };
  },
  methods: {
    search(q) {
      this.loading = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.results = names
          .filter((x) => x.toLowerCase().indexOf(q.toLowerCase()) > -1)
          .map((x) => ({
            _text: x,
          }));
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
