<template>
  <div class="spinner-container">
    <svg class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle
        class="path"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "@featherds/styles/themes/variables";
$offset: 187;
$duration: 1.4s;

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
.spinner {
  animation: rotator $duration linear infinite;
  height: 40px;
  width: 40px;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke: var($primary);
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite,
    colors ($duration * 4) ease-in-out infinite;
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: math.div($offset, 4);
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>
