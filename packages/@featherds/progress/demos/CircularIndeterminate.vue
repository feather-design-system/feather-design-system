<template>
  <section>
    <FeatherProgressCircular :size="size" :error="errMsg">
      <template #error>
        <span v-show="showErr">{{ errMsg }}</span>
      </template>
    </FeatherProgressCircular>
  </section>
  <section>
    <FeatherButton @click="toggleError" secondary>Toggle Error</FeatherButton>
  </section>
  <section>
    <FeatherInput
      v-model="errInput"
      label="Custom Error"
      :hint="hint"
    ></FeatherInput>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as components from "./../src";
import { FeatherInput } from "@featherds/input";
import { FeatherButton } from "@featherds/button";
export default defineComponent({
  components: {
    ...components,
    FeatherInput,
    FeatherButton,
  },
  data() {
    return {
      errMsg: "",
      errInput: "Error Message",
      hint: "Enter the error to display above.",
      interval: 0,
      showErr: false,
      size: "lg",
      value: 0,
    };
  },
  methods: {
    toggleError() {
      if (this.errInput === "") {
        this.showErr = false;
        return;
      }
      this.showErr = !this.showErr;
      this.errMsg = this.showErr && !!this.showErr ? this.errInput : "";
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
  margin: 3rem;
}
</style>
