<template>
  <section>
    <div>
      <FeatherPagination
        v-model="page"
        :pageSize="pageSize"
        :total="total"
        @update:pageSize="updatePageSize"
      ></FeatherPagination>
    </div>
  </section>
  <section class="pagination-demo">
    <div class="pagination-page">
      <h4>Page</h4>
      <p>
        <FeatherButton
          class="pagination-demo-btn-txt"
          id="page-subtract"
          @click="updatePage(-1)"
          secondary
          >-1</FeatherButton
        >
        <FeatherButton
          class="pagination-demo-btn-txt"
          id="page-add"
          @click="updatePage(1)"
          secondary
          >+1</FeatherButton
        >
      </p>
      <span id="current-page">Current Page: {{ page }}</span>
    </div>
    <div class="pagination-total">
      <h4>Total Records: ({{ total }})</h4>
      <p>
        <FeatherButton
          class="pagination-demo-btn-txt"
          id="total-subtract"
          @click="updateTotal(-1)"
          secondary
          >-1</FeatherButton
        >
        <FeatherButton
          class="pagination-demo-btn-txt"
          id="total-add"
          @click="updateTotal(1)"
          secondary
          >+1</FeatherButton
        >
      </p>
      <p>
        <FeatherButton
          class="pagination-demo-btn-txt"
          id="total-subtract"
          @click="updateTotal(-5)"
          secondary
          >-5</FeatherButton
        >
        <FeatherButton
          class="pagination-demo-btn-txt"
          id="total-add"
          @click="updateTotal(5)"
          secondary
          >+5</FeatherButton
        >
      </p>
      <p>
        <FeatherButton
          class="pagination-demo-btn-txt"
          id="total-subtract"
          @click="updateTotal(-10)"
          secondary
          >-10</FeatherButton
        >
        <FeatherButton
          class="pagination-demo-btn-txt"
          id="total-add"
          @click="updateTotal(10)"
          secondary
          >+10</FeatherButton
        >
      </p>
      <span id="total"> Total: {{ total }}</span>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { FeatherButton } from "@featherds/button";
import * as components from "./../src";
export default defineComponent({
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    updatePageSize(v: number) {
      this.pageSize = v;
    },
    updatePage(v: number) {
      const maxValue = this.page * this.pageSize;
      if ((v > 0 && maxValue < this.total) || v < 0) {
        this.page += v;
      }
    },
    updateTotal(v: number) {
      this.total += v;
    },
  },
  components: {
    ...components,
    FeatherButton,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";

.pagination-demo {
  padding-top: 4rem;
  .div {
    .button {
      background-color: var($primary);
    }
  }
}

.pagination-demo-btn-txt {
  font-size: large;
  margin: 0.5rem;
}

.pagination-page {
  border: 1px solid var($border-on-surface);
  padding: 0.5rem;
  border-bottom-style: none;
}

.pagination-total {
  border: 1px solid var($border-on-surface);
  padding: 0.5rem;
}
</style>
