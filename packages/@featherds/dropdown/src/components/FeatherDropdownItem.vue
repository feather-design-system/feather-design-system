<template>
  <FeatherListItem
    ref="link"
    href="#"
    tabindex="-1"
    @click.prevent.stop="handleClick"
    :disabled="disabled"
    :aria-disabled="disabled ? 'true' : 'false'"
    :aria-current="active"
  >
    <template v-slot:icon>
      <slot name="icon" />
    </template>
    <slot />
  </FeatherListItem>
</template>
<script lang="ts">
import DropdownItem from "../mixins/DropdownItem";
import { FeatherListItem } from "@featherds/list";
import { ComponentPublicInstance, defineComponent } from "vue";
export const emits = {
  click: (_e: MouseEvent) => true,
};
export default defineComponent({
  mixins: [DropdownItem],
  emits,
  methods: {
    handleClick(e: MouseEvent) {
      if (!this.disabled) {
        if (this.$parent) {
          this.$parent.$emit("close"); //call close
        }
        this.$emit("click", e);
      }
    },
    focus() {
      (this.$refs.link as ComponentPublicInstance).$el
        .querySelector("a")
        .focus();
    },
  },
  components: {
    FeatherListItem,
  },
});
</script>
