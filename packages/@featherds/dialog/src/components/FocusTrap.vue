<template>
  <div>
    <div tabindex="0"></div>
    <div class="focus-trap-content" ref="content">
      <slot />
    </div>
    <div tabindex="0"></div>
  </div>
</template>
<script lang="ts">
import { ref, nextTick, defineComponent } from "vue";
export const props = {
  enable: {
    type: Boolean,
    required: true,
  },
} as const;

export default defineComponent({
  props,
  data() {
    return {
      rendered: false,
    };
  },
  setup() {
    const content = ref();
    const ignoreUtilFocusChanges = ref(false);

    const comparePositionInDOM = (a: HTMLElement, b: HTMLElement) => {
      let result = a.compareDocumentPosition(b);

      if (result === 0x02) return "before";
      if (result === 0x04) return "after";
      //The bitmask returned is additive, so if b is a child it is one of the above
      //plus 'document_position_contains' which is '8', so in this case a parent can
      //be 8 + before/after which means 10 or potentially 12.
      //see https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition#return_value
      if (result === 0x0a || result === 0x0c) return "parent";
      return "parent";
    };

    const focusFirstDescendant = (element: HTMLElement) => {
      for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];
        if (
          attemptFocus(child as HTMLElement) ||
          focusFirstDescendant(child as HTMLElement)
        ) {
          return true;
        }
      }
      return false;
    };
    const focusLastDescendant = (element: HTMLElement) => {
      for (var i = element.childNodes.length - 1; i >= 0; i--) {
        var child = element.childNodes[i];
        if (
          attemptFocus(child as HTMLElement) ||
          focusLastDescendant(child as HTMLElement)
        ) {
          return true;
        }
      }
      return false;
    };
    const attemptFocus = (element: HTMLElement) => {
      if (!isFocusable(element)) {
        return false;
      }

      ignoreUtilFocusChanges.value = true;
      if (element.focus) {
        element.focus();
      }
      ignoreUtilFocusChanges.value = false;
      return document.activeElement === element;
    };

    const isFocusable = (element: HTMLElement) => {
      if (
        element.tabIndex > 0 ||
        (element.tabIndex === 0 && element.getAttribute("tabIndex") !== null)
      ) {
        return true;
      }
      const button = element as HTMLButtonElement;
      if (button.disabled || button.tabIndex === -1) {
        return false;
      }

      switch (element.nodeName) {
        case "A":
          const anchor = element as HTMLAnchorElement;
          return !!anchor.href && anchor.rel !== "ignore";
        case "INPUT":
          const el = element as HTMLInputElement;
          return el.type !== "hidden" && el.type !== "file";
        case "BUTTON":
        case "SELECT":
        case "TEXTAREA":
        case "IFRAME":
          return true;
        default:
          return false;
      }
    };

    const attemptToFocusFirst = (el: HTMLElement) => {
      const firstFocus = el.querySelector("[first-focus]") as HTMLElement;
      if (firstFocus && firstFocus.focus) {
        nextTick(() => {
          firstFocus.focus();
        });
      } else {
        focusFirstDescendant(el);
      }
    };

    const lastFocus = ref(); //used by tessts;
    const trapFocus = () => {
      if (ignoreUtilFocusChanges.value) {
        return;
      }

      //FF will focus body first before selecting the next el
      //This setTimeout allows us to wait until that has occurred
      setTimeout(() => {
        //if the item of focus is within the trap
        var target = document.activeElement;
        if (content.value.contains(target)) {
          lastFocus.value = target;
          return;
        } else {
          //if the item is not within the trap
          let position = comparePositionInDOM(
            content.value,
            target as HTMLElement
          );
          switch (position) {
            case "before":
              focusLastDescendant(content.value);
              break;
            case "after":
              focusFirstDescendant(content.value);
              break;
            case "parent":
              attemptToFocusFirst(content.value);
              break;
          }
          lastFocus.value = document.activeElement;
        }
      }, 0);
    };
    return {
      trapFocus,
      content,
      ignoreUtilFocusChanges,
      attemptToFocusFirst,
      focusLastDescendant,
      focusFirstDescendant,
      isFocusable,
      lastFocus,
    };
  },
  computed: {
    ready() {
      return this.rendered && this.enable;
    },
  },
  watch: {
    ready: {
      immediate: true,
      handler: "enableTrap",
    },
  },

  methods: {
    enableTrap(nv: boolean) {
      if (nv) {
        this.addFocusTrapEvents();
      } else {
        this.removeFocusTrapEvents();
      }
    },

    addFocusTrapEvents() {
      document.addEventListener("blur", this.trapFocus, true);
      if (this.content) {
        this.attemptToFocusFirst(this.content);
      } else {
        this.$nextTick(() => {
          if (this.content) {
            this.attemptToFocusFirst(this.content);
          }
        });
      }
    },

    removeFocusTrapEvents() {
      if (typeof document !== "undefined")
        document.removeEventListener("blur", this.trapFocus, true);
    },
  },
  mounted() {
    this.rendered = true;
  },
  beforeUnmount() {
    this.removeFocusTrapEvents();
  },
});
</script>
