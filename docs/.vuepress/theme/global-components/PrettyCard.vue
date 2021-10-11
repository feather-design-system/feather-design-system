<template>
  <a class="pretty-card" :href="$withBase(href)">
    <img :src="$withBase(imgUrl)" :title="overline" />
    <div class="card-inner">
      <span class="overline">{{ overline }}</span>
      <h3><slot /></h3>
    </div>
    <FeatherIcon :icon="arrow" focusable="false"></FeatherIcon>
  </a>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import arrow from "@featherds/icon/navigation/ArrowBack";
export default {
  props: {
    href: {
      type: String,
      required: true,
    },

    imgUrl: {
      type: String,
      required: true,
    },
    overline: {
      type: String,
    },
  },
  computed: {
    arrow() {
      return arrow;
    },
  },
  components: {
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/typography";
a.pretty-card {
  display: inline-block;
  position: relative;
  width: 317px;
  flex: 0 1 317px;
  border: 1px solid var($secondary);
  background-color: var($surface);
  border-bottom-right-radius: 16px;
  text-decoration: none;
  transition: 0.3s;
  vertical-align: middle;
  &:hover,
  &:focus {
    @include elevation(4);
    cursor: pointer;
  }
  &:last-child {
    margin-right: 0;
  }
  h3 {
    @include headline3();
  }

  img {
    display: block;
    margin: 0;
  }
  div.card-inner {
    position: relative;
    padding: 24px 24px 40px 24px;
  }
  span.overline {
    @include overline();
    line-height: normal;
    padding-bottom: 0;
    color: var($primary);
  }
  h3 {
    margin-top: 8px;
    margin-bottom: 0;
    margin-right: 16px;
    line-height: var($headline3-font-size);
  }
  .feather-icon {
    color: var($primary);
    position: absolute;
    font-size: 40px;
    bottom: 0;
    right: 0;
    transform: rotate(180deg);
    font-size: 40px;
    margin: 0 8px 8px 0;
  }
}
</style>
