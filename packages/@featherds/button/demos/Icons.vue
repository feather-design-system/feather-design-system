<template>
  <section>
    <FeatherButton primary>Primary Button</FeatherButton>
    <FeatherButton href="#" primary icon="Backup" disabled>
      <FeatherIcon :icon="backup"> </FeatherIcon>
    </FeatherButton>
    <FeatherButton href="#" icon="Send SMS">
      <FeatherIcon :icon="backup"> </FeatherIcon>
    </FeatherButton>
  </section>
</template>

<script lang="ts">
import { FeatherIcon } from "@featherds/icon";
import Backup from "@featherds/icon/action/AddComment";

import * as components from "./../src";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      backup: Backup,
    };
  },
  components: {
    ...components,
    FeatherIcon,
  },
});
</script>
