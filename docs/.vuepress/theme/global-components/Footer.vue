<template>
  <footer>
    <div class="inner-wrapper">
      <div class="links">
        <ul>
          <li>
            <a href="#">GitHub</a>
          </li>
          <li>
            <a href="#">Contributing</a>
          </li>
          <li>
            <a href="#">Licenses</a>
          </li>
          <li>
            <a href="#">Accessibility</a>
          </li>
          <li>
            <a href="#">NantHealth Blog</a>
          </li>
          <li>
            <a href="#">OpenNMS Blog</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
        </ul>
        <span class="blurb">
          A blurb about the Feather Design system. This could also be a place
          that links to opening an issue to GitHub
        </span>
      </div>
      <div class="branding">
        <a :href="$withBase('/')"
          ><FeatherIcon :icon="LogoFull" title="Feather DS"></FeatherIcon
        ></a>
      </div>
    </div>
  </footer>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import FeatherLogoFull from "@featherds/icon/branding/FeatherLogoFull";
export default {
  data() {
    return {
      LogoFull: FeatherLogoFull,
    };
  },
  components: {
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
footer {
  background-color: var($background);
  flex-basis: 100%;

  .inner-wrapper {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    padding: 40px 40px;

    .links {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 40px;
      border-bottom: 2px solid var($shade-1);

      ul {
        @include overline();
        list-style: none;
        padding: 0;
        margin: 0;
        margin-right: 180px;
        columns: 2;
        margin-bottom: 28px;
        li {
          margin-bottom: 16px;
        }
        a {
          color: var($primary-text-on-surface);
        }
      }
      ul,
      span.blurb {
        flex-basis: 320px;
        flex-shrink: 0;
      }
    }

    @media screen and (max-width: 899px) {
      .links {
        justify-content: space-between;
        ul {
          margin-right: 40px;
          flex-basis: auto;
        }
      }
    }
    @media screen and (max-width: 680px) {
      .links {
        ul {
          margin-right: 0;
        }
        span.blurb {
          flex-basis: 100%;
        }
      }
    }
    @media screen and (max-width: 360px) {
      .links {
        ul {
          columns: 1;
        }
      }
    }
    .branding {
      margin-top: 40px;

      svg {
        height: auto;
        width: auto;
        color: var($primary-text-on-surface);
      }
    }
  }
}
</style>
