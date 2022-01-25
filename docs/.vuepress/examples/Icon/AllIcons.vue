<template>
  <section class="all-icons">
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
        `/assets/Packages/Icon/${icon.group}Feather${icon.name}.svg`
      );
    },
  },
  components: {
    FeatherIcon,
    FeatherInput,
  },
};
</script>
<style>
.open-dark .all-icons img {
  filter: invert(96%) sepia(1%) saturate(926%) hue-rotate(144deg)
    brightness(111%) contrast(100%);
}

.open-light .all-icons img {
  filter: invert(0%) sepia(100%) saturate(7500%) hue-rotate(59deg)
    brightness(89%) contrast(111%);
}
</style>
<style scoped lang="scss">
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    display: inline-block;
    font-size: 1.5rem;
    color: var($secondary-text-on-surface);
    text-align: center;
    width: 9.375rem;
    padding: 0.5rem;
    img {
      height: 3rem;
      width: 3rem;
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
