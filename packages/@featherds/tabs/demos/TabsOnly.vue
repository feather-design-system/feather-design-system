<template>
  <section>
    <FeatherTabContainer v-model="index">
      <template v-slot:tabs>
        <FeatherTab id="one" controls="onepanel">Tab one</FeatherTab>
        <FeatherTab id="two" controls="twopanel">Tab Two</FeatherTab>
        <FeatherTab id="three" controls="threepanel">Tab three</FeatherTab>
      </template>
    </FeatherTabContainer>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as components from "./../src";
export default defineComponent({
  data() {
    return { index: 1 };
  },
  components: {
    ...components,
  },
});
</script>
