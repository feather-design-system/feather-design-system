<template>
  <div class="telephone">
    <FeatherIcon :icon="icon" class="icon"></FeatherIcon>
    <a :href="formattedNumber" data-ref-id="feather-footer-telephone">{{
      number
    }}</a>
  </div>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import Call from "@featherds/icon/communication/Phone";
import { markRaw } from "vue";
export default {
  props: {
    number: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon() {
      return markRaw(Call);
    },
    formattedNumber() {
      const num = this.number.replace(/[()-\s]/g, "");
      return `tel:+${num}`;
    },
  },
  components: {
    FeatherIcon,
  },
};
</script>

<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/typography";
.telephone {
  @include body-small();
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .icon {
    font-size: 20px;
    color: var($secondary-text-on-surface);
    margin-right: 4px;
  }
  a {
    @include body-small();
    height: 20px;
    &:hover {
      text-decoration: none;
    }
    &:visited {
      @include body-small();
    }
  }
}
</style>
