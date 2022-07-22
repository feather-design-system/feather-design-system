<template>
  <FeatherMenu
    ref="menu"
    class="feather-dropdown-menu-container"
    data-ref-id="feather-dropdown-menu-container"
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
<script lang="ts">
import { ref, watch, nextTick, defineComponent } from "vue";
import { FeatherMenu } from "@featherds/menu";
import { Code } from "@featherds/utils/keys";
import { useDropdownService } from "../composables/DropdownService";
export const props = {
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
} as const;
export const emits = {
  "update:modelValue": (_v: boolean) => true,
};
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits,
  props,
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
          const menuComponent = menu.value as unknown as { menu: HTMLElement };
          const items = Array.from(menuComponent.menu.querySelectorAll("a"));
          dropdownService.setItems(items);
          dropdownService.selectFirst();
        });
      } else {
        dropdownService.blur();
      }
      context.emit("update:modelValue", open);
    });
    const handleClose = () => {
      localOpen.value = false;
      const menuComponent = menu.value as unknown as { trigger: HTMLElement };
      if (menuComponent.trigger && menuComponent.trigger.focus) {
        menuComponent.trigger.focus();
      }
    };
    const handleTriggerClick = () => {
      localOpen.value = !localOpen.value;
    };
    const handleOutsideClick = () => {
      localOpen.value = false;
    };
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.code) {
        //next
        case Code.DOWN:
        case Code.RIGHT:
          dropdownService.selectNext();
          e.preventDefault();
          break;
        //previous
        case Code.UP:
        case Code.LEFT:
          dropdownService.selectPrevious();
          e.preventDefault();
          break;
        case Code.ESCAPE: //ESC
          handleClose();
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
});
</script>

<style lang="scss" scoped>
.feather-dropdown-menu-container {
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
