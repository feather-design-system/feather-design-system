<template>
  <section>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Users"
      v-model="value"
      :loading="loading"
      :results="results"
      error="Required"
      type="multi"
      @search="search"
      background
    ></FeatherAutocomplete>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
const names = [
  "Liam",
  "Emma",
  "Noah",
  "Olivia",
  "William",
  "Ava",
  "James",
  "Isabella",
  "Oliver",
  "Sophia",
  "Benjamin",
  "Charlotte",
  "Elijah",
  "Mia",
  "Lucas",
  "Amelia",
  "Mason",
  "Harper",
  "Logan",
  "Evelyn",
  "Alexander",
  "Abigail",
  "Ethan",
  "Emily",
  "Jacob",
  "Elizabeth",
  "Michael",
  "Mila",
  "Daniel",
  "Ella",
  "Henry",
  "Avery",
  "Jackson",
  "Sofia",
  "Sebastian",
  "Camila",
  "Aiden",
  "Aria",
  "Matthew",
  "Scarlett",
];
import { IAutocompleteItemType } from "@featherds/autocomplete";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      timeout: -1,
      loading: false,
      results: [] as IAutocompleteItemType[],
      value: [] as IAutocompleteItemType[],
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
    ...components,
  },
});
</script>
<style lang="scss" scoped>
.my-autocomplete {
  width: 25rem !important;
}
</style>
