<template>
  <ScrollHideHeader class="feather-app-bar-wrapper" :scroll-hide="scrollHide">
    <template #pre>
      <SkipContentLink :content="content" :skip-label="skipLabel" />
    </template>
    <div class="header">
      <div
        class="header-content center-horiz"
        :class="{ 'full-width': !!full }"
      >
        <div class="left center-horiz">
          <FeatherAppBarLink
            v-if="canShowExpand"
            class="expand-button"
            :icon="menu"
            :title="expandLabel"
            @click.stop.prevent="(expand as () => void)"
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
    </div>
  </ScrollHideHeader>
</template>
<script lang="ts">
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import FeatherAppBarLink from "./FeatherAppBarLink.vue";
import Menu from "@featherds/icon/navigation/Menu";
import { SkipContentLink, ScrollHideHeader } from "@featherds/app-layout";
import { toRef, inject, ref, defineComponent, PropType, Ref } from "vue";

const LABELS = {
  skip: "REQUIRED",
  expand: "Click to expand",
};
export const props = {
  content: {
    type: String,
    required: true,
  },
  labels: {
    type: Object as PropType<Partial<typeof LABELS>>,
    default: () => {
      return LABELS;
    },
    validator: (v: typeof LABELS) => {
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
} as const;

export default defineComponent({
  props,
  setup: (props) => {
    const labels = useLabelProperty<typeof LABELS>(
      toRef(props, "labels"),
      LABELS
    );
    const full = inject("feather-app-layout-full-width", props.fullWidth);

    //scroll hiding
    const transitionClass = ref("no-transition");
    const displayClass = ref("show");
    const wrapper = ref();

    const useExpander = () => {
      interface IExpander {
        active: Ref<boolean>;
        expand: () => void;
      }
      //expand button
      const expander = inject<boolean | (() => IExpander)>(
        "feather-app-layout-expander",
        false
      );
      if (typeof expander === "function") {
        const { active: canShowExpand, expand } = expander();
        return { canShowExpand, expand };
      }
      return { canShowExpand: ref(false), expand: () => {} };
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
    menu() {
      return Menu;
    },
  },
  components: {
    ScrollHideHeader,
    SkipContentLink,
    FeatherAppBarLink,
  },
});
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

.header {
  color: var($state-text-color-on-surface-dark);
  @include elevation(4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: var($zindex-fixed);
  background-color: var($surface-dark);
  border-bottom: 1px solid var($border-on-surface);
  width: 100%;
  height: var($header-height);
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
.full-width.header-content {
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
    margin-right: 0.625rem;
  }
}

.right {
  justify-content: flex-end;
  margin-right: -0.5rem;
  padding-left: 0.5rem;
}

.center {
  flex: 0;
}
</style>
