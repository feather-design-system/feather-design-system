<template>
  <section>
    <div class="feather-row">
      <div class="feather-col-3">
        <FeatherInput label="Search Icons" v-model="search" clear />
      </div>
    </div>
    <h3>Feather Icons</h3>
    <div v-if="!featherIcons.length">No matches</div>
    <div v-for="group in featherIcons" :key="'feather' + group.group">
      <h4>{{ group.group }}</h4>
      <ul>
        <li
          v-for="icon in group.icons"
          :key="'feather' + icon.group + icon.name"
        >
          <img :src="getFeatherSrc(icon)" class="icon" />
          <span class="icon-name" :title="icon.name">{{ icon.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import { FeatherInput } from "@featherds/input";
import data from "./icons.json";
export default {
  data() {
    return {
      search: "",
      feather: data.feather,
    };
  },
  computed: {
    featherIcons() {
      const filtered = this.feather.map((x) => {
        return {
          ...x,
          icons: x.icons.filter(
            (i) => i.name.toLowerCase().indexOf(this.search) > -1
          ),
        };
      });
      return filtered.filter((x) => x.icons.length > 0);
    },
  },
  methods: {
    getFeatherSrc(icon) {
      return this.$withBase(
        `/assets/Packages/icon/${icon.group}Feather${icon.name}.svg`
      );
    },
  },
  components: {
    FeatherIcon,
    FeatherInput,
  },
};
</script>
<style scoped lang="scss">
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    display: inline-block;
    font-size: 24px;
    color: var($secondary-text-on-surface);
    text-align: center;
    width: 150px;
    padding: 8px;
    img {
      height: 48px;
      width: 48px;
    }
    .icon-name {
      @include caption();
      color: var($secondary-text-on-surface);
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
