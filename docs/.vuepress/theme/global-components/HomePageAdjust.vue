<template>
</template>
<script>
export default {
  mounted() {
    this.recalc();
    window.addEventListener('scroll', this.recalc);
  },
  unmounted() {
    window.removeEventListener('scroll', this.recalc);
  },
  methods: {
    recalc() {
      //if we've scrolled the page at all
      if(window.scrollY) {
        document.body.classList.remove("pagetop");
      } else {
        document.body.classList.add("pagetop");
      }
    }
  }
};
</script>
<style lang="scss">
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/typography";
body div.feather-styles.layout header.banner {
  transition: all 0.2s linear;
}
.feather-icon.atom {
  height: inherit;
  width: inherit;
  stroke: var($primary);
  circle {
    stroke: none;
  }
}

body.pagetop div.feather-styles.layout {
  & header.banner {
    box-shadow: none;

    &, & .header-content {
      background-color: transparent;
    }

    & .header-content {
      .header-title a, a.link, .toggle, #search-container .DocSearch-Button, .search-icon, .DocSearch.DocSearch-Button:hover .DocSearch-Button-Placeholder {
        color: var($primary-text-on-surface);
      }
      .DocSearch.DocSearch-Button:hover:after, .DocSearch.DocSearch-Button:focus:after, .DocSearch.DocSearch-Button:active:after {
        background-color: var($primary-text-on-surface);
      }
      .DocSearch.DocSearch-Button {
        border-color: var($primary-text-on-surface);
      }
    }
  }
}

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

  & > #main > div.center {
    padding-top: 0;
  }
  .body-large {
    @include body-large();
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
    padding: 80px 0;

    &.philosophy {
      display: flex;

      .left, .right {
        display: flex;
        flex-basis: 50%;
      }

      .left {
        & > span {
          flex-direction: column;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-left: 40px;
          padding-right: 20px;

          border-right: 2px solid var($shade-1);
        }
      }
      .right {
        ol {
          padding-left: calc(40px + 4em);
          list-style-type: decimal-leading-zero;
        }
        li::marker {
          color: var($primary);
          font-size: 2em;
          font-weight: bold;
        }
        dt{
          @include headline2();
        }
        dd {
          margin-inline-start: 0;
        }
        li:first-of-type dl {
          margin-top: 0;
        }
        li:last-of-type dl {
          margin-bottom: 0;
        }
      }
    }
  }

  & > h2 {
    margin-top: 0.1em;
  }

  a.sexy-card {
    display: block;
    max-width: 317px;
    border: 1px solid var($secondary-variant);
    background-color: var($surface);
    border-bottom-right-radius: 16px;

    img {
      display: inline-block;
    }
    span, h3 {
      padding: 0 24px;
    }
    span.overline {
      @include overline();
      margin-top: 24px;
      padding-bottom: 0;
    }
  }
}
</style>
