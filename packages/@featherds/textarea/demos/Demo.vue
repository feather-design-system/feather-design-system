<template>
  <section>
    <FeatherTextarea
      background
      v-model="value"
      label="Auto growing"
      rows="5"
      auto
    ></FeatherTextarea>
    <FeatherTextarea
      background
      v-model="value"
      :label="label"
      rows="5"
      hint="describe something useful"
    ></FeatherTextarea>
    <FeatherTextarea
      background
      modelValue="test"
      :label="label"
      rows="5"
      disabled
    ></FeatherTextarea>

    <FeatherTextarea
      background
      :label="label"
      rows="3"
      :maxlength="100"
      hint="describe something useful"
    ></FeatherTextarea>

    <FeatherTextarea
      background
      :label="label"
      rows="3"
      error="Error has occurred"
    ></FeatherTextarea>
  </section>
</template>
<script>
import * as components from "./../src";
export default {
  data() {
    return {
      label: "Description",
      value: "",
    };
  },
  components: {
    ...components,
  },
};
</script>
