<template>
  <section>
    <FeatherButton primary @click="show1 = true">Trigger snackbar</FeatherButton
    ><br />
    <feather-checkbox v-model="center">Center</feather-checkbox>

    <FeatherSnackbar v-model="show1" :center="center">
      A notification with some really long text but small button
      <template v-slot:button>
        <FeatherButton @click="show1 = false" text>dismiss</FeatherButton>
      </template>
    </FeatherSnackbar>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
import { FeatherButton } from "@featherds/button";
import { FeatherCheckbox } from "@featherds/checkbox";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      show1: false,
      center: false,
    };
  },
  methods: {},
  components: {
    ...components,
    FeatherButton,
    FeatherCheckbox,
  },
});
</script>
