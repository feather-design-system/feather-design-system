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
<script>
import * as components from "./../src";
const tags = ["removed", "release", "add", "update"];
export default {
  data() {
    return {
      timeout: -1,
      loading: false,
      results: [],
      tag2: undefined,
    };
  },
  methods: {
    search(q) {
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
    addTagSingle(tag) {
      tags.push(tag);
      this.tag2 = { _text: tag };
    },
  },
  components: {
    ...components,
  },
};
</script>
<style lang="scss" scoped>
.my-autocomplete {
  width: 400px !important;
}
</style>
