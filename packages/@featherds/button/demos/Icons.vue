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

<script>
import { FeatherIcon } from "@featherds/icon";
import Backup from "@featherds/icon/action/AddComment";
import { markRaw } from "vue";

import * as components from "./../src";
export default {
  data() {
    return {
      backup: markRaw(Backup),
    };
  },
  components: {
    ...components,
    FeatherIcon,
  },
};
</script>
