<template>
  <section>
    <div v-for="(item, index) in items" :key="item" :class="item" class="item">
      Elevation {{ raw[index] }}
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      raw: [0, 1, 2, 3, 4, 6, 8, 12, 16, 24],
      items: [0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((x) => `el-${x}`),
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/mixins/elevation";
@import "~@featherds/styles/themes/variables";

$elevations: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24;
@each $i in $elevations {
  .el-#{$i} {
    @include elevation($i);
  }
}
.item {
  width: 150px;
  height: 150px;
  margin: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
section {
  background: var($background);
  margin: -8px;
  color: var($primary-text-on-surface);
}
</style>
