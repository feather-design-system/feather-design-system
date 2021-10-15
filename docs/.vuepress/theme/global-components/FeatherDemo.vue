<template>
  <div class="feather-demo">
    <div class="demo-toolbar">
      <FeatherSelect
        background
        label="demo"
        v-model="selected"
        :options="demos"
        class="theme-select"
        inline
        v-if="demos.length > 1"
      />

      <FeatherButton text @click="showSource = !showSource"
        >view code</FeatherButton
      >
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
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/typography";
.feather-demo {
  border: 1px solid var($shade-4);
  background-color: var($background);
  border-radius: 4px;
  :deep(pre[class*="language-"]) {
    margin: 0;
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
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 4px 4px 0 0;
  > * {
    margin: 0 4px;
  }
}
.demo {
  background-color: var($surface);
  padding: 8px 20px;
  border-radius: 0 0 4px 4px;
}
.theme-changer {
  margin-right: 8px;
}
.theme-select {
  display: inline-block;
  margin-right: 8px;
  &:deep(.feather-select-container) {
    padding: 4px;
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
