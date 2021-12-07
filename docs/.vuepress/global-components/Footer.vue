<template>
  <footer>
    <div class="inner-wrapper">
      <div class="links">
        <ul>
          <li>
            <a
              href="https://github.com/feather-design-system/feather-design-system"
              >GitHub</a
            >
          </li>
          <li>
            <a
              href="https://github.com/feather-design-system/feather-design-system/blob/main/CONTRIBUTING.md"
              >Contributing</a
            >
          </li>
          <li>
            <a
              href="https://github.com/feather-design-system/feather-design-system/blob/main/LICENSE"
              >Licenses</a
            >
          </li>
          <li>
            <a :href="$withBase('/Accessibility.html')">Accessibility</a>
          </li>
          <li>
            <a href="https://nanthealth.com/resources/category/articles/"
              >NantHealth Blog</a
            >
          </li>
          <li>
            <a href="https://www.opennms.com/en/blog/category/blog/"
              >OpenNMS Blog</a
            >
          </li>
          <li>
            <a href="https://www.opennms.com/careers/">OpenNMS Careers</a>
          </li>
          <li>
            <a href="https://nanthealth.com/careers/">Careers</a>
          </li>
        </ul>
        <span class="blurb"> </span>
      </div>
      <div class="branding">
        <a :href="$withBase('/')"><FeatherLogoFull title="Feather DS" /> </a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  components: {},
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
    max-width: var($content-width);
    margin: 0 auto;
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
        //margin-bottom: 28px;
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
        fill: var($primary-text-on-surface);
      }
    }
  }
}
</style>
