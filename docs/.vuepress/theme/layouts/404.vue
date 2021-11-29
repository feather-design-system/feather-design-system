<template>
  <FeatherPage class="layout 404">
    <section>
      <div class="section-wrapper">
        <div class="not-found">
          <AtomError />
          <span>
            <span class="overline">Error 404</span>
            <h3>
              Sorry! We can't find the page you're looking for.
            </h3>
            <FeatherButton as-anchor :href="$withBase('/')" primary>Return Home</FeatherButton>
          </span>
        </div>
      </div>
    </section>
  </FeatherPage>
</template>
<script>
import FeatherPage from "./FeatherPage.vue";
import AtomError from "../components/AtomError.vue";
import { FeatherButton } from "@featherds/button";

export default {
  components: {
    FeatherPage,
    AtomError,
    FeatherButton
  },
  mounted() {
  },
  unmounted() {
  },
  methods: {
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
    padding: 40px;
    max-width: 600px;

    span.overline {
      @include overline();
      color: var($secondary-variant);
      margin-bottom: 12px;
    }

    h3 {
      @include headline1();
    }

    .not-found {
      padding: 40px 0;
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
        padding-left: 40px;
        padding-right: 20px;
        min-width: 380px;

        p {
          padding-top: 0;
          margin-top: 5px;
          @include body-large();
          color: var($secondary-text-on-surface);
        }

        a.btn {
          margin-bottom: 0;
        }
      }
      @media screen and (max-width: 599px) {
        flex-direction: column;
        text-align: center;

        span {
          padding: 0;
          display: block;
          min-width: auto;
        }
        :deep(svg) {
          flex-basis: 140px;
          margin-bottom: 32px;
        }
        h2 {
          margin-bottom: 24px;
        }
        p {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
