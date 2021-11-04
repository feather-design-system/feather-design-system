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
<script>
export default {
  emits: ["click"],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(e) {
      if (!this.disabled) {
        this.$emit("click", e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/flex";
@import "@featherds/styles/themes/utils";
$circleHeight: 20px;
$height: 36px;
$trackHeight: 14px;
$trackLength: 34px;

.switch-container {
  position: relative;
  height: $height;
  padding: 0 3px;

  display: inline-flex;
  cursor: pointer;
  align-items: center;

  &.checked {
    .switch-circle {
      background: layers(var($primary));
      border: 1px solid transparent;
    }
    .switcher {
      transform: translateX(14px);
    }
    .track {
      background-color: alpha($primary, 0.4);
    }
  }
  &.disabled {
    opacity: 0.4;
  }
}
.switch-circle {
  height: $circleHeight;
  width: $circleHeight;
  @include elevation(2);
  background: layers(var($border-light-on-surface), var($background));
  border: 1px solid var($shade-1);
  border-radius: 100%;
  transition: all 280ms ease-in-out;
}
.switcher {
  flex: none;
  display: flex;
  @include center;
  height: $height;
  border-radius: 100%;
  width: $height;

  cursor: pointer;
  border: 2px solid transparent;
  position: absolute;
  top: 0;
  left: -5px;
  transition: all 280ms ease-in-out;
}
.track {
  flex: none;
  width: $trackLength;
  height: $trackHeight;
  border-radius: $trackHeight;
  background-color: alpha($primary-text-on-surface, 0.24);
  transition: all 280ms ease-in-out;
}
label {
  flex: none;
  cursor: pointer;
}
</style>
