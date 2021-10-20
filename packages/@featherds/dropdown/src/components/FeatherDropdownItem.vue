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
<script>
import DropdownItem from "../mixins/DropdownItem";
import { FeatherListItem } from "@featherds/list";
export default {
  mixins: [DropdownItem],
  emits: ["click"],
  methods: {
    handleClick(e) {
      if (!this.disabled) {
        this.$parent.$emit("close"); //call close
        this.$emit("click", e);
      }
    },
    focus() {
      this.$refs.link.$el.querySelector("a").focus();
    },
  },
  components: {
    FeatherListItem,
  },
};
</script>
