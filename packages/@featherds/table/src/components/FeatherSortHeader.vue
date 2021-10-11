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
<script>
import { FeatherIcon } from "@featherds/icon";
import { FeatherRipple } from "@featherds/ripple";
import ExpandLess from "@featherds/icon/navigation/ExpandLess";
import ExpandMore from "@featherds/icon/navigation/ExpandMore";
import UnfoldMore from "@featherds/icon/navigation/UnfoldMore";
import { SORT } from "../types/types.js";
import { getSafeId } from "@featherds/utils/id";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import { toRef } from "vue";
import { markRaw } from "vue";
const LABELS = {
  sortAscending: "Sorted Ascending",
  sortDescending: "Sorted Descending",
  sortNone: "Sorted None",
  clickSort: "Click to Sort",
};

export default {
  emits: ["sort-changed"],
  props: {
    sort: {
      type: String,
      validator: function (value) {
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
      type: Object,
      default() {
        return LABELS;
      },
    },
  },
  data() {
    return {};
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
      return markRaw(result);
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
  setup(props) {
    return { ...useLabelProperty(toRef(props, "labels"), LABELS) };
  },
  components: {
    FeatherIcon,
    FeatherRipple,
  },
  methods: {
    linkClicked: function (e) {
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
    announceSort(dir) {
      let label = this.sortNoneLabel;

      if (dir === SORT.ASCENDING) {
        label = this.sortAscendingLabel;
      } else if (dir === SORT.DESCENDING) {
        label = this.sortDescendingLabel;
      }

      this.$refs.alert.textContent = label;
      setTimeout(() => {
        this.$refs.alert.textContent = "";
      }, 100);
    },
  },
};
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
  }

  &:focus {
    outline: 0;
  }
  span.icon {
    margin-left: 4px;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    position: relative;
    display: inline-flex;
    color: inherit;
    justify-content: center;
    align-items: center;
    flex: none;
    :deep(.feather-icon) {
      vertical-align: text-top;
      font-size: 18px;
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
