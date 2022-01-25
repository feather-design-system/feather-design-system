<template>
  <FeatherPage class="layout homepage">
    <div class="center content feather-container">
      <main class="main-content">
        <div class="hero">
          <section class="gradient-1">
            <div class="section-wrapper center">
              <h1>Welcome to the Feather Design System</h1>
              <p class="body-large">
                Feather DS is an open source design system built around
                simplicity, consistency, and accessibility.
              </p>
              <div class="space-between">
                <FeatherButton
                  primary
                  as-anchor
                  :href="$withBase('/Components/GettingStarted/')"
                  >Get Started</FeatherButton
                >
                <FeatherButton
                  secondary
                  as-anchor
                  href="https://github.com/feather-design-system/feather-design-system"
                  target="_blank"
                >
                  <template v-slot:icon>
                    <svg
                      style="fill: currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </template>
                  Github
                </FeatherButton>
              </div>
            </div>
          </section>
        </div>

        <section>
          <div class="section-wrapper philosophy">
            <div class="left">
              <AtomBranded />
              <span>
                <h2>Our Design Philosophy</h2>
                <p>
                  We see a digital landscape where all users are entitled to a
                  robust, familiar experience. An experience that provides an
                  engaging, yet efficient means of meeting a wide range of user
                  needs.
                </p>
              </span>
            </div>
            <div class="right">
              <ol>
                <li>
                  <dl>
                    <dt>Simplicity</dt>
                    <dd>
                      Refinement of elements is necessary to thoughtfully
                      compose design that communicates the clearest.
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>Consistency</dt>
                    <dd>
                      Learning is based on patterns, so we’ve developed a common
                      set of components and behaviors.
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>Accessibility</dt>
                    <dd>
                      We believe the tools we build should deliver the best
                      experience possible to the widest audience of users.
                    </dd>
                  </dl>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section class="gradient-2">
          <div class="section-wrapper learn">
            <h2>Learn More About Feather DS</h2>
            <p class="body-small">
              Get started on your next project with our most popular development
              and design assets and resources.
            </p>
            <div class="card-group">
              <PrettyCard
                href="/Components/GettingStarted/"
                img-url="/assets/branding/home-components.png"
                overline="Components"
                >Getting Started
              </PrettyCard>
              <PrettyCard
                href="/Design/Foundation/"
                img-url="/assets/branding/home-foundation.png"
                overline="Foundation"
                >Design Principles
              </PrettyCard>
              <PrettyCard
                href="/Components/"
                img-url="/assets/branding/home-typography.png"
                overline="Components"
                >Browse All Components
              </PrettyCard>
            </div>
          </div>
        </section>

        <section>
          <div class="section-wrapper story">
            <div class="story-wrapper">
              <FeatherLogoMotif></FeatherLogoMotif>
              <span class="tagline">Our Story</span>
              <span class="title">
                NantHealth builds technology that simplifies healthcare
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  </FeatherPage>
</template>

<script>
import { FeatherButton } from "@featherds/button";
import AtomBranded from "../components/AtomBranded.vue";
import FeatherPage from "@featherds/vuepress-theme-featherds/lib/layouts/FeatherPage.vue";
import icon from "@featherds/icon/action/Help";
export default {
  components: {
    FeatherButton,
    FeatherPage,
    AtomBranded,
  },
  computed: {
    icon() {
      return icon;
    },
  },
  mounted() {
    this.recalc();
    window.addEventListener("scroll", this.recalc);
  },
  unmounted() {
    window.removeEventListener("scroll", this.recalc);
  },
  methods: {
    recalc() {
      //if we've scrolled the page at all
      if (window.scrollY) {
        document.body.classList.add("pagescroll");
        document.body.classList.remove("pagetop");
      } else {
        document.body.classList.remove("pagescroll");
        document.body.classList.add("pagetop");
      }
    },
  },
};
</script>

<style lang="scss">
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/elevation";

body.pagescroll div.feather-styles.layout.homepage header.banner {
  background-color: var($secondary);
  transition: all 0.2s linear;
  @include header();
}

div.feather-styles.homepage.layout {
  div.feather-app-bar-wrapper {
    position: fixed;
    z-index: 3;

    a.skip {
      margin-left: -10000000px;
      &:focus {
        margin-left: 0px;
      }
    }
  }

  .body-large {
    @include body-large();
  }
}
.feather-styles.homepage.layout #main .center.content {
  padding: 0;
  margin: 0;
  max-width: none;
}

//content adjustments
.feather-styles.homepage section {
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

  &.gradient-1,
  &.gradient-2 {
    &,
    &:before {
      background-color: transparent;
    }
  }
  &.gradient-1 > .section-wrapper {
    padding-top: 8.75rem;
  }
  &.gradient-1:before {
    background: var($hero-gradient-1-1), var($hero-gradient-1-2),
      var($hero-gradient-1-3);
  }
  &.gradient-2:before {
    background: var($hero-gradient-2-1), var($hero-gradient-2-2),
      var($hero-gradient-2-3), var($hero-gradient-2-4);
  }

  .section-wrapper {
    h1 {
      @include headline1();
      margin-bottom: 1rem;
    }
    h2 {
      @include headline2();
    }
    h3 {
      @include headline3();
    }
    margin: 0 auto;
    max-width: var($content-width);
    text-align: left;
    padding: 5rem 2.5rem;

    &.center {
      text-align: center;

      p.body-large {
        max-width: 31.25rem;
        margin: 0 auto;
      }

      .space-between {
        margin: 2rem 0 1rem 0;

        button {
          margin: 0.25rem;
        }
      }
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
      padding: 2.5rem;

      .left,
      .right {
        padding: 2.5rem 0;
        display: flex;
        flex-basis: 0;
        flex-shrink: 0;
        flex-grow: 1;
      }

      .left {
        & > svg {
          flex: 0 0;
          flex-basis: 8.75rem;
        }
        & > span {
          flex-direction: column;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-left: 2.5rem;
          padding-right: 1.25rem;

          border-right: 2px solid var($shade-1);

          p {
            padding-top: 0;
            margin-top: 0.25rem;
            @include body-large();
            color: var($secondary-text-on-surface);
          }
        }
      }
      .right {
        ol {
          padding-left: calc(2.5rem + 4em);
          list-style-type: decimal-leading-zero;
        }
        li::marker {
          color: var($primary);
          font-size: 2em;
          font-weight: bold;
        }
        dl {
          margin-bottom: 1.5rem;
        }
        dt {
          @include headline2();
        }
        dd {
          @include body-small();
          margin-inline-start: 0;
          margin-top: 0.5rem;
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
      padding: 2.5rem 3rem 3rem 3rem;

      svg {
        fill: var($primary);
        position: absolute;
        font-size: 1.875rem;
        margin-left: -2.875rem;
        opacity: 0.2;
      }
      .title,
      .tagline {
        display: block;
      }
      .tagline {
        @include overline();
        line-height: var($overline-font-size);
        color: var($primary);
        padding-bottom: 0.5rem;
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
    margin-top: 2.25rem;
    display: flex;
    justify-content: space-between;
  }
}

//responsive adjustments
@media screen and (min-width: 44.9375rem) {
  body div.feather-styles.layout.homepage header.banner {
    background-color: transparent;
    box-shadow: none;
  }
  //Header tweaks
  body.pagetop div.feather-styles.homepage.layout {
    & header.banner {
      .header-content {
        .header-title a,
        a.link,
        .toggle,
        #search-container .DocSearch-Button,
        .search-icon,
        .DocSearch.DocSearch-Button:hover .DocSearch-Button-Placeholder {
          color: var($primary-text-on-surface);
        }
        .DocSearch.DocSearch-Button:hover:after,
        .DocSearch.DocSearch-Button:focus:after,
        .DocSearch.DocSearch-Button:active:after {
          background-color: var($primary-text-on-surface);
        }
        .DocSearch.DocSearch-Button {
          border-color: var($primary-text-on-surface);
        }
      }
    }
  }
}
@media screen and (max-width: 46.875rem) {
  .feather-styles.homepage section .section-wrapper.philosophy {
    flex-direction: column;
    .left,
    .right {
      padding: 0;
    }
    .left {
      span {
        border-right: none;
      }
      @media screen and (max-width: 37.4375rem) {
        flex-direction: column;
        text-align: center;

        span {
          padding: 0;
          display: block;
        }
        svg {
          height: 8.75rem;
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
    .right {
      margin-top: 2.5rem;
      ol {
        padding-left: 3.125rem;
      }
    }
  }
  .DocSearch.DocSearch-Button {
    border: none;
  }
  .right-container .btn.btn-icon {
    margin-right: 0;
  }
}

@media screen and (max-width: 60rem) {
  .feather-styles.homepage section div.card-group {
    h3 {
      @include headline4();
      margin-top: 0.5rem;
      margin-bottom: 0;
      margin-right: 1rem;
      line-height: var($headline3-font-size);
    }
    a.pretty-card {
      flex: 0 0 33%;
      height: auto;
    }
  }
}
@media screen and (max-width: 37.4375rem) {
  .feather-styles.homepage section {
    .learn h2,
    .learn p {
      text-align: center;
    }
    div.card-group {
      justify-content: center;
      flex-wrap: wrap;
      a.pretty-card {
        flex: 0 0 100%;
        max-width: 19.8125rem;
        margin-bottom: 1.5rem;
      }
    }
  }
}

@media screen and (max-width: 56.1875rem) {
  .feather-styles.homepage section .section-wrapper.story {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
  .feather-styles.homepage section .section-wrapper.story svg {
    position: relative;
    margin-left: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
