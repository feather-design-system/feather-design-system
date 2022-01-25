<template>
  <a :href="url" :aria-label="title" class="link" :class="{ active: active }">
    <slot></slot>
    <FeatherRipple />
  </a>
</template>
<script>
import { FeatherRipple } from "@featherds/ripple";
export default {
  data() {
    return {
      current: false,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    active() {
      const routerHash = decodeURIComponent(this.$route.href);
      return routerHash.toLowerCase().indexOf(this.url.toLowerCase()) != -1;
    },
  },
  components: {
    FeatherRipple,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";
@import "@featherds/styles/mixins/typography";

a.link {
  @include header();
  height: 100%;
  padding: 0.5rem;
  margin: 0 0.75rem;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  &,
  &:active,
  &:hover,
  &:visited {
    color: var($primary-text-on-color);
    text-decoration: none;
  }

  :deep(.ripple) {
    background-color: var($state-color-on-neutral);
    opacity: var($state-opacity-pressed-on-neutral);
  }
  &:focus {
    background: linear-gradient(
      alpha($state-color-on-neutral, var($state-opacity-focus-on-neutral)),
      alpha($state-color-on-neutral, var($state-opacity-focus-on-neutral))
    );
  }

  &.active {
    box-shadow: 0px -0.25rem 0px 0px var($primary-variant) inset;
  }
}
</style>
