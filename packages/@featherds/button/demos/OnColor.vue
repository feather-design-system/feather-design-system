<template>
  <section>
    <h1>Buttons</h1>

    <FeatherButton :disabled="disabled" secondary on-color
      >Secondary Button</FeatherButton
    >
    <FeatherButton :disabled="disabled" text on-color
      >Text Button</FeatherButton
    >

    <p>
      <label for="disabled"
        ><input
          type="checkbox"
          v-model="disabled"
          name="disabled"
          id="disabled"
        />
        Disabled
      </label>
    </p>
  </section>
</template>
<script>
import * as components from "./../src";
export default {
  data() {
    return {
      disabled: false,
    };
  },

  methods: {
    clicked() {
      console.log("clicked");
    },
    disabledClick() {
      console.log("disabled and clicked");
    },
  },
  components: {
    ...components,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
section {
  background-color: var($secondary);
}
</style>
