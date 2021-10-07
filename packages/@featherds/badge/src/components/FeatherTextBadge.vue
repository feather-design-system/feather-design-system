<template>
  <span class="feather-text-badge" :class="type"><slot /></span>
</template>
<script>
export default {
  props: {
    type: { type: String, required: true },
  },
};
</script>
<style scoped lang="scss">
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";
@import "@featherds/styles/mixins/typography";
.feather-text-badge {
  height: 20px;
  padding: 2px 8px;
  display: inline-flex;
  align-items: center;
  border-radius: 2px;
  @include caption;
  text-transform: uppercase;
  font-weight: var($font-bold);
  margin-left: 8px;
  &.error {
    color: var($error);
    background-color: alpha($error, 0.12);
  }
  &.info {
    color: var($primary);
    background-color: alpha($primary, 0.12);
  }
}
</style>
