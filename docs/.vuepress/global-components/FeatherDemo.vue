<template>
  <div class="feather-demo">
    <div class="demo-toolbar">
      <FeatherButton text @click="showSource = !showSource"
        >view code</FeatherButton
      >
      <FeatherSelect
        background
        label="demo"
        v-model="selected"
        :options="demos"
        class="theme-select"
        inline
        v-if="demos.length > 1"
      />
    </div>
    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div class="source" v-if="showSource">
        <div v-if="!activeDemoSupporting || activeDemoSupporting.length === 0">
          <pre
            class="language-html"
          ><code v-html="activeDemoSource" class="language-html"></code>
          </pre>
        </div>
        <template v-else>
          <FeatherTabContainer>
            <template v-slot:tabs>
              <FeatherTab ref="firstTabRef">
                <div>
                  <FeatherIcon :icon="ViewCode" class="source-tab" />
                </div>
              </FeatherTab>
              <template v-if="activeDemoSupporting">
                <FeatherTab
                  v-for="(file, index) in activeDemoSupporting"
                  :key="file.filename"
                  :id="`tab-${index}`"
                  :aria-controls="`panel-${index}`"
                >
                  {{ file.filename }}
                </FeatherTab>
              </template>
            </template>
            <FeatherTabPanel
              :id="`tabpanel-0`"
              aria-labelledby="tab-0"
              v-if="activeDemoSource"
            >
              <pre
                class="language-html"
              ><code v-html="activeDemoSource" class="language-html"></code>
              </pre>
            </FeatherTabPanel>
            <template v-if="activeDemoSupporting">
              <FeatherTabPanel
                v-for="(file, index) in activeDemoSupporting"
                :key="file.filename"
                :id="`tabpanel-${index}`"
                :aria-labelledby="`tab-${index}`"
              >
                <pre
                  class="language-html"
                ><code v-html="formatSource(file.source, file.ext)" class="language-html"></code>
                </pre>
              </FeatherTabPanel>
            </template>
          </FeatherTabContainer>
        </template>
      </div>
    </transition>
    <div class="demo">
      <component :is="activeDemoComponent" />
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import { FeatherButton } from "@featherds/button";
import { FeatherSelect } from "@featherds/select";
import { FeatherIcon } from "@featherds/icon";
import { FeatherExpansionPanel } from "@featherds/expansion";
import {
  FeatherTab,
  FeatherTabPanel,
  FeatherTabContainer,
} from "@featherds/tabs";
import ViewCode from "@featherds/icon/network/ViewCode";
export default {
  props: {
    demos: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const firstTabRef = ref(null);
    const showSource = ref(false);
    const demos = ref(props.demos);
    const selected = ref(demos.value[0]);

    const activeDemoComponent = computed(() => selected.value.component);

    const activeDemoSource = computed(() => {
      const src = selected.value.source;
      return getVueMarkup(src, "vue");
    });

    const activeDemoSupporting = computed(() => {
      return selected.value.supporting || [];
    });

    const formatSource = (source, ext) => {
      return getVueMarkup(source, ext);
    };

    const getVueMarkup = (source, ext) => {
      if (source) {
        let language = Prism.languages.markup;
        console.log(Prism.languages);
        if (ext === 'vue') {
          language = Prism.languages.markup
        }
        if (ext === 'js' || ext === 'javacript') {
          language = Prism.languages.javascript;
        }
        if (ext === 'ts' || ext === 'typescript') {
          language = Prism.languages.typescript;
        }
        return Prism.highlight(source, language, ext || "html");
      }
      return "<div>Sorry no code</div>";
    };

    return {
      showSource,
      demos,
      selected,
      activeDemoComponent,
      activeDemoSource,
      activeDemoSupporting,
      firstTabRef,
      formatSource,
      getVueMarkup,
      ViewCode,
    };
  },
  methods: {
    enter(element) {
      const width = getComputedStyle(element).width;

      element.style.width = width;
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.height = "auto";

      const height = getComputedStyle(element).height;

      element.style.width = "";
      element.style.position = "";
      element.style.visibility = "";
      element.style.height = 0;

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height;

      // Trigger the animation.
      // We use `setTimeout` because we need
      // to make sure the browser has finished
      // painting after setting the `height`
      // to `0` in the line above.
      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    },
    leave(element) {
      const height = getComputedStyle(element).height;

      element.style.height = height;

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height;

      setTimeout(() => {
        element.style.height = 0;
      });
    },
  },
  updated() {
    if (this.firstTabRef) {
      this.$nextTick(() => {
        // this.firstTabRef.$el.click();
        this.firstTabRef.$el.children[0].click();
      });
    }
  },
  components: {
    FeatherButton,
    FeatherSelect,
    FeatherTab,
    FeatherTabPanel,
    FeatherTabContainer,
    FeatherExpansionPanel,
    FeatherIcon,
    ViewCode,
  },
};
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;
@use "@featherds/styles/mixins/responsive" as resp;
.feather-demo {
  border: 1px solid var(vars.$shade-4);
  background-color: var(vars.$background);
  border-radius: 4px;
  margin-bottom: 1rem;
  :deep(pre[class*="language-"]) {
    margin: 0;
    border-radius: 0;
  }
  //revert default documentation styling
  h1 {
    @include typo.headline1();
  }
  h2 {
    @include typo.headline2();
  }

  h3 {
    @include typo.headline3();
  }

  h4 {
    @include typo.headline4();
  }
  .source-tab {
    @include typo.headline4();
    margin: 0;
    padding: 0;
  }
}
.demo-toolbar {
  background-color: var(vars.$background);
  height: 4rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px 4px 0 0;
}
@include resp.media-query-below(m) {
  .demo-toolbar {
    flex-direction: column-reverse;
    height: auto;
    .theme-select {
      width: 80%;
    }
    .btn-text {
      margin: 0.5rem 0;
    }
  }
}
.demo {
  background-color: var(vars.$surface);
  padding: 0.5rem 1.25rem;
  border-radius: 0 0 4px 4px;
  position: relative;
}
.theme-changer {
  margin-right: 0.5rem;
}
.theme-select {
  display: inline-block;
  width: 17.5rem;
  &:deep(.feather-select-container) {
    padding: 0.25rem;
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: height 250ms ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
}
</style>
