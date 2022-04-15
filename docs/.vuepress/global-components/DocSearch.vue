<template>
  <FeatherIcon
    class="search-icon"
    title="Search Feather..."
    :icon="iconSearch"
  />
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
        apiKey: "acee25b8be32816eb05f42385ed1bd07",
        indexName: "feather_design",
        appId: "5VUTEQZ060",
      });
    });
    return { iconSearch };
  },
  components: {
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.search-icon {
  color: var($secondary-text-on-color);
  font-size: 1.5rem;
  position: relative;
  top: 0px;
  left: 3rem;
  margin-left: -1.5rem;
}
#search-container {
  :deep(.DocSearch-Search-Icon) {
    visibility: hidden;
  }
}
</style>
