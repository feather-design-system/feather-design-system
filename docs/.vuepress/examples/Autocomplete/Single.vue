<template>
  <section>
    <p>
      This autocomplete allow you a single item. Try searching for <b>ja</b>
    </p>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Users"
      v-model="value"
      :loading="loading"
      :results="results"
      type="single"
      @search="search"
    ></FeatherAutocomplete>
  </section>
</template>
<script lang="ts">
import {
  FeatherAutocomplete,
  IAutocompleteItemType,
} from "@featherds/autocomplete";
import names from "./users";

import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      timeout: -1,
      loading: false,
      results: [] as IAutocompleteItemType[],
      value: undefined as unknown as IAutocompleteItemType,
    };
  },
  methods: {
    search(q: string) {
      this.loading = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.results = names
          .filter((x) => x.toLowerCase().indexOf(q) > -1)
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
});
</script>
<style lang="scss" scoped>
.my-autocomplete {
  width: 25rem !important;
}
</style>
