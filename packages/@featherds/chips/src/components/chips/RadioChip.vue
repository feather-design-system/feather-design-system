<template>
  <Chip
    :disabled="disabled"
    :condensed="condensed"
    class="focus hover"
    :class="{ selected: checked }"
    role="radio"
    ref="input"
    :aria-checked="checked ? 'true' : 'false'"
    :aria-disabled="disabled"
    :aria-labelledby="labelId"
    :tabindex="tabindex"
    @click="click"
    :allow-click="!disabled"
    @blur="blur"
  >
    <PreIcon v-if="hasIcon"><slot name="icon" /></PreIcon>
    <Label :id="labelId"><slot /></Label>
  </Chip>
</template>
<script>
import Chip from "../base/Chip";
import Label from "../base/Label";
import PreIcon from "../base/PreIcon";
import { getSafeId } from "@featherds/utils/id";
import { computed, inject, ref } from "vue";
export default {
  props: {
    value: undefined,
    disabled: {
      type: Boolean,
      default: false,
    },
    condensed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const first = ref(false);
    const checked = ref(false);
    const labelId = computed(() => getSafeId("chip-label-id"));
    const tabindex = computed(() => {
      if (first.value) {
        return 0;
      }
      return checked.value ? 0 : -1;
    });

    const input = ref(null);
    const focus = () => {
      input.value.$el.focus();
    };
    //register
    const register = inject("register");
    const blur = inject("blur");
    const select = inject("select");

    const vm = {
      first,
      focus,
      disabled: props.disabled,
      value: props.value,
      checked,
    };
    register(vm);
    const click = () => {
      select(vm);
    };
    return {
      labelId,
      tabindex,
      first,
      blur,
      click,
      input,
      checked,
    };
  },
  computed: {
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
    Label,
    PreIcon,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/typography";
[role="radio"] {
  cursor: pointer;
}
</style>
