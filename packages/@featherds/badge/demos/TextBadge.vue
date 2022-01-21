<template>
  <section>
    <FeatherTextBadge :type="error.type">{{ error.title }}</FeatherTextBadge>
    <FeatherTextBadge :type="info.type">{{ info.title }}</FeatherTextBadge>
  </section>
</template>
<script>
import { FeatherTextBadge, TYPES } from "./../src";
export default {
  data() {
    const error = {
      type: TYPES.ERROR,
      title: "errors (99+)",
    };
    const info = {
      type: TYPES.INFO,
      title: "info (3)",
    };
    return {
      error,
      info,
    };
  },

  components: {
    FeatherTextBadge,
  },
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 1.5rem;
}
</style>
