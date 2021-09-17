<template>
  <div class="fake-rail">
    <aside class="nav-rail">
      <div class="rail-title">Design</div>
      <FeatherList class="rail-list">
        <template v-for="group in groups" :key="group.name">
          <FeatherListHeader>{{ group.name }}</FeatherListHeader>
          <template v-for="item in group.items" :key="item.name">
            <FeatherListItem :href="item.url" :selected="isCurrent(item.url)">{{
              item.name
            }}</FeatherListItem>
          </template>
          <FeatherListSeparator />
        </template>
      </FeatherList>
    </aside>
  </div>
</template>
<script>
import {
  FeatherList,
  FeatherListItem,
  FeatherListHeader,
  FeatherListSeparator
} from "@featherds/list";
export default {
  data() {
    return {
      groups: [
        {
          name: "Principles",
          items: [
            { name: "Foundation", url: this.$withBase("/Design/Foundation/") },
          ],
        },
      ],
    };
  },
  methods: {
    isCurrent(url) {
      return this.$router.currentRoute.value.path === url;
    },
  },
  components: {
    FeatherList,
    FeatherListItem,
    FeatherListHeader,
    FeatherListSeparator,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/typography";
@import "~@featherds/styles/mixins/elevation";
@import "~@featherds/styles/mixins/flex";
@import "~@featherds/styles/themes/utils";
$width: 264px;
.nav-rail {
  transition: width 280ms ease-in-out;
  position: fixed;
  width: $width;
  left: 0;
  top: 60px;
  height: calc(100vh - 60px);
  background: var($background);
  color: var($primary-text-on-surface);
  overflow: auto;
}
.fake-rail {
  width: $width;
  height: calc(100vh - 60px);
}
.rail-title {
  border-bottom: 1px solid var($border-on-surface);
  padding: 8px 6px 8px 12px;
  @include headline4;
}

.rail-list {
  overflow-y: hidden;
}
</style>
