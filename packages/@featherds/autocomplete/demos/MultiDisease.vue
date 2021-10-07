<template>
  <section>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Disease"
      v-model="value"
      :loading="loading"
      :results="results"
      :min-char="3"
      type="multi"
      @search="search"
      background
    ></FeatherAutocomplete>
  </section>
</template>
<script>
import * as components from "./../src";
const names = [
  "Ankylosing",
  "B-cell Chronic Lymphocytic Leukemia",
  "Crohn’s Disease",
  "Chronic Inflammatory Demyelinating Polyneuropathy (CIDP)",
  "Hidradenitis Suppurativa",
  "Immune Thrombocytopenia Purpura",
  "Juvenile Idiopathic Arthritis",
  "Kawasaki Syndrome",
  "Kidney transplant – prophylaxis",
  "Multifocal Motor Neuropathy",
  "Plaque Psoriasis",
  "Primary Humoral Immodeficiency",
  "Psoriasis",
  "Psoriatic Arthritis",
  "Rheumatoid Arthritis",
  "Ulcerative Colitis",
  "Uveitis",
];
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
    ...components,
  },
};
</script>
<style lang="scss" scoped>
.my-autocomplete {
  width: 400px !important;
}
</style>
