<template>
  <section>
    <FeatherAutocomplete
      class="my-autocomplete"
      label="Users"
      v-model="value"
      :loading="loading"
      :results="results"
      text-prop="name"
      type="multi"
      @search="search"
      background
      :grid-config="config"
    ></FeatherAutocomplete>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
const people = [
  {
    name: "Clarke",
    email: "cwinwright0@blogtalkradio.com",
    car: "Porsche",
    order: 20,
  },
  {
    name: "Torrey",
    email: "torteaux1@dedecms.com",
    car: "Dodge",
    order: 43,
  },
  {
    name: "Chad",
    email: "cwestmacott2@goo.ne.jp",
    car: "Ford",
    order: 36,
  },
  {
    name: "Gloriane",
    email: "gpersicke3@latimes.com",
    car: "Lincoln",
    order: 52,
  },
  {
    name: "Alfred",
    email: "amcrae4@mediafire.com",
    car: "Lexus",
    order: 75,
  },
  {
    name: "Lindi",
    email: "lkliemchen5@rakuten.co.jp",
    car: "Chrysler",
    order: 34,
  },
  {
    name: "Reg",
    email: "rsmardon6@hc360.com",
    car: "Dodge",
    order: 78,
  },
  {
    name: "Yalonda",
    email: "ygudgen7@e-recht24.de",
    car: "Isuzu",
    order: 24,
  },
  {
    name: "Shep",
    email: "sgreasley8@tamu.edu",
    car: "Land Rover",
    order: 79,
  },
  {
    name: "Rori",
    email: "rcapewell9@netlog.com",
    car: "Suzuki",
    order: 27,
  },
  {
    name: "Mechelle",
    email: "mlancastlea@auda.org.au",
    car: "Acura",
    order: 33,
  },
  {
    name: "Nana",
    email: "ndemeyerb@php.net",
    car: "Ford",
    order: 73,
  },
  {
    name: "Padget",
    email: "pfurzerc@xrea.com",
    car: "BMW",
    order: 62,
  },
  {
    name: "Sigfried",
    email: "sbuckhamd@sitemeter.com",
    car: "Mitsubishi",
    order: 94,
  },
  {
    name: "Jocko",
    email: "jlowdee@yellowbook.com",
    car: "Mazda",
    order: 68,
  },
  {
    name: "Dolorita",
    email: "dsignoretf@qq.com",
    car: "Chevrolet",
    order: 55,
  },
  {
    name: "Linnea",
    email: "lcailg@columbia.edu",
    car: "Porsche",
    order: 74,
  },
  {
    name: "Kimble",
    email: "kdegouyh@bloglovin.com",
    car: "Volvo",
    order: 28,
  },
  {
    name: "Roby",
    email: "rmaggsi@phoca.cz",
    car: "Mercury",
    order: 2,
  },
  {
    name: "Fredrika",
    email: "fleimsterj@redcross.org",
    car: "Audi",
    order: 62,
  },
];
import {
  IAutocompleteItemType,
  IAutocompleteGridColumn,
} from "@featherds/autocomplete";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      timeout: -1,
      loading: false,
      results: [] as IAutocompleteItemType[],
      value: [] as IAutocompleteItemType[],
      config: [
        {
          title: "Name",
          prop: "name",
        },
        {
          title: "Email",
          prop: "email",
        },
        {
          title: "Car",
          prop: "car",
        },
        {
          title: "Order",
          prop: "order",
          align: "right",
        },
      ] as IAutocompleteGridColumn[],
    };
  },
  methods: {
    search(q: string) {
      this.loading = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.results = people.filter(
          (x) => x.name.toLowerCase().indexOf(q) > -1
        );

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
