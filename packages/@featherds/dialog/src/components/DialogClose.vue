<template>
  <a
    href="#"
    class="closeButton"
    :class="{ small: small }"
    data-ref-id="dialog-close"
    :aria-label="closeText"
    @click.prevent="$emit('close')"
  >
    <FeatherIcon
      aria-hidden="true"
      focusable="false"
      class="fill"
      :icon="icon"
    />
  </a>
</template>
<script lang="ts">
import { FeatherIcon } from "@featherds/icon";
import Close from "@featherds/icon/navigation/Cancel";
import { defineComponent } from "vue";
export default defineComponent({
  emits: ["close"],
  props: {
    closeText: {
      type: String,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    icon: () => Close,
  },
  components: {
    FeatherIcon,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
$close-width: 3rem;
$small-width: 2.5rem;
a.closeButton {
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
  font-size: 1.125rem;
  color: var($secondary-text-on-surface);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: $close-width;
  width: $close-width;
  text-align: center;
  &:visited {
    color: var($secondary-text-on-surface);
  }
  &:hover,
  &:active {
    text-decoration: none;
    color: var($primary-text-on-surface);
  }
  &.small {
    height: $small-width;
    width: $small-width;
  }
}
.fill {
  width: 100%;
}
</style>
