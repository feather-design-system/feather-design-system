<template>
  <section>
    <SwitchRender :checked="checked" :disabled="disabled" @click="toggleChecked"
      >Switch One</SwitchRender
    >
    <SwitchRender :checked="disabled" @click="toggleDisabled"
      >Disabled</SwitchRender
    >
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as components from "./../src";
export default defineComponent({
  data() {
    return {
      checked: false,
      disabled: false,
    };
  },
  methods: {
    toggleChecked() {
      this.checked = !this.checked;
    },
    toggleDisabled() {
      this.disabled = !this.disabled;
    },
  },
  components: {
    ...components,
  },
});
</script>
