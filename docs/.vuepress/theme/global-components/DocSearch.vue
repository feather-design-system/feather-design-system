<template>
  <FeatherIcon class="search-icon" title="Search Feather..." :icon="iconSearch" />
  <div id="search-container"></div>
</template>
<script>
import docsearch from "@docsearch/js";
import "@docsearch/css";
import { onMounted } from "vue";
import { useDocSearch } from "./useDocSearch";
import { FeatherIcon } from "@featherds/icon";
import Search from "@featherds/icon/action/Search";
export default {
  setup() {
    const iconSearch = Search;
    const options = useDocSearch();
    onMounted(() => {
      docsearch({
        ...options,
        container: "#search-container",
        apiKey: "3586ad692e4fd2ca21e8ad06f4181eaf",
        indexName: "feather_design",
      });
    });
    return { iconSearch };
  },
  components: {
    FeatherIcon,
  }
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
.search-icon {
  color: var($secondary-text-on-color);
  font-size: 24px;
  position: relative;
  top: 0px;
  left: 48px;
  margin-left: -24px;
}
#search-container {
  ::v-deep(.DocSearch-Search-Icon) {
    visibility: hidden;
  }
}
</style>
