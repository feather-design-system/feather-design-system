<template>
  <FeatherMenu
    ref="menu"
    class="feather-dropdown-container"
    :cover="cover"
    :open="localOpen"
    :right="right"
    @trigger-click="handleTriggerClick"
    @outside-click="handleOutsideClick"
    @close="handleClose"
  >
    <template v-slot:trigger>
      <slot name="trigger"></slot>
    </template>
    <template v-slot:default="slotProps">
      <ul
        @keydown="handleKeydown"
        :aria-labelledby="slotProps.labelId"
        class="feather-dropdown"
        :class="{ standard: standard }"
      >
        <slot></slot>
      </ul>
    </template>
  </FeatherMenu>
</template>
<script>
import { ref, watch, nextTick } from "vue";
import { FeatherMenu } from "@featherds/menu";
import { KEYCODES } from "@featherds/utils/keys";
import { useDropdownService } from "../composables/DropdownService";

export default {
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    cover: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    standard: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const menu = ref(null);
    const localOpen = ref(props.modelValue);
    const dropdownService = useDropdownService();

    watch(
      () => props.modelValue,
      (v) => (localOpen.value = v)
    );
    watch(localOpen, (open) => {
      if (open) {
        nextTick(() => {
          const items = Array.from(menu.value.menu.querySelectorAll("a"));
          dropdownService.setItems(items);
          //Waiting for menu - nextTick was not enough
          setTimeout(() => {
            dropdownService.selectFirst();
          }, 0);
        });
      } else {
        dropdownService.blur();
      }
      context.emit("update:modelValue", open);
    });
    const handleClose = () => {
      localOpen.value = false;
      if (menu.value.trigger && menu.value.trigger.focus) {
        menu.value.trigger.focus();
      }
    };
    const handleTriggerClick = () => {
      localOpen.value = !localOpen.value;
    };
    const handleOutsideClick = () => {
      localOpen.value = false;
    };
    const handleKeydown = (e) => {
      switch (e.keyCode) {
        //next
        case KEYCODES.DOWN:
        case KEYCODES.RIGHT:
          dropdownService.selectNext();
          e.preventDefault();
          break;
        //previous
        case KEYCODES.UP:
        case KEYCODES.LEFT:
          dropdownService.selectPrevious();
          e.preventDefault();
          break;
        case KEYCODES.ESCAPE: //ESC
          localOpen.value = false;
          if (menu.value.trigger && menu.value.trigger.focus) {
            menu.value.trigger.focus();
          }
          break;
        default:
          break;
      }
    };

    return {
      menu,
      dropdownService,
      localOpen,
      handleClose,
      handleTriggerClick,
      handleOutsideClick,
      handleKeydown,
    };
  },
  components: {
    FeatherMenu,
  },
};
</script>

<style lang="scss" scoped>
.feather-dropdown-container {
  :deep([menu-trigger]) {
    margin-top: 0;
    margin-bottom: 0;
  }
}
.feather-dropdown {
  margin: 0;
  padding: 0;
}
.feather-dropdown.standard {
  width: 20rem;
}
.feather-dropdown {
  min-width: 7rem;
  overflow-y: auto;
  padding: 0.5rem 0;
  margin: 0;
}
</style>

<style lang="scss">
@import "../../scss/mixins";
.feather-dropdown {
  @include dropdown-menu-height(6);
}
</style>
