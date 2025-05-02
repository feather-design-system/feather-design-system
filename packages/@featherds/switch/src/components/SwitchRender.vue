<template>
  <div
    class="switch-container"
    :class="{ checked: checked, disabled: disabled }"
    @click="handleClick"
  >
    <div class="track"></div>
    <div class="switcher">
      <div class="switch-circle"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export const props = {
  disabled: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  },
};
export const emits = {
  click: (_e: MouseEvent) => true,
};
export default defineComponent({
  emits,
  props,
  methods: {
    handleClick(e: MouseEvent) {
      if (!this.disabled) {
        this.$emit("click", e);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/elevation" as elev;
@use "@featherds/styles/mixins/flex" as flex;
@use "@featherds/styles/themes/utils" as utils;

$circleHeight: 1.25rem;
$height: 2.25rem;
$trackHeight: 0.875rem;
$trackLength: 2.125rem;

.switch-container {
  position: relative;
  height: $height;
  padding: 0 0.1875rem;

  display: inline-flex;
  cursor: pointer;
  align-items: center;

  &.checked {
    .switch-circle {
      background: utils.layers(var(vars.$primary));
      border: 1px solid transparent;
    }
    .switcher {
      transform: translateX(0.875rem);
    }
    .track {
      background-color: utils.alpha(vars.$primary, 0.4);
    }
  }
  &.disabled {
    opacity: 0.4;
  }
}
.switch-circle {
  height: $circleHeight;
  width: $circleHeight;
  @include elev.elevation(2);
  background: utils.layers(
    var(vars.$border-light-on-surface),
    var(vars.$background)
  );
  border: 1px solid var(vars.$shade-1);
  border-radius: 100%;
  transition: all 280ms ease-in-out;
}
.switcher {
  flex: none;
  display: flex;
  @include flex.center;
  height: $height;
  border-radius: 100%;
  width: $height;

  cursor: pointer;
  border: 2px solid transparent;
  position: absolute;
  top: 0;
  left: -0.375rem;
  transition: all 280ms ease-in-out;
}
.track {
  flex: none;
  width: $trackLength;
  height: $trackHeight;
  border-radius: $trackHeight;
  background-color: utils.alpha(vars.$primary-text-on-surface, 0.24);
  transition: all 280ms ease-in-out;
}
label {
  flex: none;
  cursor: pointer;
}
</style>
