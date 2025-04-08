<template>
  <section class="on-color-demo">
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
<script lang="ts">
import * as components from "./../src";
import { defineComponent } from "vue";
export default defineComponent({
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
});
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
.on-color-demo {
  padding: var(vars.$spacing-m);
  border-radius: 4px;
  background-color: var(vars.$secondary);
  h1,
  label {
    color: var(vars.$primary-text-on-color);
  }
  .on-color {
    margin-block: var(vars.$spacing-m);
  }
}
</style>
