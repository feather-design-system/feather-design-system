<template>
  <div class="feather-autocomplete-results-grid" ref="grid">
    <table
      class="feather-autocomplete-results-grid-container"
      :class="cls"
      tabindex="-1"
      aria-hidden="false"
      aria-live="polite"
      role="grid"
      :aria-multiselectable="single ? 'false' : 'true'"
    >
      <thead>
        <tr role="row">
          <th v-for="item in config" :key="item.title">
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          role="row"
          v-for="(item, index) in items"
          :key="item[textProp]"
          :aria-selected="isSelected(item)"
          :class="{ focus: isActive(index), selected: isSelected(item) }"
          @click.stop="select(item)"
        >
          <td
            v-for="(col, colIndex) in config"
            :key="item[textProp] + col.prop"
            :id="getId(index, colIndex)"
            :class="{ 'focus-cell': isActiveCell(index, colIndex) }"
          >
            <Highlighter
              v-if="col.prop === textProp"
              :highlight="highlight"
              :query="query"
              :text="item[col.prop]"
            />
            <p v-else>{{ item[col.prop] }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { toView } from "@featherds/utils/scroll";
import Highlighter from "../Highlight/Highlighter";
import HighlightMixin from "../Highlight/HighlightMixin";
import HighlighterMixin from "../Highlight/HighlighterMixin";
export default {
  mixins: [HighlightMixin, HighlighterMixin],
  emits: ["select"],
  props: {
    activeId: {
      type: String,
      required: true,
    },
    activeRow: {
      type: Number,
      required: true,
    },
    activeCol: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: [Array, Object],
      default: () => [],
    },
    textProp: {
      type: String,
      default: "_text",
    },
    single: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Array,
      required: true,
    },
  },
  watch: {
    activeRow(index) {
      if (index > -1) {
        this.$nextTick(() => {
          const el = Array.prototype.slice.call(
            this.$el.querySelectorAll("tr")
          )[index + 1]; //+1 for header
          toView(el, this.$refs.grid);
        });
      }
    },
  },
  computed: {
    cls() {
      return this.config.map((item, index) => {
        if (item.align && item.align.toLowerCase() === "right") {
          return `tr${index + 1}`;
        }
        if (item.align && item.align.toLowerCase() === "center") {
          return `tc${index + 1}`;
        }
        return `tl${index + 1}`;
      });
    },
  },
  methods: {
    isSelected(item) {
      if (this.value && this.value.length) {
        return this.value.some((x) => x[this.textProp] === item[this.textProp]);
      }
      return this.value[this.textProp] === item[this.textProp];
    },
    isActive(index) {
      return this.activeRow === index;
    },
    isActiveCell(row, col) {
      return this.activeRow === row && this.activeCol === col;
    },
    getId(index, col) {
      return index === this.activeRow && this.activeCol === col
        ? this.activeId
        : null;
    },
    select(item) {
      this.$emit("select", item);
    },
  },
  components: {
    Highlighter,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/mixins/typography";
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/themes/utils";
@import "~@featherds/table/scss/_table";
.feather-autocomplete-results-grid {
  overflow-y: scroll;
}
.feather-autocomplete-results-grid-container {
  @include table();
  @include table-condensed();
  @include row-hover();
  @include row-select();
  width: 100%;
  tr {
    &.selected {
      color: var($primary-text-on-surface);
    }

    &.focus td:first-child {
      box-shadow: inset 3px 0 0px 0px var($primary);
    }
    td {
      border: 1px solid transparent;
    }
    td.focus-cell {
      border: 1px solid var($primary);
    }
  }
  tbody tr {
    cursor: pointer;
  }
}
</style>
<style lang="scss">
@import "../../../scss/mixins";
.feather-autocomplete-results-grid {
  @include autocomplete-results-height(6);
}
</style>
