<template>
  <section>
    <h1>Buttons</h1>
    <FeatherButton as-anchor :disabled="disabled" primary type="submit"
      >Submit Primary Button</FeatherButton
    >
    <FeatherButton as-anchor :disabled="disabled" primary
      >Primary Button</FeatherButton
    >
    <FeatherButton as-anchor :disabled="disabled" secondary
      >Secondary Button</FeatherButton
    >
    <FeatherButton as-anchor :disabled="disabled" text
      >Text Button</FeatherButton
    >
    <h1>Buttons with Icon</h1>
    <h2>Icon</h2>
    <FeatherButton as-anchor :disabled="disabled" primary type="submit">
      <template v-slot:icon>
        <FeatherIcon :icon="backup" aria-hidden="true" focusable="false">
        </FeatherIcon>
      </template>
      Submit Primary Button</FeatherButton
    >
    <FeatherButton as-anchor :disabled="disabled" primary>
      <template v-slot:icon>
        <FeatherIcon :icon="backup" aria-hidden="true" focusable="false">
        </FeatherIcon>
      </template>
      Primary Button</FeatherButton
    >
    <FeatherButton as-anchor :disabled="disabled" secondary>
      <template v-slot:icon>
        <FeatherIcon :icon="backup" aria-hidden="true" focusable="false">
        </FeatherIcon>
      </template>
      Secondary Button</FeatherButton
    >
    <FeatherButton as-anchor :disabled="disabled" text>
      <template v-slot:icon>
        <FeatherIcon :icon="backup" aria-hidden="true" focusable="false">
        </FeatherIcon>
      </template>
      Text Button</FeatherButton
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
import { FeatherIcon } from "@featherds/icon";
import Backup from "@featherds/icon/action/AddComment";

import * as components from "./../src";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    backup: () => Backup,
  },
  components: {
    ...components,
    FeatherIcon,
  },
});
</script>
<style lang="scss" scoped>
section :deep(button) {
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
}
</style>
