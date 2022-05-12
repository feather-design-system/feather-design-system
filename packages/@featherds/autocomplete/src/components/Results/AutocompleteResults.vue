<template>
  <FeatherList
    class="feather-autocomplete-results-list"
    tabindex="-1"
    aria-hidden="false"
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
          :text="(item[textProp] as string)"
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
<script lang="ts">
import { toView } from "@featherds/utils/scroll";
import { FeatherListItem, FeatherList } from "@featherds/list";
import Highlighter from "../Highlight/Highlighter.vue";
import HighlightProps from "../Highlight/HighlightProps";
import HighlighterProps from "../Highlight/HighlighterProps";
import { defineComponent, PropType, ComponentPublicInstance } from "vue";
import { IAutocompleteItemType } from "../types";
export default defineComponent({
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
      type: Array as PropType<IAutocompleteItemType[]>,
      required: true,
    },
    value: {
      type: [Array, Object] as PropType<
        IAutocompleteItemType[] | IAutocompleteItemType
      >,
      default: () => [],
    },
    textProp: {
      type: String as unknown as PropType<keyof IAutocompleteItemType>,
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
    ...HighlightProps,
    ...HighlighterProps,
  },
  watch: {
    activeIndex(index: number) {
      if (index > -1) {
        this.$nextTick(() => {
          const el = Array.prototype.slice.call(
            this.$el.querySelectorAll("li")
          )[index];
          const component = this.$refs.list as ComponentPublicInstance;
          toView(el, component.$el);
        });
      }
    },
  },
  methods: {
    isSelected(item: IAutocompleteItemType) {
      const value = this.value as IAutocompleteItemType[];
      if (value && value.length) {
        return value.some((x) => x[this.textProp] === item[this.textProp]);
      }
      const singleValue = this.value as IAutocompleteItemType;
      return singleValue[this.textProp] === item[this.textProp];
    },
    isActive(index: number) {
      return this.activeIndex === index;
    },
    getId(index: number) {
      return index === this.activeIndex ? this.activeId : null;
    },
    select(item: IAutocompleteItemType) {
      this.$emit("select", item);
    },
  },
  components: {
    FeatherList,
    FeatherListItem,
    Highlighter,
  },
});
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
      margin: 0.5rem 0;
      border-bottom: 1px solid var($border-light-on-surface);
    }
  }
  .autocomplete-item-new-label {
    background-color: var($border-on-surface);
    color: var($primary);
    padding: 0.25rem 0.5rem;
    display: inline-block;
    margin-left: 0.25rem;
  }
}
</style>
<style lang="scss">
@import "../../../scss/mixins";
.feather-autocomplete-results-list {
  @include autocomplete-results-height(6);
}
</style>
