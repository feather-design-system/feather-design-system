<template>
  <div v-bind="inherittedAttrs" class="feather-select-container">
    <FeatherMenu
      no-expand
      :open="showMenu"
      @outside-click="handleOutsideClick"
      @trigger-click="handleTriggerClick"
      @close="closeMenu"
      class="feather-select-menu-container"
      data-ref-id="feather-select-menu-container"
    >
      <template v-slot:trigger>
        <InputWrapper
          :for="inputId"
          :raised="raised"
          :focused="hasFocus"
          :show-clear="showClear"
          @clear="handleClear"
          menu-trigger
          class="feather-select-wrapper"
          :class="{ focused: hasFocus }"
        >
          <template v-slot:pre>
            <slot name="pre" />
          </template>
          <input
            v-bind="inputAttrs"
            class="feather-select-input"
            data-ref-id="feather-select-input"
            v-on="inputListeners"
            ref="input"
          />
          <template v-slot:post>
            <FeatherIcon
              class="feather-select-icon"
              :class="{ rotate: showMenu }"
              :icon="icon"
            ></FeatherIcon>
          </template>
        </InputWrapper>
      </template>
      <List
        ref="list"
        data-ref-id="feather-select-list"
        :label="label"
        :options="options"
        :text-prop="textProp"
        :active-index="activeIndex"
        @select="handleSelect"
        @keydown="handleKeyDown"
      >
      </List>
    </FeatherMenu>
    <InputSubText :id="subTextId"></InputSubText>
  </div>
</template>
<script lang="ts">
import {
  InputWrapper,
  InputSubText,
  InputWrapperProps,
  InputSubTextProps,
  useInputWrapper,
  useInputSubText,
  useInputInheritAttrs,
} from "@featherds/input-helper";
import { FeatherIcon } from "@featherds/icon";
import KeyboardArrowDown from "@featherds/icon/navigation/ExpandMore";
import { FeatherMenu } from "@featherds/menu";
import { getSafeId } from "@featherds/utils/id";
import { KEYCODES } from "@featherds/utils/keys";
import List from "./List.vue";
import { useValidation } from "@featherds/input-helper";
import { _setTimeout } from "@featherds/utils/setTimeout";
import { computed, defineComponent, PropType, Ref, toRef } from "vue";
import { ISelectItemType } from "./types";
export const props = {
  ...InputWrapperProps,
  ...InputSubTextProps,
  modelValue: {
    type: Object as PropType<ISelectItemType>,
    required: false,
  },
  textProp: {
    type: String,
    default: "_text",
  },
  options: {
    type: Array as PropType<ISelectItemType[]>,
    default: () => {
      return [] as ISelectItemType[];
    },
  },
  schema: {
    type: Object,
    required: false,
  },
} as const;
export const emits = {
  "update:modelValue": (v: ISelectItemType | undefined) => true,
};
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits,
  props,
  setup(props, context) {
    useInputSubText(props);
    useInputWrapper(props);
    const inputId = computed(() => {
      return getSafeId("feather-select-input");
    });

    const { validate } = useValidation(
      inputId,
      toRef(props, "modelValue"),
      props.label,
      props.schema as Record<string, unknown>,
      toRef(props, "error") as Ref<string>
    );

    return {
      inputId,
      validate,
      ...useInputInheritAttrs(context.attrs as Record<string, unknown>),
    };
  },
  data() {
    return {
      hasFocus: false,
      showMenu: false,
      charsSoFar: "",
      internalValue: this.modelValue,
      delayTimeout: 0,
    };
  },
  computed: {
    showClear() {
      return !!this.modelValue;
    },
    subTextId() {
      return getSafeId("feather-select-description");
    },
    inputAttrs() {
      return {
        id: this.inputId,
        "aria-haspopup": "listbox" as
          | "grid"
          | "dialog"
          | "menu"
          | "listbox"
          | "tree"
          | undefined
          | boolean
          | "true"
          | "false",
        "aria-invalid":
          (this.$attrs["aria-invalid"] as boolean) || !!this.error,
        value: this.valueText,
        readonly: true,
        disabled: this.disabled,
        "aria-disabled": this.disabled,
        "aria-describedby": ((this.$attrs["aria-describedby"] as string) || "")
          .split(" ")
          .concat([this.subTextId])
          .filter(Boolean)
          .join(" "),
      };
    },
    inputListeners() {
      return {
        focus: this.handleInputFocus,
        blur: this.handleInputBlur,
        keydown: this.handleKeyDown,
      };
    },
    raised() {
      return !!this.internalValue || this.hasFocus;
    },
    valueText() {
      if (this.internalValue && this.internalValue[this.textProp]) {
        return this.internalValue[this.textProp] as string;
      }
      return "";
    },
    activeIndex() {
      if (this.internalValue && this.internalValue[this.textProp]) {
        const iv = this.internalValue as ISelectItemType;
        const found = this.options.filter(
          (x) => x[this.textProp] === iv[this.textProp]
        );
        if (found && found.length) {
          return this.options.indexOf(found[0]);
        }
      }
      return -1;
    },
    icon: () => KeyboardArrowDown,
  },
  watch: {
    showMenu(v) {
      if (v) {
        if (!this.internalValue) {
          this.select(this.options[0]);
        }
        this.$nextTick(() => {
          (this.$refs.input as HTMLInputElement).focus();
        });
      } else {
        this.emitSelection();
      }
    },
    modelValue(v) {
      this.internalValue = v;
    },
  },
  methods: {
    closeMenu() {
      this.showMenu = false;
      this.$nextTick(() => {
        (this.$refs.input as HTMLInputElement).focus();
      });
    },
    handleClear() {
      this.handleSelect(undefined);
      this.emitSelection();
    },
    handleInputFocus() {
      if (this.disabled) {
        return;
      }
      if (!this.hasFocus) {
        this.hasFocus = true;
      }
    },
    handleInputBlur() {
      if (this.hasFocus && !this.showMenu) {
        this.hasFocus = false;
        this.validate();
      }
    },
    handleTriggerClick() {
      if (this.disabled) {
        return;
      }
      this.showMenu = true;
      this.hasFocus = true;
    },
    handleOutsideClick() {
      this.showMenu = false;
      this.hasFocus = false;
    },
    handleSelect(option: ISelectItemType | undefined) {
      this.select(option);
      this.showMenu = false;
      (this.$refs.input as HTMLInputElement).focus();
    },
    select(option: ISelectItemType | undefined) {
      this.internalValue = option;
    },
    emitSelection() {
      this.$emit("update:modelValue", this.internalValue);
    },
    handleKeyDown(e: KeyboardEvent) {
      //enter
      if (e.keyCode === KEYCODES.ENTER) {
        e.preventDefault();
        this.showMenu = !this.showMenu;
        //if hidden focus button
        if (!this.showMenu) {
          this.$nextTick(() => {
            (this.$refs.input as HTMLInputElement).focus();
          });
        }
      }
      //esc
      else if (e.keyCode === KEYCODES.ESCAPE) {
        this.closeMenu();
        e.stopPropagation();
      } else if (e.keyCode === KEYCODES.DOWN) {
        //down
        e.preventDefault();

        if (this.activeIndex + 1 < this.options.length) {
          this.select(this.options[this.activeIndex + 1]);
        }
        this.showMenu = true;
      } else if (e.keyCode === KEYCODES.UP) {
        //up
        e.preventDefault();

        if (this.activeIndex - 1 >= 0) {
          this.select(this.options[this.activeIndex - 1]);
        }
        this.showMenu = true;
      } else if (e.keyCode === KEYCODES.HOME) {
        //home
        e.preventDefault();
        this.select(this.options[0]);
        this.showMenu = true;
      } else if (e.keyCode === KEYCODES.END) {
        //home
        e.preventDefault();
        this.select(this.options[this.options.length - 1]);
        this.showMenu = true;
      } else if (this.showMenu) {
        const char = String.fromCharCode(e.keyCode);
        this.charsSoFar += char;
        this.searchAfterDelay();
      }
    },
    searchAfterDelay() {
      clearTimeout(this.delayTimeout);
      this.delayTimeout = _setTimeout(() => {
        const found = this.options.filter(
          (x) =>
            x[this.textProp] &&
            (x[this.textProp] as string)
              .toLowerCase()
              .indexOf(this.charsSoFar.toLowerCase()) === 0
        );
        if (found && found.length) {
          this.select(found[0]);
        }
        this.charsSoFar = "";
      }, 250);
    },
  },
  components: {
    InputWrapper,
    InputSubText,
    FeatherMenu,
    List,
    FeatherIcon,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";

.feather-select-input {
  border: none;
  padding: 0;
  padding-left: 0.25rem;
  margin: 0;
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  background-color: transparent;
  @include body-small();
  line-height: 1.5em; //IE has an issue with the mixin lineheight when typing
  color: var($secondary-text-on-surface);
  flex: 1;
  pointer-events: none;
  cursor: pointer;
  min-width: 0;
  &:focus,
  &:active {
    border-color: transparent;
    outline: 0;
  }
  &:hover {
    cursor: pointer;
  }
}
.feather-select-icon {
  flex: none;
  font-size: 1.25rem;
  height: 1.25rem;
  width: 1.25rem;
  align-self: center;
  color: var($secondary-text-on-surface);
  transition: transform 280ms ease-in-out;
  transform-origin: center center;
  &.rotate {
    transform: rotate(180deg);
  }
}
.feather-select-menu-container {
  width: 100%;
  position: relative;
  :deep(.feather-menu-dropdown) {
    min-width: 100%;
  }
}
.feather-select-wrapper {
  &.focused .feather-select-input {
    color: var($primary-text-on-surface);
  }
  &.disabled {
    .feather-select-input {
      color: var($disabled-text-on-surface);
    }
    .feather-select-icon {
      color: var($disabled-text-on-surface);
    }
  }
  &:hover {
    cursor: pointer;
    :deep(.feather-input-wrapper) {
      cursor: pointer !important;
    }
  }
  :deep(.feather-input-wrapper) {
    align-items: center;
  }
}
</style>
