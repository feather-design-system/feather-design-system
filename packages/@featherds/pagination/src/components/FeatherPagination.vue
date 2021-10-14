<template>
  <div class="feather-pagination">
    <div class="per-page-text">
      {{ perPageText }}
    </div>
    <FeatherSelect
      :label="perPageText"
      :modelValue="_pageSize"
      @update:modelValue="updatePageSize"
      :options="_pageSizes"
      inline
      class="page-size-select"
    />
    <div class="range-text">
      {{ rangeText }}
    </div>
    <nav :aria-label="paginationText">
      <ul>
        <li>
          <FeatherButton
            class="action"
            as-anchor
            href="#"
            ref="first"
            :icon="firstText"
            :disabled="disableBackward"
            @click.prevent="first"
            data-ref-id="feather-pagination-first-button"
          >
            <FeatherIcon :icon="firstIcon" />
          </FeatherButton>
        </li>
        <li>
          <FeatherButton
            class="action"
            as-anchor
            href="#"
            :icon="previousText"
            :disabled="disableBackward"
            @click.prevent="previous"
            data-ref-id="feather-pagination-previous-button"
          >
            <FeatherIcon :icon="previousIcon" />
          </FeatherButton>
        </li>
        <li>
          <FeatherButton
            class="action"
            as-anchor
            href="#"
            :icon="nextText"
            :disabled="disableForward"
            @click.prevent="next"
            data-ref-id="feather-pagination-next-button"
          >
            <FeatherIcon :icon="nextIcon" />
          </FeatherButton>
          <FeatherButton
            class="action"
            as-anchor
            href="#"
            :icon="lastText"
            :disabled="disableForward"
            @click.prevent="last"
            data-ref-id="feather-pagination-last-button"
          >
            <FeatherIcon :icon="lastIcon" />
          </FeatherButton>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { FeatherSelect } from "@featherds/select";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import ChevronLeft from "@featherds/icon/navigation/ChevronLeft";
import ChevronRight from "@featherds/icon/navigation/ChevronRight";
import FirstPage from "@featherds/icon/navigation/FirstPage";
import LastPage from "@featherds/icon/navigation/LastPage";
import { markRaw } from "vue";

const LABELS = {
  rowsPerPage: "Rows per page",
  range: "${start} - ${end} of ${total}",
  first: "Go to first page",
  last: "Go to last page",
  next: "Go to next page",
  previous: "Go to previous page",
  paginationLabel: "Pagination controls",
};
export default {
  emits: ["update:modelValue", "update:pageSize"],
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props: {
    labels: {
      type: Object,
      default: () => {
        return LABELS;
      },
    },
    modelValue: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50],
    },
    pageSize: {
      type: Number,
      required: true,
      default: 10,
    },
  },
  computed: {
    firstText() {
      return this.labels.first ? this.labels.first : LABELS.first;
    },
    firstIcon() {
      return markRaw(FirstPage);
    },
    lastText() {
      return this.labels.last ? this.labels.last : LABELS.last;
    },
    lastIcon() {
      return markRaw(LastPage);
    },
    nextText() {
      return this.labels.next ? this.labels.next : LABELS.next;
    },
    nextIcon() {
      return markRaw(ChevronRight);
    },
    previousText() {
      return this.labels.previous ? this.labels.previous : LABELS.previous;
    },
    previousIcon() {
      return markRaw(ChevronLeft);
    },
    perPageText() {
      return this.labels.rowsPerPage
        ? this.labels.rowsPerPage
        : LABELS.rowsPerPage;
    },
    paginationText() {
      return this.labels.paginationLabel
        ? this.labels.paginationLabel
        : LABELS.paginationLabel;
    },
    lastPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    disableForward() {
      return this.modelValue >= this.lastPage;
    },
    disableBackward() {
      return this.modelValue <= 1;
    },
    rangeText() {
      let result = this.labels.range ? this.labels.range : LABELS.range;
      result = result.replace("${total}", this.total);
      const start = this.modelValue * this.pageSize - this.pageSize + 1;
      if (start < 0 || start > this.total) {
        return "ERROR calculating start";
      }
      result = result.replace("${start}", start);
      let end = start + this.pageSize - 1;
      if (end > this.total) {
        end = this.total;
      }
      result = result.replace("${end}", end);
      return result;
    },
    _pageSize() {
      return { _text: this.pageSize };
    },
    _pageSizes() {
      return this.pageSizes.map((x) => {
        return {
          _text: x,
        };
      });
    },
  },
  methods: {
    updatePageSize(e) {
      this.$emit("update:pageSize", parseInt(e._text, 10));
      this.first();
    },
    first() {
      this.$emit("update:modelValue", 1);
    },
    last() {
      this.$emit("update:modelValue", this.lastPage);
    },
    next() {
      if (this.modelValue + 1 >= this.lastPage) {
        this.$emit("update:modelValue", this.lastPage);
        return;
      }
      this.$emit("update:modelValue", this.modelValue + 1);
    },
    previous() {
      if (this.modelValue - 1 <= 1) {
        this.$emit("update:modelValue", 1);
        return;
      }
      this.$emit("update:modelValue", this.modelValue - 1);
    },
  },
  components: {
    FeatherSelect,
    FeatherButton,
    FeatherIcon,
  },
};
</script>

<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
.feather-pagination {
  display: flex;
  border: 1px solid var($border-on-surface);
  color: var($secondary-text-on-surface);
  height: 56px;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: $spacing-l;
  .action {
    margin: 0 $spacing-m;
  }
  ul {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
      display: inline-block;
    }
  }
}
.page-size-select {
  width: 76px;
  margin-right: 38px;
  margin-left: 8px;
  display: flex;
}
.range-text {
  margin-right: 50px;
  min-width: 110px;
}
</style>
