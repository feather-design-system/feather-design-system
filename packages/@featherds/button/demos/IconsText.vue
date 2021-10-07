<template>
  <section>
    <FeatherButton href="#" primary class="backup-button">
      <template v-slot:icon>
        <FeatherIcon :icon="backup" aria-hidden="true" focusable="false">
        </FeatherIcon>
      </template>
      Backup
    </FeatherButton>
    <FeatherButton href="#" primary>
      <template v-slot:icon>
        <FeatherIcon :icon="backup" aria-hidden="true" focusable="false">
        </FeatherIcon>
      </template>
      Send SMS
    </FeatherButton>
  </section>
</template>

<script>
import { FeatherIcon } from "@featherds/icon";
import Backup from "@featherds/icon/actions/AddComment";
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
