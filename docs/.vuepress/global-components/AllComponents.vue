<template>
  <div class="all-components">
    <PrettyCard
      v-for="item in items"
      :href="$withBase(item.url)"
      :img-url="item.image"
      >{{ item.name }}
    </PrettyCard>
  </div>
</template>
<script>
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";
import { computed } from "vue";
export default {
  setup() {
    const items = computed(() => {
      return useThemeLocaleData()
        .value.menus.components.find((x) => x.components)
        .items.filter((x) => !!x.image);
    });
    return { items };
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
