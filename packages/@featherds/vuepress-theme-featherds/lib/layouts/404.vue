<template>
  <FeatherPage class="layout 404">
    <section>
      <div class="section-wrapper">
        <div class="not-found">
          <component :is="errorLogo" v-if="errorLogo" />
          <span>
            <span class="overline">Error 404</span>
            <h3>Sorry! We can't find the page you're looking for.</h3>
            <FeatherButton as-anchor :href="$withBase('/')" primary
              >Return Home</FeatherButton
            >
          </span>
        </div>
      </div>
    </section>
  </FeatherPage>
</template>
<script>
import FeatherPage from "./FeatherPage.vue";
import { FeatherButton } from "@featherds/button";
import { computed } from "vue";
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";
export default {
  setup() {
    const theme = useThemeLocaleData();
    const errorLogo = computed(() => theme.value.errorLogoComponent);
    return { errorLogo };
  },
  components: {
    FeatherPage,
    FeatherButton,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/responsive";
@import "@featherds/styles/themes/variables";

section {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
  background-color: transparent;
  min-height: 65vh;

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: var($hero-gradient-2-1), var($hero-gradient-2-2),
      var($hero-gradient-2-3), var($hero-gradient-2-4);
  }

  .section-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 2.5rem;
    max-width: 37.5rem;

    span.overline {
      @include overline();
      color: var($secondary-variant);
      margin-bottom: 0.75rem;
    }

    h3 {
      @include headline1();
    }

    .not-found {
      padding: 2.5rem 0;
      display: flex;
      flex-basis: 0;
      flex-shrink: 0;
      flex-grow: 1;

      & > :deep(svg) {
        flex: 1;
        flex-basis: 100%;
      }

      & > span {
        flex-direction: column;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-left: 2.5rem;
        padding-right: 1.25rem;
        min-width: 23.75rem;

        p {
          padding-top: 0;
          margin-top: 0.25rem;
          @include body-large();
          color: var($secondary-text-on-surface);
        }

        a.btn {
          margin-bottom: 0;
        }
      }
      @media screen and (max-width: 37.4375rem) {
        flex-direction: column;
        text-align: center;

        span {
          padding: 0;
          display: block;
          min-width: auto;
        }
        :deep(svg) {
          flex-basis: 8.75rem;
          margin-bottom: 2rem;
        }
        h2 {
          margin-bottom: 1.5rem;
        }
        p {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
