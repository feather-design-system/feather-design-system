<template>
  <section>
    <FeatherButton primary @click="show1 = true">Show #1</FeatherButton>
    <FeatherButton primary @click="show2 = true">Show #2</FeatherButton>
    <FeatherButton primary @click="show3 = true">Show #3</FeatherButton><br />
    <FeatherCheckbox v-model="center">Center</FeatherCheckbox>
    <FeatherCheckbox v-model="relative">Relative</FeatherCheckbox>
    <div id="target">
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content Content Content Content Content Content Content
      Content Content Content
    </div>
  </section>
  <section>
    <FeatherSnackbarGroup
      :target="relative ? '#target' : undefined"
      :relative="relative"
    >
      <FeatherSnackbar v-model="show1" :center="center">
        A notification with some really long text but small button
        <template v-slot:button>
          <FeatherButton text @click="show1 = false">button</FeatherButton>
        </template>
      </FeatherSnackbar>

      <FeatherSnackbar v-model="show2" :center="center">
        A notification!
        <template v-slot:button>
          <FeatherButton text @click="show2 = false">dismiss</FeatherButton>
        </template>
      </FeatherSnackbar>

      <FeatherSnackbar v-model="show3" :center="center">
        A notification with a long message and an action button!
        <template v-slot:button>
          <FeatherButton text @click="show3 = false"
            >Long button text</FeatherButton
          >
        </template>
      </FeatherSnackbar>
    </FeatherSnackbarGroup>
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
      show2: false,
      show3: false,
      center: false,
      relative: false,
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
<style lang="scss">
@import "@featherds/styles/themes/variables";
#target {
  position: sticky;
  overflow: scroll;
  margin-top: 30px;
  margin-left: 150px;
  width: 500px;
  height: 500px;
  background-color: var($surface);
}
</style>
