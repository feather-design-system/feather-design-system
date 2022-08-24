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
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/client";
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
  gap: 1.25rem;
}

@media screen and (max-width: 81.25rem) {
  .all-components {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 42.5rem) {
  .all-components {
    grid-template-columns: 1fr;
  }
}
</style>
