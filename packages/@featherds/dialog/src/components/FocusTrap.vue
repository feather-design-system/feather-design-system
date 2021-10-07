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
    };
  },
  watch: {
    enable: {
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
      document.addEventListener("focus", this.trapFocus, true);
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
        firstFocus.focus();
      } else {
        this.focusFirstDescendant(el);
      }
    },
    removeFocusTrapEvents() {
      document.removeEventListener("focus", this.trapFocus, true);
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
    trapFocus(event) {
      if (this.ignoreUtilFocusChanges) {
        return;
      }
      if (this.$refs.content.contains(event.target)) {
        this.lastFocus = event.target;
      } else {
        this.focusFirstDescendant(this.$refs.content);
        if (this.lastFocus === document.activeElement) {
          this.focusLastDescendant(this.$refs.content);
        }
        this.lastFocus = document.activeElement;
      }
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
          return true;
        default:
          return false;
      }
    },
  },
  beforeUnmount() {
    this.removeFocusTrapEvents();
  },
};
</script>
