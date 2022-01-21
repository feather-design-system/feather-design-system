<template>
  <section>
    <p>
      This autocomplete uses the <code>ignore-case</code> method for
      highlighting. See <a href="#highlighting">Highlighting</a> section.
    </p>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Users"
      type="single"
      v-model="value"
      :loading="loading"
      :results="results"
      @search="search"
      highlight="ignore-case"
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
  width: 25rem !important;
}
</style>
