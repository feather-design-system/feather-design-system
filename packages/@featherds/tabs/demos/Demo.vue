<template>
  <section>
    <FeatherTabContainer>
      <template v-slot:tabs>
        <FeatherTab>Tab one</FeatherTab>
        <FeatherTab>Tab Two</FeatherTab>
        <FeatherTab>Tab three</FeatherTab>
      </template>
      <FeatherTabPanel>One</FeatherTabPanel>
      <FeatherTabPanel>TWOTOOW</FeatherTabPanel>
      <FeatherTabPanel>333e</FeatherTabPanel>
    </FeatherTabContainer>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as components from "./../src";
export default defineComponent({
  components: {
    ...components,
  },
});
</script>
