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
