<template>
  <section>
    <p>
      This autocomplete automatically ads a warning icon to any selected value.
      See <a href="#chip-pre-icon">Chip Pre Icon</a> section.
    </p>
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
<script lang="ts">
import {
  FeatherAutocomplete,
  IAutocompleteItemType,
} from "@featherds/autocomplete";
import icon from "@featherds/icon/notification/Warning";
import names from "./users";
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
  watch: {
    value(v: IAutocompleteItemType[]) {
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
    search(q: string) {
      this.loading = true;
      clearTimeout(this.timeout);
      this.timeout = window.setTimeout(() => {
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
