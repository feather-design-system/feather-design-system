<template>
  <div class="all-components">
    <PrettyCard v-for="item in items" :href="item.url" :img-url="item.image"
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
  row-gap: 20px;
  column-gap: 20px;
  justify-items: center;
  justify-content: center;
}

@media screen and (max-width: 1300px) {
  .all-components {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 680px) {
  .all-components {
    grid-template-columns: 1fr;
  }
}
</style>
