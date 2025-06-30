<template>
  <span
    :class="classes"
    :data-ref-text="tagTitle"
    role="img"
    :aria-label="tagTitle"
    tabindex="0"
  >
    <div class="status">
      <FeatherStatus
        v-if="tagEmphasis !== 'medium'"
        :status="type"
        :dimension="TAG_ICON_SIZE"
        class="status-svg"
        aria-hidden="true"
      />
      <span class="status-text">{{ tagTitle }}</span>
    </div>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { type TagEmphasis, TagProps, type TagType } from "../types";
import { FeatherStatus } from "@featherds/status";
import { useStatusColors } from "@featherds/composables/status/color";

const props = withDefaults(defineProps<TagProps>(), {
  type: "unknown",
  text: undefined,
  emphasis: "medium",
});

const TAG_ICON_SIZE = 16;

const colors = useStatusColors(props.type, 0.2);

const tagType = ref<TagType>(props.type);
const tagEmphasis = ref<TagEmphasis>(props.emphasis);
const tagTitle = computed(() => props.text || props.type);

const classes = computed(() => {
  return {
    "feather-tag": true,
    [tagType.value]: true,
    [tagEmphasis.value]: true,
  };
});
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/themes/utils" as utils;
@use "@featherds/styles/mixins/typography" as typo;
.feather-tag {
  display: inline-block;
  border-radius: 0.25rem;
  user-select: none;

  > .status {
    display: grid;
    grid-template-columns: auto 1fr;
    > .status-svg {
      padding-inline-end: 0.25rem;
    }
    > .status-text {
      display: inline-block;
      margin-inline-start: 0.125rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-transform: capitalize;
    }
  }
  &.low {
    padding: 0.25rem 0.375rem;
    margin: 0 0.25rem 0 0;
  }
  &.medium {
    padding: 0.125rem 0.25rem;
    margin: 0 0.25rem 0 0;
    background-color: v-bind("colors.bgColorAlpha");
    .status > .status-text {
      color: v-bind("colors.color");
    }
  }
  &.high {
    padding: 0.25rem 0.5rem;
    margin: 0 0.5rem 0 0;
    background-color: v-bind("colors.bgColorAlpha");
    .status > .status-text {
      color: v-bind("colors.color");
    }
  }

  > .status {
    .status-svg {
      fill: v-bind("colors.iconColor");
    }
    .status-text {
      color: var(--feather-state-color-on-neutral);
    }
  }
  @include typo.caption();
  position: relative;
  max-width: max(2em, 18ch);
  transition: all 0.3s ease-in-out, background-color 0.2s ease;
  &:focus-visible {
    outline: 0.125rem solid utils.alpha(vars.$primary, 0.1);
    outline-offset: 0.25rem;
  }
}
</style>
