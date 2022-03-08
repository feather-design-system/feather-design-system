<template>
  <section>
    <p>
      This example allows you to add new items. The <code>new</code> event is
      triggered with the text for the new element. <b>You</b> must then create
      the new element and update <code>modelValue</code> to contain the new
      value. <code>addTag</code> method does that in this example.
    </p>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Tag"
      v-model="value"
      :loading="loading"
      :results="results"
      type="single"
      @search="search"
      allow-new
      @new="addTag"
    ></FeatherAutocomplete>
  </section>
</template>
<script lang="ts">
import {
  FeatherAutocomplete,
  IAutocompleteItemType,
} from "@featherds/autocomplete";
const tags = ["removed", "release", "add", "update"];
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
        this.results = tags
          .filter((x) => x.toLowerCase().indexOf(q) > -1)
          .map((x) => ({
            _text: x,
          }));
        this.loading = false;
      }, 500);
    },
    addTag(tag: string) {
      tags.push(tag);
      this.value = { _text: tag };
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
