<template>
  <FeatherButton icon="Add">
    <FeatherIcon :icon="icon"> </FeatherIcon>
  </FeatherButton>
</template>
<script lang="ts">
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import icon from "@featherds/icon/action/Add";
import { defineComponent } from "vue";
export default defineComponent({
  computed: {
    icon() {
      return icon;
    },
  },
  components: {
    FeatherIcon,
    FeatherButton,
  },
});
</script>
