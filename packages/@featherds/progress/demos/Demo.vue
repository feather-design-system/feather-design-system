<template>
  <section>
    <h1>Feather Spinner</h1>
    <FeatherSpinner class="spinner"></FeatherSpinner>
  </section>
  <!-- <section>
    <h1>Progress Linear</h1>
    <FeatherProgressLinear
      :max="100"
      :value="value"
      :percent="true"
      id="determinate1"
    />
  </section>
  <section>
    <h1>Progress Linear Indeterminate</h1>
    <FeatherProgressLinear :max="100" id="indeterminate1" />
  </section> -->

  <!-- <section>
    <h1>Determinate</h1>
    <FeatherProgressIndicator
      :max="100"
      :value="value"
      :percent="true"
      id="determinate1"
    />
  </section>
  <section>
    <h1>Determinate No Display</h1>
    <FeatherProgressIndicator :max="100" :value="value" id="determinate2" />
  </section>
  <section>
    <h1>Indeterminate</h1>
    <FeatherProgressIndicator :max="100" id="indeterminate" />
  </section> -->
  <!-- <section>
    <h1>Indeterminate</h1>
    <FeatherProgressIndicator
      :max="100"
      id="indeterminate"
    />
  </section> -->
  <!-- <section>
    <h1>&lt;progress /&gt;</h1>
    <progress value="70" max="100">70 %</progress>
  </section> -->
  <!-- <section>
    <h1>&lt;progress /&gt;</h1>
    <progress max="100">70 %</progress>
  </section> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as components from "./../src";
export default defineComponent({
  components: {
    ...components,
  },
  data() {
    return {
      value: 0,
      interval: 0,
    };
  },
  methods: {
    updateValue() {
      const step = Math.floor(Math.random() * 30);
      if (this.value + step >= 100) {
        this.value = 100;
        clearInterval(this.interval);
        const control = document.querySelector(
          "#indeterminate1 .progress-indicator"
        );

        control?.classList.add("completed");
      } else {
        this.value += step;
      }
    },
    startProgress() {
      const bars = document.querySelectorAll(".progress-indicator");
      bars.forEach((bar) => {
        bar.classList.remove("completed");
      });
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

<style scoped>
section {
  margin: 50px;
}
.spinner {
  display: block;
}

.completed {
  display: none;
}
</style>
