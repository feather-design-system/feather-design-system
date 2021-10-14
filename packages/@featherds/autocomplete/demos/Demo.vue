<template>
  <section class="feather-container">
    <div class="feather-row">
      <FeatherAutocomplete
        class="feather-col-6"
        data-ref-id="test"
        label="Users"
        v-model="value"
        :loading="loading"
        :results="results"
        type="multi"
        @search="search"
        background
      ></FeatherAutocomplete>
    </div>
  </section>
</template>
<script>
import * as components from "./../src";
import icon from "@featherds/icon/notification/Warning";
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
  "Scarlettxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
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
  watch: {
    value(v) {
      v.forEach((item, i) => {
        if (item._text === "Liam" && !item._pre) {
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
          .map((x) => {
            // if (x === "William") {
            //   return {
            //     _pre: {
            //       icon: icon,
            //       title: "There is an issue with this selection"
            //     },
            //     _text: x
            //   };
            // }
            return {
              _text: x,
            };
          });
        this.loading = false;
      }, 500);
    },
  },
  mounted() {
    setTimeout(() => {
      this.value = [{ _text: "Liam" }];
    }, 50);
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
