<template>
  <section>
    <FeatherExpansionPanel :title="title" loading>
      Ignored panel content.
    </FeatherExpansionPanel>
  </section>
</template>
<script>
import { FeatherExpansionPanel } from "@featherds/expansion";
export default {
  data() {
    return {
      title: "More Details",
    };
  },
  components: {
    FeatherExpansionPanel,
  },
};
</script>
