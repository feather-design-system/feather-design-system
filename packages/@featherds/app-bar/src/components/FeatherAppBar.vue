<template>
  <div
    class="feather-app-bar-wrapper"
    ref="wrapper"
    :class="{ 'full-width': !!full }"
  >
    <a class="skip" :href="contentId">{{ skipLabel }}</a>
    <header class="banner" :class="[displayClass, transitionClass]">
      <div class="header-content center-horiz">
        <div class="left center-horiz">
          <FeatherAppBarLink
            v-if="canShowExpand"
            class="expand-button"
            :icon="menu"
            :title="expandLabel"
            @click.stop.prevent="expand"
            url="#"
          />
          <slot name="left"></slot>
        </div>
        <div class="center center-horiz">
          <slot name="center"></slot>
        </div>
        <div class="right center-horiz">
          <slot name="right"></slot>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import FeatherAppBarLink from "./FeatherAppBarLink";
import { useScroll } from "@featherds/composables/events/Scroll";
import Menu from "@featherds/icon/navigation/Menu";
import { toRef, inject, ref, onMounted } from "vue";
const LABELS = {
  skip: "REQUIRED",
  expand: "Click to expand",
};
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    labels: {
      type: Object,
      default() {
        return LABELS;
      },
      validator(v) {
        return !!v.skip;
      },
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    scrollHide: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const labels = useLabelProperty(toRef(props, "labels"), LABELS);
    const full = inject("feather-app-layout-full-width", props.fullWidth);

    //scroll hiding
    const transitionClass = ref("no-transition");
    const displayClass = ref("show");
    const wrapper = ref();

    if (props.scrollHide) {
      let previousScrollPosition = 0;
      let height = 60;
      const onScroll = () => {
        height = parseInt(
          getComputedStyle(wrapper.value).getPropertyValue(
            "--feather-header-height"
          ),
          10
        );
        const scrollTop = document.documentElement.scrollTop;
        const scrollingDown = scrollTop >= previousScrollPosition;
        previousScrollPosition = scrollTop;
        if (scrollTop > height && scrollingDown) {
          displayClass.value = "hide";
          return;
        }
        if (scrollTop > height && !scrollingDown) {
          displayClass.value = "show";
          return;
        }
        displayClass.value = "show";
      };

      onMounted(() => {
        const documentRef = ref(document);
        const activate = useScroll(documentRef, onScroll);
        activate.value = true;
        onScroll();
        transitionClass.value = "";
      });
    }

    const useExpander = () => {
      //expand button
      const expander = inject("feather-app-layout-expander", false);
      if (expander) {
        const { active: canShowExpand, expand } = expander();
        return { canShowExpand, expand };
      }
      return { canShowExpand: ref(false) };
    };

    return {
      full,
      ...labels,
      transitionClass,
      displayClass,
      wrapper,
      ...useExpander(),
    };
  },
  computed: {
    contentId() {
      return `#${this.content}`;
    },

    menu() {
      return Menu;
    },
  },
  components: {
    FeatherAppBarLink,
  },
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/responsive";
@import "@featherds/styles/mixins/typography";

.center-horiz {
  display: flex;
  align-items: center;
}
.feather-app-bar-wrapper,
.banner {
  width: 100%;
  height: var($header-height);
}

a.skip {
  @include elevation(2);
  @include button();

  background-color: var($surface);
  padding: 2px 4px;
  position: absolute;
  top: 0px;
  left: 0px;
  border: 1px solid var($primary);
  &:focus {
    z-index: var($zindex-tooltip);
  }
}

header {
  color: var($primary-text-on-color);
  @include elevation(4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: var($zindex-fixed);
  background-color: var($secondary);

  transition: transform 280ms ease-in-out;
  &.show {
    transform: translateY(0px);
  }
  &.hide {
    transform: translateY(-100%);
  }
  &.no-transition {
    transition: none;
  }
}

.header-content {
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  max-width: var($content-width);
  padding-top: 0;
  padding-bottom: 0;
  padding-left: $xl-gutter;
  padding-right: $xl-gutter;

  @include media-query-for(s) {
    padding-left: $s-gutter;
    padding-right: $s-gutter;
  }
  .expand-button {
    display: none;
  }
  @include media-query-below(xl) {
    .expand-button {
      display: flex;
    }
  }
}
.full-width .header-content {
  max-width: none;
}

.right,
.left,
.center {
  flex: 1;
  height: 100%;
  flex-shrink: 0;
}

.left {
  & *:first-child {
    margin-right: 10px;
  }
}

.right {
  justify-content: flex-end;
  margin-right: -8px;
  padding-left: 8px;
}

.center {
  flex: 0;
}
</style>
