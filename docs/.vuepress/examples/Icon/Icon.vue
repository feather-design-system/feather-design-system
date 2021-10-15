<template>
  <section>
    <FeatherIcon :icon="add" class="my-primary-icon"> </FeatherIcon>
  </section>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import Add from "@featherds/icon/actions/Add";
import { markRaw } from "vue";
export default {
  computed: {

    add() {
      return markRaw(Add);
    },
  },
  components: {
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
.my-icon,
.my-primary-icon {
  font-size: 18px;
  color: var($secondary-text-on-surface);
}

.my-primary-icon {
  color: var($primary);
}
</style>
