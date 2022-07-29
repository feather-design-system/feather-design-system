<template>
  <section>
    <FeatherProgressLinear
      :error="errorMessage"
      :showPercentage="showPercentage"
    >
      <template #error>
        {{ errorMessage }}
      </template>
    </FeatherProgressLinear>
    <p class="debug">Local Max Value</p>
    <p class="debug">{{ localMax }}</p>
    <p class="debug">Local Linear Value</p>
    <p class="debug">{{ localValue }}</p>
  </section>
  <section>
    <FeatherButton @click="toggleError" secondary>Toggle Error</FeatherButton>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as components from "./../src";
import { FeatherButton } from "@featherds/button";
export default defineComponent({
  components: {
    ...components,
    FeatherButton,
  },
  data() {
    return {
      errorMessage: "",
      interval: 0,
      localMax: 100,
      localValue: 0,
      showPercentage: true,
    };
  },
  methods: {
    toggleError() {
      this.errorMessage = this.errorMessage
        ? ""
        : "Unable to complete process.";
    },
    updateValue() {
      const step = Math.floor(Math.random() * 30);
      if (this.localValue + step >= this.localMax) {
        this.localValue = this.localMax;
        clearInterval(this.interval);
        console.log(this.localValue);
        console.log("Interval Cleared", this.interval);
      } else {
        this.localValue += step;
        console.log(this.localValue);
      }
    },
    startProgress() {
      let interval = Math.floor(Math.random() * 2000);
      interval = 2000;
      this.interval = window.setInterval(this.updateValue, interval);
    },
  },
  mounted() {
    this.startProgress();
  },
});
</script>

<style lang="scss">
@import "@featherds/styles/themes/variables";

div#app {
  background: var($surface);
}
section {
  padding: 50px;
}
.spinner {
  display: block;
}
.debug {
  color: purple !important;
  text-align: left;
  display: none;
}
</style>
