<template>
  <FeatherList
    v-bind="listAttrs"
    ref="list"
    class="feather-select-options-list"
  >
    <!-- eslint-disable -->
    <template v-for="(item, index) in options" :key="item[textProp]">
      <FeatherListItem
        as-li
        :id="getId(index)"
        role="option"
        tabindex="-1"
        class="result-item"
        :aria-selected="isSelected(index)"
        :selected="isSelected(index)"
        @click="select(item)"
      >
        {{ item[textProp] }}
      </FeatherListItem>
    </template>
  </FeatherList>
</template>
<script>
import { FeatherList, FeatherListItem } from "@featherds/list";
import { getSafeId } from "@featherds/utils/id";
import { toView } from "@featherds/utils/scroll";
export default {
  inheritAttrs: true,
  emits: ["select"],
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    textProp: {
      type: String,
      default: "_text",
    },
    activeIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    activeId() {
      return getSafeId("feather-select-active");
    },
    listAttrs() {
      return {
        tabindex: -1,
        role: "listbox",
        "aria-label": this.label,
        "aria-activedescendant": this.activeId,
      };
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
    isSelected(index) {
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
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/mixins/typography";
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/themes/utils";

.feather-select-options-list {
  overflow-y: auto;
  min-width: 100%;
}
</style>

<style lang="scss">
@import "../../scss/mixins";
.feather-select-options-list {
  @include select-menu-height(6);
}
</style>
