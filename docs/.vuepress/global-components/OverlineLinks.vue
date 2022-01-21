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
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";

.overline-links-title {
  @include body-large();
  font-weight: var($font-bold);
  margin-bottom: 0.5rem;
}
.overline-links {
  margin-bottom: 2rem;
  ul {
    padding: 0;
  }
}
</style>
