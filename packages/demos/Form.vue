<template>
  <div class="feather-row">
    <form class="feather-col-4">
      <FeatherInput label="First Name" v-model="firstName" background />
      <FeatherSelect
        label="State"
        background
        :options="states"
        v-model="state"
      />
      <FeatherAutocomplete
        label="Invitees"
        v-model="invitees"
        :loading="loading"
        :results="results"
        no-results-text="No results found"
        type="multi"
        @search="search"
        background
      />
      <FeatherCheckbox v-model="subscribed"
        >Subscribe to our glorious email spam</FeatherCheckbox
      >
    </form>
  </div>
</template>
<script>
import { FeatherInput } from "@featherds/input";
import { FeatherSelect } from "@featherds/select";
import { FeatherCheckbox } from "@featherds/checkbox";
import { FeatherAutocomplete } from "@featherds/autocomplete";
import states from "@featherds/select/demos/states.js";
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
].sort();
export default {
  data() {
    return {
      firstName: "",
      states,
      state: undefined,
      subscribed: true,
      invitees: [],

      timeout: -1,
      loading: false,
      results: [],
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
    FeatherInput,
    FeatherSelect,
    FeatherAutocomplete,
    FeatherCheckbox,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/lib/grid";
</style>
