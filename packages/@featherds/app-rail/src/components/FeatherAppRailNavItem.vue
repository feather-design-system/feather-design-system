<template>
  <FeatherListItem
    :href="href"
    class="feather-vertical-app-bar-item"
    :class="{ narrow: !expanded }"
  >
    <template v-slot:icon>
      <FeatherIcon v-if="hasIcon" :icon="icon" :title="title" />
    </template>
    <slot>{{ title }}</slot>
  </FeatherListItem>
</template>
<script lang="ts">
import { FeatherIcon } from "@featherds/icon";
import { FeatherListItem } from "@featherds/list";
import { defineComponent, inject, ref } from "vue";
export const props = {
  icon: {
    type: Object,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
} as const;
export default defineComponent({
  props,
  computed: {
    hasIcon() {
      return !!this.icon;
    },
  },
  setup() {
    const expanded = inject("feather-app-rail-expanded", ref(false));
    return { expanded };
  },
  components: {
    FeatherIcon,
    FeatherListItem,
  },
});
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;
@use "@featherds/styles/themes/utils" as utils;

:deep(a.feather-vertical-app-bar-item:focus) {
  box-shadow: none;
}

:deep(a.feather-vertical-app-bar-item) {
  @include typo.subtitle2();
  @include utils.state-on-surface-dark();
  border-radius: 4px;
  transition: margin 280ms ease-in-out, padding 280ms ease-in-out;

  &.feather-list-item:visited {
    &:not(.selected) {
      color: var(vars.$state-text-color-on-surface-dark);
    }
  }

  .feather-list-item-text {
    opacity: 1;
    transition: opacity 280ms ease-in-out;
    transition-delay: 140ms;
  }

  .feather-list-item-icon {
    transition: margin 280ms ease-in-out, padding 280ms ease-in-out;
  }

  &.narrow {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding-left: 9px;
    padding-right: 9px;

    .feather-list-item-icon {
      padding: 0;
      margin: 0;
    }

    .feather-list-item-text {
      transition: opacity 280ms ease-in-out;

      opacity: 0;
    }
  }
}
</style>
