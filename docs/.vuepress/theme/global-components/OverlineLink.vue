<template>
  <li class="overline-link">
    <a :href="href">
      <slot />
    </a>
  </li>
</template>
<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
.overline-link {
  list-style: none;
  margin-bottom: 8px;
}
.overline-link a {
  @include overline();
  color: var($primary);
}
</style>
