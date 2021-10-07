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
    ></FeatherAutocomplete>
  </section>
</template>
<script>
import { FeatherAutocomplete } from "@featherds/autocomplete";
import icon from "@featherds/icon/notifications/ErrorOutline";
import names from "./users";
export default {
  data() {
    return {
      timeout: -1,
      loading: false,
      results: [],
      value: [],
    };
  },
  watch: {
    value(v) {
      v.forEach((item, i) => {
        if (!item._pre) {
          setTimeout(() => {
            this.value[i] = {
              _pre: {
                icon: icon,
                title: "There is an issue with this selection",
              },
              ...item,
            };
          }, 1000);
        }
      });
    },
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
    FeatherAutocomplete,
  },
};
</script>
<style lang="scss" scoped>
.my-autocomplete {
  width: 400px !important;
}
</style>
