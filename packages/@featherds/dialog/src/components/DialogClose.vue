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
<script>
import { FeatherIcon } from "@featherds/icon";
import Close from "@featherds/icon/navigation/Cancel";

export default {
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
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
$close-width: 48px;
$small-width: 40px;
a.closeButton {
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
  font-size: 18px;
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
