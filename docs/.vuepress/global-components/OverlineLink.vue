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
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;
.overline-link {
  list-style: none;
  margin-bottom: 0.5rem;
}
.overline-link a {
  @include typo.overline();
  color: var(vars.$primary);
}
</style>
