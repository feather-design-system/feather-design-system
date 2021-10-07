<template>
  <section>
    <h1>Buttons</h1>
    <FeatherButton
      :disabled="disabled"
      primary
      type="submit"
      @click="clicked"
      @disabled-click="disabledClick"
      >Submit Primary Button</FeatherButton
    >
    <FeatherButton :disabled="disabled" primary>Primary Button</FeatherButton>
    <FeatherButton :disabled="disabled" secondary
      >Secondary Button</FeatherButton
    >
    <FeatherButton :disabled="disabled" text>Text Button</FeatherButton>
    <h1>Buttons with Icon</h1>
    <h2>Icon</h2>
    <FeatherButton :disabled="disabled" primary type="submit">
      <template v-slot:icon>
        <FeatherIcon :icon="backup" aria-hidden="true" focusable="false">
        </FeatherIcon>
      </template>
      Submit Primary Button</FeatherButton
    >
    <FeatherButton :disabled="disabled" primary>
      <template v-slot:icon>
        <FeatherIcon :icon="backup" aria-hidden="true" focusable="false">
        </FeatherIcon>
      </template>
      Primary Button</FeatherButton
    >
    <FeatherButton :disabled="disabled" secondary>
      <template v-slot:icon>
        <FeatherIcon :icon="backup" aria-hidden="true" focusable="false">
        </FeatherIcon>
      </template>
      Secondary Button</FeatherButton
    >
    <FeatherButton :disabled="disabled" text>
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

    <h1>Spacing</h1>
    <div>
      <FeatherButton primary>Primary Button</FeatherButton>
      <FeatherButton secondary>Secondary Button</FeatherButton>
    </div>
    <div>
      <FeatherButton secondary>Secondary Button</FeatherButton>
      <FeatherButton primary>Primary Button</FeatherButton>
    </div>

    <div>
      <FeatherButton primary>Primary Button</FeatherButton>
      <FeatherButton text>Text Button</FeatherButton>
    </div>

    <div>
      <FeatherButton text>Text Button</FeatherButton>
      <FeatherButton text>Text Button</FeatherButton>
    </div>

    <div>
      <FeatherButton text>Text Button</FeatherButton>
      <FeatherButton primary>Primary Button</FeatherButton>
    </div>

    <div>
      <FeatherButton text>Text Button</FeatherButton>
      <FeatherButton secondary>Secondary Button</FeatherButton>
    </div>
  </section>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import Backup from "@featherds/icon/actions/AddComment";
import { markRaw } from "vue";

import * as components from "./../src";
export default {
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    backup: () => markRaw(Backup),
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
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped></style>
