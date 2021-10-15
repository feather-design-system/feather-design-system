<template>
  <section>
    <FeatherAppBar :labels="labels" :content="content" class="demo-app-bar">
      <template v-slot:right>
        <FeatherAppBarLink :icon="support" title="Support" url="#" />
      </template>
    </FeatherAppBar>
    <div id="test">Page contents</div>
  </section>
</template>
<script>
import { FeatherAppBar, FeatherAppBarLink } from "@featherds/app-bar";
import Support from "@featherds/icon/actions/Help";
export default {
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
    FeatherAppBar,
    FeatherAppBarLink,
  },
};
</script>
<style lang="scss" scoped>
.demo-app-bar {
  position: absolute !important;
  :deep(header) {
    position: absolute !important;
    z-index: 1 !important;
  }
}
section {
  height: 200px;
  position: relative;
}
#test {
  height: 300px;
}
</style>
