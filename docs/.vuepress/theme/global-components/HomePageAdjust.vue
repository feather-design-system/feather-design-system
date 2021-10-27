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
@import "~@featherds/styles/mixins/elevation";
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
header.banner {
  background-color: transparent;
  box-shadow: none;
}
body.pagetop div.feather-styles.layout {
  & header.banner {
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

  &.gradient-1, &.gradient-2 {
    &, &:before {
      background-color: transparent;
    }
    .header-mask {
      background: transparent;
    }
  }
  &.gradient-1:before {
    background:
      var($hero-gradient-1-1),
      var($hero-gradient-1-2),
      var($hero-gradient-1-3);
  }
  &.gradient-2:before {
    background:
      var($hero-gradient-2-1),
      var($hero-gradient-2-2),
      var($hero-gradient-2-3),
      var($hero-gradient-2-4);
  }

  .section-wrapper {
    margin: 0 auto;
    max-width: var($content-width);
    text-align: left;
    padding: 80px 40px;

    &.center {
      text-align: center;
    }

    button.btn-secondary > svg path {
      fill: var($primary);
    }

    &.learn {
      h2 {
        margin-top: 0;
      }
    }

    &.philosophy {
      display: flex;
      flex-wrap: wrap;
      padding: 40px;

      .left, .right {
        padding: 40px 0;
        display: flex;
        flex-basis: 0;
        flex-shrink: 0;
        flex-grow: 1;
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

          p {
            padding-top: 0;
            margin-top: 5px;
            @include body-large();
            color: var($secondary-text-on-surface)
          }
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
        dl {
          margin-bottom: 24px;
        }
        dt{
          @include headline2();
        }
        dd {
          @include body-small();
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

    &.story {
      display: flex;
      justify-content: center;
      position: relative;
      padding: 40px 48px 48px 48px;

      svg.logo.feather-icon {
        color: var($primary);
        position: absolute;
        font-size: 30px;
        margin-left: -46px;
        opacity: .2;
      }
      .title, .tagline {
        display: block;
      }
      .tagline {
        @include overline();
        line-height: var($overline-font-size);
        color: var($primary);
        padding-bottom: 8px;
      }
      .title {
        @include title();
        line-height: var($title-font-size);
      }
    }
  }

  & > h2 {
    margin-top: 0.1em;
  }

  div.card-group {
    display: flex;
    justify-content: space-around;
    margin-top: 36px;
  }
  a.sexy-card {
    display: block;
    max-width: 317px;
    border: 1px solid var($secondary);
    background-color: var($surface);
    border-bottom-right-radius: 16px;
    text-decoration: none;
    transition: 0.3s;

    &:hover, &:focus {
      @include elevation(4);
      cursor: pointer;
    }

    img {
      display: block;
    }
    div.card-inner {
      position: relative;
      padding: 24px 24px 32px 24px;
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
}
</style>
