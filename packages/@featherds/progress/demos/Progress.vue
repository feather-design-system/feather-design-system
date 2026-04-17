<template>
  <section>
    <div id="announce">
      <p aria-live="assertive">{{ value }} percent</p>
    </div>

    <progress
      :max="100"
      :value="value"
      :percent="true"
      id="determinate1"
      class="progress-indicator"
      role="progressbar"
      aria-live="assertive"
    />
  </section>
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
      } else {
        this.value += step;
      }
      const progressbars = document.querySelectorAll(".progress-indicator");
      progressbars.forEach((progressbar) => {
        progressbar.setAttribute("aria-valuenow", this.value.toFixed(0));
      });
      console.log(this.value);
    },
    startProgress() {
      const progressbars = document.querySelectorAll(".progress-indicator");
      progressbars.forEach((progressbar) => {
        progressbar.classList.remove("completed");
      });
      this.value = 0;
      const interval = Math.floor(Math.random() * 2000);
      this.interval = window.setInterval(this.updateValue, interval);
    },
    ignoreThemeChanger() {
      // This doesn't work BTW.
      const themeChanger = document.querySelector("#theme-changer");
      themeChanger?.setAttribute("aria-live", "off");
    },
  },
  mounted() {
    this.startProgress();
    this.ignoreThemeChanger();
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
