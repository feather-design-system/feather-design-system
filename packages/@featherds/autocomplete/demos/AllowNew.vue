<template>
  <section>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Tag"
      v-model="tag2"
      :loading="loading"
      :results="results"
      type="single"
      @search="search"
      background
      allow-new
      @new="addTagSingle"
    ></FeatherAutocomplete>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
import { IAutocompleteItemType } from "@featherds/autocomplete";
const tags = ["removed", "release", "add", "update"];
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      timeout: -1,
      loading: false,
      results: [] as IAutocompleteItemType[],
      tag2: undefined as unknown as IAutocompleteItemType,
    };
  },
  methods: {
    search(q: string) {
      this.loading = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.results = tags
          .filter((x) => x.toLowerCase().indexOf(q.toLowerCase()) > -1)
          .map((x) => ({
            _text: x,
          }));
        this.loading = false;
      }, 500);
    },
    addTagSingle(tag: string) {
      tags.push(tag);
      this.tag2 = { _text: tag };
    },
  },
  components: {
    ...components,
  },
});
</script>
<style lang="scss" scoped>
.my-autocomplete {
  width: 25rem !important;
}
</style>
