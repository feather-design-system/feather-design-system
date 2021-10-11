<template>
  <FeatherList
    class="feather-autocomplete-results-list"
    tabindex="-1"
    aria-hidden="false"
    aria-live="polite"
    role="listbox"
    :aria-multiselectable="single ? 'false' : 'true'"
    ref="list"
  >
    <!-- eslint-disable -->
    <template v-for="(item, index) in items" :key="item[textProp]">
      <FeatherListItem
        as-li
        :id="getId(index)"
        tabindex="-1"
        role="option"
        class="result-item hover"
        :aria-selected="isSelected(item)"
        :highlighted="isActive(index)"
        :selected="isSelected(item)"
        @click.stop="select(item)"
      >
        <Highlighter
          :highlight="highlight"
          :query="query"
          :text="item[textProp]"
        />
        <span class="autocomplete-item-new-label" v-if="item._new">{{
          newLabel
        }}</span>
      </FeatherListItem>
      <li
        v-if="items.length !== 1 && item._new"
        role="presentation"
        :key="item[textProp] + 'hr'"
        class="hr"
      ></li>
    </template>
  </FeatherList>
</template>
<script>
import { toView } from "@featherds/utils/scroll";
import { FeatherListItem, FeatherList } from "@featherds/list";
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
    activeIndex: {
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
    newLabel: {
      type: String,
      default: "new",
    },
  },
  watch: {
    activeIndex(index) {
      if (index > -1) {
        this.$nextTick(() => {
          const el = Array.prototype.slice.call(
            this.$el.querySelectorAll("li")
          )[index];
          toView(el, this.$refs.list.$el);
        });
      }
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
      return this.activeIndex === index;
    },
    getId(index) {
      return index === this.activeIndex ? this.activeId : null;
    },
    select(item) {
      this.$emit("select", item);
    },
  },
  components: {
    FeatherList,
    FeatherListItem,
    Highlighter,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";

.feather-autocomplete-results-list {
  overflow-y: auto;
  width: 100%;
  li {
    &.hr {
      height: 0;
      margin: 8px 0;
      border-bottom: 1px solid var($border-light-on-surface);
    }
  }
  .autocomplete-item-new-label {
    background-color: var($border-on-surface);
    color: var($primary);
    padding: 4px 8px;
    display: inline-block;
    margin-left: 6px;
  }
}
</style>
<style lang="scss">
@import "../../../scss/mixins";
.feather-autocomplete-results-list {
  @include autocomplete-results-height(6);
}
</style>
