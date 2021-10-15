<template>
  <section>
    <FeatherExpansionPanel :title="title" disabled>
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
