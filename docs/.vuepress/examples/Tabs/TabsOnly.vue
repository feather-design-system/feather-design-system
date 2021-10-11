<template>
  <section>
    <FeatherTabContainer v-model="index">
      <template v-slot:tabs>
        <FeatherTab id="one" controls="onepanel">Tab one</FeatherTab>
        <FeatherTab id="two" controls="twopanel">Tab Two</FeatherTab>
        <FeatherTab id="three" controls="threepanel">Tab three</FeatherTab>
      </template>
    </FeatherTabContainer>

    <div class="panels">
      <div
        role="tabpanel"
        tabindex="0"
        id="onepanel"
        :aria-expanded="index === 0"
        aria-labelledby="one"
      >
        One Panel
      </div>
      <div
        role="tabpanel"
        tabindex="0"
        id="twopanel"
        :aria-expanded="index === 1"
        aria-labelledby="two"
      >
        Two Panel
      </div>
      <div
        role="tabpanel"
        tabindex="0"
        id="threepanel"
        :aria-expanded="index === 2"
        aria-labelledby="three"
      >
        Three Panel
      </div>
    </div>
  </section>
</template>
<script>
import { FeatherTab, FeatherTabContainer } from "@featherds/tabs";
export default {
  data() {
    return {
      index: 1,
    };
  },
  components: {
    FeatherTab,
    FeatherTabContainer,
  },
};
</script>
<style lang="scss" scoped>
[role="tabpanel"] {
  display: none;
  &[aria-expanded="true"] {
    display: block;
  }
}
</style>
