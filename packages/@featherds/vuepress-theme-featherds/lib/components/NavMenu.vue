<template>
  <div
    class="app-rail responsive"
    :class="{
      show: expanded,
    }"
  >
    <div class="app-rail-modal-backdrop"></div>
    <div class="app-rail-content" ref="railContent">
      <FocusTrap :enable="enableFocusTrap">
        <div class="nav-list-container">
          <div class="nav-list">
            <div class="fake-header">
              <a href="/">{{ title }}</a>
            </div>
            <FeatherList class="nav-links">
              <template v-for="group in groups" :key="group.name">
                <FeatherListHeader>{{ group.name }}</FeatherListHeader>
                <template v-for="item in group.items" :key="item.name">
                  <FeatherListItem
                    :href="$withBase(item.url)"
                    :selected="isCurrent($withBase(item.url))"
                    >{{ item.name }}</FeatherListItem
                  >
                </template>
                <FeatherListSeparator />
              </template>
            </FeatherList>
          </div>
        </div>
      </FocusTrap>
    </div>
  </div>
</template>
<script>
import { inject, toRef, computed, ref, watch, nextTick } from "vue";
import {
  FeatherList,
  FeatherListHeader,
  FeatherListItem,
  FeatherListSeparator,
} from "@featherds/list";
import { FocusTrap } from "@featherds/dialog";
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/client";
import { useSiteLocaleData } from "@vuepress/client";
import { useCloseOnEsc } from "@featherds/composables/modal/CloseOnEsc";
import { useRestoreFocus } from "@featherds/composables/modal/RestoreFocus";
import { useOutsideClick } from "@featherds/composables/events/OutsideClick";
export default {
  props: {
    menu: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const register = inject("feather-app-layout-expanded", () => ref(false));
    const { expanded, collapse } = register();
    const railContent = ref();
    const menu = toRef(props, "menu");
    const title = computed(() => useSiteLocaleData().value.title);
    const groups = computed(() => useThemeLocaleData().value.menus[menu.value]);
    useRestoreFocus(expanded);
    watch(useCloseOnEsc(expanded), collapse);
    const activate = useOutsideClick(railContent, collapse);
    watch(expanded, (v) => {
      activate.value = v;
    });

    const enableFocusTrap = ref(false);
    watch(expanded, (v) => {
      if (v) {
        nextTick(() => {
          enableFocusTrap.value = true;
        });
      } else {
        enableFocusTrap.value = false;
      }
    });

    return { groups, title, expanded, railContent, enableFocusTrap };
  },
  methods: {
    isCurrent(url) {
      return this.$router.currentRoute.value.path === url;
    },
  },

  components: {
    FeatherList,
    FeatherListHeader,
    FeatherListItem,
    FeatherListSeparator,
    FocusTrap,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/grid";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/typography";
$width: 16.5rem;
.fake-header {
  display: flex;
  align-items: center;
  height: var($header-height);
  padding-left: 1rem;
  flex: none;
  border-bottom: 1px solid var($border-on-surface);
  a {
    @include headline4;
    color: var($primary-text-on-surface);
    &:hover,
    &:visited,
    &:active {
      color: var($primary-text-on-surface);
    }
  }
}
.nav-list-container {
  display: flex;
  width: $width;
}

.nav-list {
  height: calc(100vh);
  background: var($background);
  color: var($primary-text-on-surface);
  @include elevation(2);
  position: fixed;
  width: $width;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  .nav-links {
    overflow-y: auto;
    flex: 1;
    :deep(.feather-list-item-text) {
      @include body-large;
    }
    :deep(.feather-list-item) {
      height: 3rem !important;
    }
  }
}

@include media-query-below(xl) {
  .app-rail.responsive {
    display: none;
    .app-rail-content {
      position: fixed;
      left: 0;
      top: 0;
      @include elevation(24);
      z-index: var($zindex-modal);
      transition: transform 280ms ease-in-out;
      transform: translateX(-100%);
    }
    .app-rail-modal-backdrop {
      display: none;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: var($zindex-modal-backdrop);
      background-color: var($disabled-text-on-surface);
    }

    &.show {
      display: block;
      .app-rail-content {
        transform: translateX(0);
      }
      .app-rail-modal-backdrop {
        display: block;
      }
    }
  }
}
</style>
