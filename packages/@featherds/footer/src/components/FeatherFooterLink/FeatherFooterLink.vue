<template>
  <li>
    <a v-bind="$attrs" :href="href" data-ref-id="feather-footer-link">
      <slot />
    </a>
  </li>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    href: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
  margin: 0 16px;
}
</style>
