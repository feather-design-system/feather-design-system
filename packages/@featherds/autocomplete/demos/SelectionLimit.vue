<template>
  <section>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Users"
      v-model="value"
      :loading="loading"
      :results="results"
      type="multi"
      @search="search"
      :selection-limit="2"
      background
    ></FeatherAutocomplete>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Users"
      v-model="value"
      :loading="loading"
      :results="results"
      type="multi"
      @search="search"
      :selection-limit="2"
      :min-char="2"
      background
    ></FeatherAutocomplete>
  </section>
</template>
<script>
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
export default {
  data() {
    return {
      timeout: -1,
      loading: false,
      results: [],
      value: [],
    };
  },
  methods: {
    search(q) {
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
};
</script>
<style lang="scss" scoped>
.my-autocomplete {
  width: 25rem !important;
}
</style>
