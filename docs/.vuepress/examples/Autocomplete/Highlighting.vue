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
});
</script>
<style lang="scss" scoped>
.my-autocomplete {
  width: 25rem !important;
}
</style>
