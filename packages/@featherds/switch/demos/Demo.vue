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
<script>
import * as components from "./../src";
export default {
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
};
</script>
