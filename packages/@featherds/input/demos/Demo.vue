<template>
  <section class="surface">
    <FeatherInput
      :label="label"
      :hint="hint"
      v-model="value"
      :maxlength="5"
      class="test"
      data-ref-id="test"
    >
    </FeatherInput>
    <div>
      First name is "<span id="display">{{ value }}</span
      >"
    </div>
    <FeatherInput label="This label is hidden" hide-label> </FeatherInput>
    <div>^^^ for scenarios where embedded (eg. a table) label is hidden</div>
    <FeatherInput
      full-width
      label="Last Name"
      hint="Normally the last part of your name"
    >
    </FeatherInput>

    <FeatherInput label="Age" :modelValue="num" type="number"> </FeatherInput>
    <div>Type of num is {{ typeOfNum }}</div>

    <FeatherInput label="Other Name" error="Required" clear="test">
    </FeatherInput>
    <FeatherInput label="Has Clear" clear="Clear text"> </FeatherInput>
    <FeatherInput label="Search People">
      <template v-slot:pre><FeatherIcon :icon="searchIcon" /></template>
    </FeatherInput>

    <FeatherInput label="Search People" disabled>
      <template v-slot:pre><FeatherIcon :icon="searchIcon" /></template>
    </FeatherInput>

    <FeatherInput
      label="Search People"
      clear="Clear text"
      modelValue="text"
      disabled
    >
      <template v-slot:pre><FeatherIcon :icon="searchIcon" /></template>
    </FeatherInput>
  </section>
</template>
<script>
import * as components from "./../src";
import { FeatherIcon } from "@featherds/icon";
import Search from "@featherds/icon/action/Search";
import { markRaw } from "vue";
export default {
  data() {
    return {
      label: "First Name",
      hint: "Input yo",
      value: "",
      num: 2,
    };
  },
  computed: {
    searchIcon() {
      return markRaw(Search);
    },
    typeOfNum() {
      return typeof this.num;
    },
  },
  components: {
    ...components,
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.surface {
  background-color: var($surface);
  padding: 20px;
}
.chip {
  background-color: var($border-on-surface);
  height: 26px;
  margin-left: 4px;
  padding: 0 4px;
  border-radius: 4px;
  display: inline-block;
  margin-top: 3px;
  margin-bottom: 3px;
}
</style>
