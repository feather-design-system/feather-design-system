<template>
  <section>
    <FeatherPagination
      v-model="page"
      :pageSize="pageSize"
      :total="total"
      @update:pageSize="updatePageSize"
      :labels="labels"
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
      total: 100,
      labels: {
        rowsPerPage: "per page",
        range: "START:${start} END: ${end} TOTAL: ${total}",
        first: "first page please",
        last: "last page please",
        next: "next page please",
        previous: "previous page please",
      },
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
