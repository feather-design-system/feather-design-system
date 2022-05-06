<template>
  <component
    :is="tag"
    class="feather-card focus"
    :class="hover"
    data-ref-id="feather-card"
    :href="href"
  >
    <header class="feather-card-title">{{ title }}</header>
    <div v-if="$slots.image" class="feather-card-image-container">
      <slot name="image"></slot>
    </div>
    <p v-if="subtitle && subtitle.length > 0" class="feather-card-subtitle">
      {{ subtitle }}
    </p>
    <div class="feather-card-content">
      <slot></slot>
    </div>
    <div class="feather-card-actions-container">
      <slot v-if="actionsAllowed" name="actions"></slot>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export const props = {
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  href: { type: String, required: false },
};

export default defineComponent({
  props,
  computed: {
    actionsAllowed() {
      return this.$slots.actions && !this.href ? true : false;
    },
    hover() {
      return this.tag === "a" ? "hover" : "";
    },
    tag() {
      return this.href ? "a" : "article";
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/themes/utils";

.feather-card {
  @include elevation(2);
  @include state-on-surface();
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0;
  border-radius: 4px;

  &:hover,
  &:focus,
  &:active,
  &:visited {
    text-decoration: none;
  }

  .feather-card-title {
    @include headline4;
    margin: 1rem;
    color: var($primary-text-on-surface);
  }

  .feather-card-image-container {
    display: flex;
    margin: 0 0 1rem 0;
    padding: 0;
  }

  .feather-card-subtitle {
    @include subtitle2;
    color: var($secondary-text-on-surface);
    margin: 0 1rem 0.5rem;
  }

  .feather-card-content {
    @include body-small;
    color: var($secondary-text-on-surface);
    margin: 0 0 1rem 1rem;
    padding-right: 1rem;
  }

  .feather-card-actions-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    flex-flow: row wrap;
    height: 100%;
    margin: 0 1rem 0.5rem 1rem;
  }
}
</style>
