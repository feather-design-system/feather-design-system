<template>
  <th data-ref-id="feather-sort-header" :aria-sort="ariaSort">
    <div
      class="header-flex-container content"
      tabindex="0"
      @click="linkClicked"
      role="button"
      :aria-describedby="descriptionId"
    >
      <span class="sort-cell-label"><slot></slot></span>
      <span class="description">{{ sortDescriptionLabel }}</span>
      <span class="hidden-description" :id="descriptionId">{{
        clickSortLabel
      }}</span>

      <span class="icon focus hover" aria-hidden="true">
        <FeatherIcon :icon="sortIcon"></FeatherIcon>
        <FeatherRipple center />
      </span>
    </div>
    <span
      class="alert"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref="alert"
    ></span>
  </th>
</template>
<script lang="ts">
import { FeatherIcon } from "@featherds/icon";
import { FeatherRipple } from "@featherds/ripple";
import ExpandLess from "@featherds/icon/navigation/ExpandLess";
import ExpandMore from "@featherds/icon/navigation/ExpandMore";
import UnfoldMore from "@featherds/icon/navigation/UnfoldMore";
import { SORT } from "../types/types";
import { getSafeId } from "@featherds/utils/id";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import { defineComponent, PropType, toRef } from "vue";
const LABELS = {
  sortAscending: "Sorted Ascending",
  sortDescending: "Sorted Descending",
  sortNone: "Sorted None",
  clickSort: "Click to Sort",
};
export const props = {
  sort: {
    type: String as PropType<SORT>,
    validator: function (value: SORT) {
      // The value must match either
      return (
        [SORT.ASCENDING, SORT.DESCENDING, SORT.NONE, "", undefined].indexOf(
          value
        ) !== -1
      );
    },
    required: true,
  },
  property: {
    type: String,
    required: true,
  },
  labels: {
    type: Object as PropType<Partial<typeof LABELS>>,
    default: () => {
      return LABELS;
    },
  },
} as const;
export const emits = {
  "sort-changed": (_v: { property: string; value: SORT }) => true,
};
export default defineComponent({
  emits: ["sort-changed"],
  props,
  setup(props) {
    return {
      ...useLabelProperty<typeof LABELS>(toRef(props, "labels"), LABELS),
    };
  },
  computed: {
    descriptionId() {
      return getSafeId("feather-sort-header-description");
    },
    sortIcon() {
      var result = UnfoldMore;
      if (this.sort === SORT.ASCENDING) {
        result = ExpandLess;
      }
      if (this.sort === SORT.DESCENDING) {
        result = ExpandMore;
      }
      return result;
    },
    ariaSort() {
      if (this.sort === SORT.ASCENDING) {
        return "ascending";
      } else if (this.sort === SORT.DESCENDING) {
        return "descending";
      } else {
        return "none";
      }
    },
    sortDescriptionLabel() {
      if (this.sort === SORT.NONE) {
        return this.sortNoneLabel;
      }
      return "";
    },
  },

  components: {
    FeatherIcon,
    FeatherRipple,
  },
  methods: {
    linkClicked: function (e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
      // this is run when only the sort is to change
      var sortDir;
      switch (this.sort) {
        case SORT.ASCENDING:
          sortDir = SORT.DESCENDING;
          break;
        case SORT.DESCENDING:
          sortDir = SORT.NONE;
          break;
        default:
          sortDir = SORT.ASCENDING;
      }
      this.$emit("sort-changed", {
        property: this.property,
        value: sortDir,
      });
      this.announceSort(sortDir);
    },
    announceSort(dir: SORT) {
      let label = this.sortNoneLabel;

      if (dir === SORT.ASCENDING) {
        label = this.sortAscendingLabel;
      } else if (dir === SORT.DESCENDING) {
        label = this.sortDescendingLabel;
      }

      (this.$refs.alert as HTMLElement).textContent = label;
      setTimeout(() => {
        (this.$refs.alert as HTMLElement).textContent = "";
      }, 100);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";
@import "@featherds/styles/mixins/typography";

th .header-flex-container {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bold;
  &.content {
    @include state-on-surface();
  }
  .sort-cell-label {
    display: inline-block;
    user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    -webkit-user-select: none;
  }

  &:focus {
    outline: 0;
  }
  span.icon {
    margin-left: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    position: relative;
    display: inline-flex;
    color: inherit;
    justify-content: center;
    align-items: center;
    flex: none;
    :deep(.feather-icon) {
      vertical-align: text-top;
      font-size: 1.125rem;
    }
    &:before,
    &:after {
      border-radius: 100%;
    }
  }
}
span.hidden-description {
  display: none;
}
span.description,
span.alert {
  @include screen-reader();
}
</style>
