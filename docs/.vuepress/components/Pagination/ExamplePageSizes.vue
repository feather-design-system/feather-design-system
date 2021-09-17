<template>
  <section>
    <FeatherPagination
      v-model="page"
      :pageSize="pageSize"
      :total="total"
      @update:pageSize="updatePageSize"
      :pageSizes="pageSizes"
    ></FeatherPagination>
  </section>
</template>
<script>
import { FeatherPagination } from "@featherds/pagination";
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 1000,
      pageSizes: [10, 15, 20, 100],
    };
  },
  methods: {
    updatePageSize(v) {
      this.pageSize = v;
    },
  },
  components: {
    FeatherPagination,
  },
};
</script>
