<template>
  <section>
    <FeatherTooltip title="Example tooltip" v-slot="{ attrs, on }">
      <button type="button" v-bind="attrs" v-on="on">Hellow</button>
    </FeatherTooltip>

    <FeatherTooltip title="Example tooltip" v-slot="{ attrs, on }">
      <FeatherButton primary v-bind="attrs" v-on="on">Hellow</FeatherButton>
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
