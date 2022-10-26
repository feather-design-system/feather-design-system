<template>
  <section>
    <FeatherAutocomplete
      class="my-autocomplete e2e-class"
      label="Users"
      v-model="value"
      :loading="loading"
      :results="results"
      type="single"
      @search="search"
      background
    ></FeatherAutocomplete>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Users 2"
      v-model="val2"
      :loading="loading"
      :results="results"
      type="single"
      @search="search"
      background
    ></FeatherAutocomplete>

    <FeatherAutocomplete
      class="my-autocomplete e2e-class"
      label="Users"
      v-model="value"
      type="single"
      background
      disabled
    ></FeatherAutocomplete>
    <FeatherAutocomplete
      class="my-autocomplete e2e-class"
      label="Users"
      v-model="value"
      type="single"
      background
      error="something went wrong"
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
import {
  _setTimeout,
  TimeoutResult,
  _clearTimeout,
} from "@featherds/utils/setTimeout";
export default defineComponent({
  data() {
    return {
      timeout: undefined as unknown as TimeoutResult,
      loading: false,
      results: [] as IAutocompleteItemType[],
      value: undefined as unknown as IAutocompleteItemType,
      val2: { _text: names[0], test: null },
    };
  },
  methods: {
    search(q: string) {
      this.loading = true;
      clearTimeout(this.timeout);
      this.timeout = _setTimeout(() => {
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
    ...components,
  },
});
</script>
<style lang="scss" scoped>
.my-autocomplete {
  width: 25rem !important;
}
</style>
