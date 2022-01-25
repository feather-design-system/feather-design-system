<template>
  <div class="mega-menu">
    <MegaMenuButton @click="menuButtonClicked" :open="open">
      <slot name="button"></slot>
    </MegaMenuButton>
    <transition name="slide-down" @after-enter="afterEnter">
      <div v-if="open" ref="menu" :role="role" class="menu">
        <div class="center">
          <MenuName
            role="presentation"
            class="menu-name"
            :name="name"
          ></MenuName>
          <div
            v-menu-focus-loop
            class="menu-content"
            @keydown="keyPressed"
            @click="menuLinkClicked"
          >
            <slot></slot>
          </div>
        </div>
        <DialogClose
          :close-text="closeText"
          @click.prevent="closeMenu"
        ></DialogClose>
      </div>
    </transition>
  </div>
</template>
<script>
import { DialogClose } from "@featherds/dialog";
import { MenuFocusLoop } from "@featherds/menu";
import MenuName from "./MenuName/MenuName";
import MegaMenuButton from "./MegaMenuButton";
import { ref } from "vue";
import { KEYCODES } from "@featherds/utils/keys";

export default {
  setup() {
    const open = ref(false);
    const focusEl = ref();
    const menuButtonClicked = (e) => {
      if (e && e.srcElement) focusEl.value = e.srcElement;
      open.value = !open.value;
    };

    return {
      open,
      focusEl,
      menuButtonClicked,
    };
  },
  components: {
    DialogClose,
    MenuName,
    MegaMenuButton,
  },
  directives: {
    MenuFocusLoop,
  },
  emits: ["opened", "closed"],
  props: {
    name: {
      type: String,
      required: true,
    },
    closeText: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "menu",
    },
  },
  watch: {
    open(val) {
      if (document) {
        if (val) {
          document.addEventListener("click", this.outsideElementEvent);
          document.addEventListener("focus", this.outsideElementEvent, true);
          this.$emit("opened");
        } else {
          document.removeEventListener("click", this.outsideElementEvent);
          document.removeEventListener("focus", this.outsideElementEvent);
          this.$emit("closed");
        }
      }
    },
  },
  beforeUnmount() {
    // remove outside click handler just incase it hasnt been removed
    if (document) {
      document.removeEventListener("click", this.outsideElementEvent);
      document.removeEventListener("focus", this.outsideElementEvent);
    }
  },
  methods: {
    menuLinkClicked(e) {
      if (e.target.getAttribute("href").length) {
        this.closeMenu();
      }
    },
    outsideElementEvent(e) {
      if (!this.$el.contains(e.target)) {
        this.open = false;
      }
    },
    keyPressed(e) {
      if (e.keyCode === KEYCODES.ESCAPE) {
        this.closeMenu();
      }
    },
    closeMenu() {
      this.open = false;
      if (this.focusEl) this.focusEl.focus();
    },
    afterEnter() {
      const foci = this.$el.querySelector("input, li a");
      //items may not have loaded yet
      if (foci) {
        foci.focus();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/elevation";
@import "@featherds/styles/mixins/flex";
.mega-menu {
  display: inline-block;
  vertical-align: top;
  height: 100%;
}
.menu {
  position: absolute;
  width: 100%;
  left: 0;
  background-color: var($surface);
  @include elevation(8);
  max-height: 90vh;
  overflow: hidden;
  overflow-y: auto;
  z-index: 1;
  & > .center {
    @include flex;
    @include horizontal;
    position: relative;
    max-width: var($content-width);
    margin: 0 auto;
  }
  .menu-content {
    max-height: 100vh;
    margin-top: 2rem;
    margin-left: 2rem;
    margin-right: 0.75rem;
    margin-bottom: 1.5rem;
    width: 100%;
    @include fill;
    & :deep(li > a) {
      border-radius: 0.25rem;
    }
  }
  &.animate {
    transition: transform 250ms;
  }
}
.menu-name {
  @include none();
}
.slide-down-enter-active {
  transition: transform 250ms;
  transform-origin: 0 0;
  overflow: hidden;
  .center {
    transform-origin: 0 0;
    transition: transform 250ms;
  }
}
.slide-down-enter-from {
  transform: scaleY(0);
  .center {
    transform: scaleY(2);
  }
}
.slide-down-enter-to {
  transform: scaleY(1);
  .center {
    transform: scaleY(1);
  }
}
</style>
