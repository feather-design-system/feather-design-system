<template>
  <section>
    <p>
      This autocomplete has a 2 character limit. Try searching for <b>ja</b>
    </p>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Users"
      type="single"
      v-model="value"
      :loading="loading"
      :results="results"
      @search="search"
      :min-char="2"
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
