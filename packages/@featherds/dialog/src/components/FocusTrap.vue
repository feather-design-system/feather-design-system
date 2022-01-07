<template>
  <div>
    <div tabindex="0"></div>
    <div class="focus-trap-content" ref="content">
      <slot />
    </div>
    <div tabindex="0"></div>
  </div>
</template>
<script>
export default {
  props: {
    enable: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      lastFocus: undefined,
      ignoreUtilFocusChanges: false,
      rendered: false,
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
    enableTrap(nv) {
      if (nv) {
        this.addFocusTrapEvents();
      } else {
        this.removeFocusTrapEvents();
      }
    },

    addFocusTrapEvents() {
      document.addEventListener("blur", this.trapFocus, true);
      if (this.$refs.content) {
        this.attemptToFocusFirst(this.$refs.content);
      } else {
        this.$nextTick(() => {
          if (this.$refs.content) {
            this.attemptToFocusFirst(this.$refs.content);
          }
        });
      }
    },
    attemptToFocusFirst(el) {
      const firstFocus = el.querySelector("[first-focus]");
      if (firstFocus && firstFocus.focus) {
        this.$nextTick(() => {
          firstFocus.focus();
        });
      } else {
        this.focusFirstDescendant(el);
      }
    },
    removeFocusTrapEvents() {
      if (typeof document !== "undefined")
        document.removeEventListener("blur", this.trapFocus, true);
    },
    focusFirstDescendant(element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];
        if (this.attemptFocus(child) || this.focusFirstDescendant(child)) {
          return true;
        }
      }
      return false;
    },
    focusLastDescendant(element) {
      for (var i = element.childNodes.length - 1; i >= 0; i--) {
        var child = element.childNodes[i];
        if (this.attemptFocus(child) || this.focusLastDescendant(child)) {
          return true;
        }
      }
      return false;
    },
    attemptFocus(element) {
      if (!this.isFocusable(element)) {
        return false;
      }

      this.ignoreUtilFocusChanges = true;
      if (element.focus) {
        element.focus();
      }
      this.ignoreUtilFocusChanges = false;
      return document.activeElement === element;
    },
    trapFocus() {
      if (this.ignoreUtilFocusChanges) {
        return;
      }

      //FF will focus body first before selecting the next el
      //This setTimeout allows us to wait until that has occurred
      setTimeout(() => {
        //if the item of focus is within the trap
        var target = document.activeElement;
        if (this.$refs.content.contains(target)) {
          this.lastFocus = target;
        } else {
          //if the item is not within the trap
          let position = this.comparePositionInDOM(this.$refs.content, target);
          switch (position) {
            case "before":
              this.focusLastDescendant(this.$refs.content);
              break;
            case "after":
              this.focusFirstDescendant(this.$refs.content);
              break;
            case "parent":
              this.attemptToFocusFirst(this.$refs.content);
              break;
          }

          this.lastFocus = document.activeElement;
        }
      }, 0);
    },
    comparePositionInDOM(a, b) {
      //See https://johnresig.com/blog/comparing-document-position/
      let result = a.compareDocumentPosition
        ? a.compareDocumentPosition(b)
        : a.contains
        ? (a != b && a.contains(b) && 16) +
          (a != b && b.contains(a) && 8) +
          (a.sourceIndex >= 0 && b.sourceIndex >= 0
            ? (a.sourceIndex < b.sourceIndex && 4) +
              (a.sourceIndex > b.sourceIndex && 2)
            : 1) +
          0
        : 0;
      if (result === 0x02) return "before";
      if (result === 0x04) return "after";
      //The bitmask returned is additive, so if b is a child it is one of the above
      //plus 'document_position_contains' which is '8', so in this case a parent can
      //be 8 + before/after which means 10 or potentially 12.
      //see https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition#return_value
      if (result === 0x0a || result === 0x0c) return "parent";
    },
    isFocusable(element) {
      if (
        element.tabIndex > 0 ||
        (element.tabIndex === 0 && element.getAttribute("tabIndex") !== null)
      ) {
        return true;
      }

      if (element.disabled || element.tabIndex === -1) {
        return false;
      }

      switch (element.nodeName) {
        case "A":
          return !!element.href && element.rel !== "ignore";
        case "INPUT":
          return element.type !== "hidden" && element.type !== "file";
        case "BUTTON":
        case "SELECT":
        case "TEXTAREA":
        case "IFRAME":
          return true;
        default:
          return false;
      }
    },
  },
  mounted() {
    this.rendered = true;
  },
  beforeUnmount() {
    this.removeFocusTrapEvents();
  },
};
</script>
