<template>
  <section>
    <FeatherIcon title="Add Icon" :icon="icon" />
  </section>
</template>
<script>
import * as components from "./../src";
import Add from "@featherds/icon/actions/AssignTo";
export default {
  components: {
    ...components,
  },
  computed: {
    icon: () => Add,
  },
};
</script>
