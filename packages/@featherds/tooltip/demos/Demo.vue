<template>
  <section>
    <FeatherTooltip title="Example tooltip" v-slot="{ attrs }">
      <button type="button" v-bind="attrs">Hellow</button>
    </FeatherTooltip>

    <FeatherTooltip title="Example tooltip" v-slot="{ attrs }">
      <FeatherButton primary v-bind="attrs">Hellow</FeatherButton>
    </FeatherTooltip>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
import { FeatherButton } from "@featherds/button";
export default {
  components: {
    ...components,
    FeatherButton,
  },
};
</script>
