<template>
  <div class="all-components">
    <PrettyCard
      v-for="item in items"
      href="item.url"
      img-url="/assets/branding/home-foundation.png"
      >{{ item.name }}
    </PrettyCard>
  </div>
</template>
<script>
import items from "../components/components";
export default {
  data() {
    return {
      items,
    };
  },
};
</script>
<style lang="scss" scoped>
.all-components {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
