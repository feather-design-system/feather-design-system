<template>
  <div class="telephone">
    <FeatherIcon :icon="icon" class="icon"></FeatherIcon>
    <a :href="formattedNumber" data-ref-id="feather-footer-telephone">{{
      number
    }}</a>
  </div>
</template>
<script lang="ts">
import { FeatherIcon } from "@featherds/icon";
import Call from "@featherds/icon/communication/Phone";
import { defineComponent } from "vue";
export const props = {
  number: {
    type: String,
    required: true,
  },
};
export default defineComponent({
  props,
  computed: {
    icon() {
      return Call;
    },
    formattedNumber() {
      const num = this.number?.replace(/[()-\s]/g, "");
      return `tel:+${num}`;
    },
  },
  components: {
    FeatherIcon,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
.telephone {
  @include body-small();
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .icon {
    font-size: 1.25rem;
    color: var($secondary-text-on-surface);
    margin-right: 0.25rem;
  }
  a {
    @include body-small();
    height: 1.25rem;
    &:hover {
      text-decoration: none;
    }
    &:visited {
      @include body-small();
    }
  }
}
</style>
