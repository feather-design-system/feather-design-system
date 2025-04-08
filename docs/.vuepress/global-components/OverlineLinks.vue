<template>
  <div class="overline-links">
    <div class="overline-links-title">
      {{ title }}
    </div>
    <ul>
      <slot />
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;

.overline-links-title {
  @include typo.body-large();
  font-weight: var(vars.$font-bold);
  margin-bottom: 0.5rem;
}
.overline-links {
  margin-bottom: 2rem;
  ul {
    padding: 0;
  }
}
</style>
