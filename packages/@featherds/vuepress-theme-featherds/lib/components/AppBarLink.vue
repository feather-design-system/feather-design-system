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
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/themes/utils" as utils;
@use "@featherds/styles/mixins/typography" as typo;

a.link {
  @include typo.header();
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
    color: var(vars.$state-color-on-surface-dark);
    text-decoration: none;
  }

  :deep(.ripple) {
    background-color: var(vars.$state-color-on-surface-dark);
    opacity: var(vars.$state-opacity-pressed-on-surface-dark);
  }
  &:focus {
    background: linear-gradient(
      utils.alpha(
        vars.$state-color-on-surface-dark,
        var(vars.$state-opacity-focus-on-surface-dark)
      ),
      utils.alpha(
        vars.$state-color-on-surface-dark,
        var(vars.$state-opacity-focus-on-surface-dark)
      )
    );
  }

  &.active {
    box-shadow: 0px -0.25rem 0px 0px var(vars.$primary-variant) inset;
  }
}
</style>
