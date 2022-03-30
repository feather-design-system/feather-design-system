<template>
  <section>
    <FeatherPagination
      v-model="page"
      :pageSize="pageSize"
      :total="total"
      @update:pageSize="updatePageSize"
    ></FeatherPagination>
    <p>
      Current Page: <span id="current-page">{{ page }}</span>
    </p>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as components from "./../src";
export default defineComponent({
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 100,
    };
  },
  methods: {
    updatePageSize(v: number) {
      this.pageSize = v;
    },
  },
  components: {
    ...components,
  },
});
</script>
