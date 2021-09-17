<template>
  <div class="figure-container">
    <div
      class="primary-action-area"
      :class="{ clickable: !!href }"
      @click="handlePrimaryAction"
    >
      <figure>
        <slot />
      </figure>
      <figcaption>
        <p class="title">{{ title }}</p>
        <p class="description">{{ description }}</p>
      </figcaption>
      <feather-ripple v-if="href"></feather-ripple>
    </div>
    <div class="caption-footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
import { FeatherRipple } from "@featherds/ripple";
export default {
  props: {
    title: String,
    description: String,
    href: String,
  },
  computed: {
    relativeUrl() {
      return this.$withBase(this.href);
    },
  },
  methods: {
    handlePrimaryAction() {
      if (this.href) {
        window.location.href = this.relativeUrl;
      }
    },
  },
  components: {
    FeatherRipple,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/mixins/typography";
@import "~@featherds/styles/mixins/elevation";
@import "~@featherds/styles/themes/variables";
.primary-action-area {
  position: relative;
  &.clickable {
    cursor: pointer;
  }
  :deep(.ripple) {
    background-color: var($state-color-on-surface);
    opacity: var($state-opacity-pressed-on-surface);
  }
}
div.figure-container {
  width: 220px;
  display: inline-block;
  padding: 0;
  margin: 8px;
  @include elevation(0);
  background-color: var($surface);
}
figure {
  padding: 0;
  margin: 0;
  text-align: center;
  text-align: center;
  background-color: var($background);
  min-height: 150px;

  min-width: 150px;

  display: flex;

  justify-content: center;

  align-items: center;
}
figcaption {
  padding: 8px;
}
p {
  margin: 0;
}
p.title {
  @include subtitle1();
  margin-bottom: 0px;
}
p.description {
  min-height: 45px;
  color: var($secondary-text-on-surface);
}

.caption-footer {
  padding: 0;
  text-align: center;
  :deep(.btn) {
    margin-bottom: 0px;
  }
  :deep(.btn + .btn) {
    margin-left: 4px;
  }
}
</style>
