<template>
</template>
<style lang="scss">
@import "~@featherds/styles/themes/variables";
  div.feather-styles.layout {

    & > div.feather-app-bar-wrapper {
      position: fixed;
      z-index: 3;

      & > a.skip {
        margin-left: -10000000px;
        &:focus {
          margin-left: 0px;
        }
      }
    }

    & header.banner {
      box-shadow: none;

      &, & .header-content {
        background-color: transparent;
      }

      & .header-content {
        .header-title a, a.link, .toggle, span.search-container input, span.search-container svg {
          color: var($primary-text-on-surface);
        }
        span.search-container input, .toggle:focus {
          border-color: var($primary-text-on-surface);
        }
      }
    }

    & > #main > div.center {
      padding-top: 0;
    }

  }
  .feather-styles.layout > #main > .center.content {
    padding: 0;
    margin: 0;
    max-width: none;
  }
  .feather-styles section {
    position: relative;
    z-index: 0;
    //margin: 0 -600rem;
    /* add back negative margin value */
    //padding: 0.25rem 600rem;
    background-color: var($surface);
    &:before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: var($surface);
    }

    .section-wrapper {
      margin: 0 auto;
      max-width: var($content-width);
      text-align: left;
    }

    & > h2 {
      margin-top: 0.1em;
    }

    &.light {
      background-color: #FFF;
    }
  }
</style>
