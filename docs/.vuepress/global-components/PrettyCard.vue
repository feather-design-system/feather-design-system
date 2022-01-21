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
  width: 19.8125rem;
  flex: 0 1 19.8125rem;
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
    text-decoration: none;
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
    padding: 1.5rem 1.5rem 2.5rem 1.5rem;
  }
  span.overline {
    @include overline();
    line-height: normal;
    padding-bottom: 0;
    color: var($primary);
  }
  h3 {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 1rem;
    line-height: var($headline3-font-size);
  }
  .feather-icon {
    color: var($primary);
    position: absolute;
    font-size: 2.5rem;
    bottom: 0;
    right: 0;
    transform: rotate(180deg);
    font-size: 2.5rem;
    margin: 0 0.5rem 0.5rem 0;
  }
}
</style>
