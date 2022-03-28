<template>
  <a
    :title="title"
    data-ref-id="feather-date-input-icon"
    class="action-icon hide-when-disabled hover focus"
    href="#"
    @click.stop.prevent="swallow"
  >
    <FeatherIcon :icon="icon" />
  </a>
</template>
<script lang="ts">
import DateIcon from "@featherds/icon/action/CalendarStartDate";
import { FeatherIcon } from "@featherds/icon";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  computed: {
    icon() {
      return DateIcon;
    },
  },
  methods: {
    swallow() {},
  },
  components: {
    FeatherIcon,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";
.action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var($secondary-text-on-surface);
  font-size: 1.25rem;
  height: 1.625rem;
  width: 1.625rem;
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid transparent;

  @include state-on-surface();
  &:focus {
    outline: 0;
    border-color: var($primary);
  }

  &:visited,
  &:active {
    color: var($secondary-text-on-surface);
  }

  &:hover {
    color: var($primary-text-on-surface);
  }
}
</style>
