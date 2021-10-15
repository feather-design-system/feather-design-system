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
<script>
import {
  FeatherTab,
  FeatherTabContainer,
  FeatherTabPanel,
} from "@featherds/tabs";
export default {
  components: {
    FeatherTab,
    FeatherTabContainer,
    FeatherTabPanel,
  },
};
</script>
