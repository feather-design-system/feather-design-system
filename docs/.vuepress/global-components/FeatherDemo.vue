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
        <pre
          class="language-html"
        ><code v-html="activeDemoSource" class="language-html"></code></pre>
      </div>
    </transition>
    <div class="demo">
      <component :is="activeDemoComponent" />
    </div>
  </div>
</template>
<script>
import Prism from "prismjs";
import { ref, computed } from "vue";
import { FeatherButton } from "@featherds/button";
import { FeatherSelect } from "@featherds/select";
export default {
  props: {
    demos: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const showSource = ref(false);
    const demos = ref(props.demos);
    const selected = ref(demos.value[0]);

    const activeDemoComponent = computed(() => selected.value.component);

    const activeDemoSource = computed(() => {
      const src = selected.value.source;
      if (src) {
        return Prism.highlight(src, Prism.languages.markup, "vue");
      }
      return "<div>Sorry no code</div>";
    });

    return {
      showSource,
      demos,
      selected,
      activeDemoComponent,
      activeDemoSource,
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
  components: {
    FeatherButton,
    FeatherSelect,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/responsive";
.feather-demo {
  border: 1px solid var($shade-4);
  background-color: var($background);
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  :deep(pre[class*="language-"]) {
    margin: 0;
    border-radius: 0;
  }
  //revert default documentation styling
  h1 {
    @include headline1();
  }
  h2 {
    @include headline2();
  }

  h3 {
    @include headline3();
  }

  h4 {
    @include headline4();
  }
}
.demo-toolbar {
  background-color: var($background);
  height: 4rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.25rem 0.25rem 0 0;
}
@include media-query-below(m) {
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
  background-color: var($surface);
  padding: 0.5rem 1.25rem;
  border-radius: 0 0 0.25rem 0.25rem;
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
