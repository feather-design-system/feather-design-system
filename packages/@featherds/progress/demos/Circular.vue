<template>
  <section>
    <FeatherProgressCircular
      :value="value"
      :show-percentage="true"
      :size="size"
      :error="errMsg"
    >
      <template #error>
        {{ errMsg }}
      </template>
    </FeatherProgressCircular>
  </section>
  <section>
    <FeatherButton secondary @click="toggleError">Toggle Error</FeatherButton>
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
      errMsg: "",
      interval: 0,
      size: "lg",
      value: 0,
    };
  },
  methods: {
    toggleError() {
      this.errMsg = !!this.errMsg ? "" : "Process encountered an error.";
    },
    updateValue() {
      const step = Math.floor(Math.random() * 30);
      if (this.value + step >= 100) {
        this.value = 100;
        clearInterval(this.interval);
      } else {
        this.value += step;
      }
      console.log(this.value);
    },
    startProgress() {
      this.value = 0;
      const interval = Math.floor(Math.random() * 2000);
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
  margin: 50px;
}
.spinner {
  display: block;
}
</style>
