<template>
  <div class="feather-demo" :class="selected._text">
    <div class="demo-toolbar">
      <FeatherSelect
        background
        label="Theme"
        v-model="selected"
        :options="themes"
        class="theme-select"
        inline
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
        <slot />
      </div>
    </transition>
    <div class="demo">
      <component :is="component" />
    </div>
  </div>
</template>
<script>
import { THEMES, KEY, watch, unwatch } from "./themes";
import { FeatherButton } from "@featherds/button";
import { FeatherSelect } from "@featherds/select";

export default {
  name: "FeatherDemo",
  props: {
    component: String,
  },
  data() {
    return {
      selected: THEMES[0],
      themes: THEMES,
      showSource: false,
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
    updateValue(v) {
      this.selected = v;
    },
  },
  mounted() {
    this.selected = JSON.parse(window.localStorage.getItem(KEY)) || this.selected;
    watch(this.updateValue);
  },
  unmounted() {
    unwatch(this.updateValue);
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
  width: 170px;
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
