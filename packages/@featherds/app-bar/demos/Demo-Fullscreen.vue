<template>
  <section>
    <FeatherAppBar :labels="labels" :content="content" scroll-hide>
      <template v-slot:right>
        <FeatherAppBarLink
          :icon="support"
          title="Support"
          url="/#/AppBar-DemoFullscreen"
        />
        <FeatherAppBarLink
          :icon="support"
          title="Support"
          url="/#/AppBar-DemoFullscreen"
        />
      </template>
    </FeatherAppBar>
    <div id="test">Page contents</div>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
import Support from "@featherds/icon/action/Help";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      labels: {
        skip: "Skip to main content",
      },
      content: "test",
      support: Support,
    };
  },
  components: {
    ...components,
  },
});
</script>
<style lang="scss" scoped>
#test {
  height: 120vh;
}
</style>
