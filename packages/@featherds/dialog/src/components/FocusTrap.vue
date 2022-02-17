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
import { ref, nextTick, defineComponent, toRef, computed } from "vue";
import { getElements } from "@featherds/composables/modal/Layers";
export default defineComponent({
  props: {
    enable: {
      type: Boolean,
      required: true,
    },
    layer: {
      type: Object,
    },
  },
  data() {
    return {
      rendered: false,
    };
  },
  setup(props) {
    const content = ref();
    const ignoreUtilFocusChanges = ref(false);
    const layer = toRef(props, "layer");
    const contentAndLayers = computed(() => {
      const result = [];
      if (content.value) {
        result.push(content.value);
      }
      if (layer.value) {
        result.push(...getElements(layer.value).value);
      }
      return result;
    });

    const comparePositionInDOM = (a, b) => {
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
    };

    const focusFirstDescendant = (element) => {
      for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];
        if (attemptFocus(child) || focusFirstDescendant(child)) {
          return true;
        }
      }
      return false;
    };
    const focusLastDescendant = (element) => {
      for (var i = element.childNodes.length - 1; i >= 0; i--) {
        var child = element.childNodes[i];
        if (attemptFocus(child) || focusLastDescendant(child)) {
          return true;
        }
      }
      return false;
    };
    const attemptFocus = (element) => {
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

    const isFocusable = (element) => {
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
    };

    const attemptToFocusFirst = (el) => {
      const firstFocus = el.querySelector("[first-focus]");
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
        if (contentAndLayers.value.some((el) => el.contains(target))) {
          lastFocus.value = target;
          return;
        } else {
          //if the item is not within the trap
          let position = comparePositionInDOM(content.value, target);
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
    enableTrap(nv) {
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
