<template>
  <Chip
    v-bind="attrs"
    :disabled="disabled"
    :condensed="condensed"
    :class="{ hover: canClick, focus: canClick || canDelete }"
    role="row"
    :clickable="canClick"
  >
    <span role="gridcell" :aria-disabled="disabled">
      <span v-bind="chipTextAttrs" class="chip-label-button"
        ><PreIcon v-if="hasIcon"><slot name="icon" /></PreIcon>
        <Label :id="chipTextId"><slot /></Label
      ></span>
    </span>
    <DeleteIcon
      v-if="canDelete"
      :disabled="disabled"
      :text-id="chipTextId"
      :label="deleteLabel"
      role="gridcell"
      @delete="$emit('delete')"
    />
  </Chip>
</template>
<script lang="ts">
import { getSafeId } from "@featherds/utils/id";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import { toRef, computed, defineComponent, PropType } from "vue";
import Chip from "../base/Chip.vue";
import DeleteIcon from "../base/DeleteIcon.vue";
import Label from "../base/Label.vue";
import PreIcon from "../base/PreIcon.vue";

const LABELS = {
  delete: "Remove",
};
export default defineComponent({
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    labels: {
      type: Object as PropType<typeof LABELS>,
      default: () => {
        return LABELS;
      },
    },
    condensed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const labels = useLabelProperty(toRef(props, "labels"), LABELS);
    const chipTextId = computed(() => getSafeId("chip-text"));

    const handleClick = () => {
      if (props.disabled) {
        return;
      }
      context.emit("click");
    };

    const _attrs = { ...context.attrs };

    if (props.disabled) {
      delete _attrs.onClick;
    }

    return {
      ...labels,
      chipTextId,
      handleClick,
      attrs: _attrs,
    };
  },
  computed: {
    chipTextAttrs() {
      if (this.canClick) {
        return {
          role: "button",
          tabindex: "0",
        };
      }
      return {};
    },
    canDelete() {
      return !!this.$attrs.onDelete && !this.disabled;
    },
    canClick() {
      return !!this.$attrs.onClick && !this.disabled;
    },
    hasIcon() {
      const hasIcon =
        this.$slots.icon &&
        this.$slots
          .icon()
          .findIndex(
            (o) =>
              (o.children && o.children.length !== 0) ||
              typeof o.type === "object"
          ) !== -1;
      return hasIcon;
    },
  },
  components: {
    Chip,
    DeleteIcon,
    Label,
    PreIcon,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
@import "../../../scss/mixins";
[role="gridcell"] {
  height: 100%;
}
.chip-label-button {
  height: 100%;
  display: inline-flex;
  align-items: center;
  &:focus {
    outline: 0;
  }
}
</style>
