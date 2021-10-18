<template>
  <div id="search-container"></div>
</template>
<script>
import docsearch from "@docsearch/js";
import "@docsearch/css";
import { onMounted } from "vue";
import { useDocSearch } from "./useDocSearch";
export default {
  setup() {
    const options = useDocSearch();
    onMounted(() => {
      docsearch({
        ...options,
        container: "#search-container",
        apiKey: "3586ad692e4fd2ca21e8ad06f4181eaf",
        indexName: "feather_design",
      });
    });
  },
};
</script>
