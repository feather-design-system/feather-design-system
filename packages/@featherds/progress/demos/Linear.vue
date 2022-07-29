<template>
  <section>
    <FeatherProgressLinear
      :error="errorMessage"
      :value="value"
      :show-percentage="true"
    >
      <template #error>
        {{ errorMessage }}
      </template>
    </FeatherProgressLinear>
  </section>
  <section>
    <FeatherButton aria-live="off" @click="toggleError" secondary
      >Toggle Error
    </FeatherButton>
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
      step: 0,
      value: 0,
    };
  },
  methods: {
    toggleError() {
      this.errorMessage = this.errorMessage ? "" : "An unknown error occurred.";
    },
    updateValue() {
      const step = Math.floor(Math.random() * 40);
      this.step = step;
      if (this.value + step >= 100) {
        this.value = 100;
        clearInterval(this.interval);
      } else {
        this.value += step;
      }
    },
    startProgress() {
      this.value = 0;
      let interval = Math.floor(Math.random() * 2000);
      interval = 3000;
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

.debug {
  color: purple;
  text-align: left;
  display: none;
}
</style>
