<template>
  <Transition mode="out-in">
    <FeatherListHeader class="vertical-app-bar-header" v-if="expanded">
      <slot>{{ title }}</slot>
    </FeatherListHeader>
    <li class="vertical-app-bar-separator" v-else><hr /></li>
  </Transition>
</template>
<script lang="ts">
import { FeatherListHeader } from "@featherds/list";
import { defineComponent, inject, ref } from "vue";
export const props = {
  title: {
    type: String,
  },
} as const;
export default defineComponent({
  props,
  setup() {
    const expanded = inject("feather-app-rail-expanded", ref(false));
    return { expanded };
  },
  components: {
    FeatherListHeader,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
.vertical-app-bar-separator {
  height: 3.5rem;
  display: flex;
  align-items: center;
  hr {
    flex: 1;
    border: none;
    margin: 0;
    border-top: 1px solid var($border-on-color);
  }
  &:first-child {
    height: 3rem;
    hr {
      border-top: 1px solid transparent;
    }
  }
}
.vertical-app-bar-header {
  margin-top: 1rem;
  @include overline();
  color: var($state-text-color-on-surface-dark);
  &:first-child {
    margin-top: 0.5rem;
  }
}
.vertical-app-bar-separator {
  &.v-enter-active {
    animation: bar 50ms;
  }

  &.v-leave-active {
    animation: bar 50ms reverse;
  }

  @keyframes bar {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}

.vertical-app-bar-header {
  &.v-enter-active {
    animation: text 450ms;
  }

  &.v-leave-active {
    animation: text-out 500ms;
  }

  @keyframes text {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes text-out {
    0% {
      opacity: 1;
    }
    20% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
