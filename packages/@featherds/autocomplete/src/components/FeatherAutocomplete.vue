<template>
  <div v-bind="inherittedAttrs" class="feather-autocomplete-container">
    <FeatherMenu
      no-expand
      :open="showMenu"
      @outside-click="handleOutsideClick"
      @trigger-click="handleTriggerClick"
      @close="handleClose"
      class="feather-autocomplete-menu-container"
      :class="{ grid: gridConfig }"
      ref="menu"
    >
      <template v-slot:trigger>
        <InputWrapper
          v-bind="comboxBoxAttrs"
          :for="inputId"
          :raised="raised"
          :focused="hasFocus"
          :clear-text="clearLabel"
          :showClear="singleSelect && hasValue"
          @clear="handleClear"
          menu-trigger
          ref="scroll"
        >
          <template v-slot:pre>
            <slot name="pre">
              <FeatherIcon :icon="searchIcon" />
            </slot>
          </template>
          <div
            class="feather-autocomplete-content"
            :class="{ disabled: disabled }"
          >
            <div
              class="alert"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              ref="alert"
            ></div>
            <div
              class="description"
              :id="selectedDescriptionId"
              data-ref-id="feather-autocomplete-input-selected"
            >
              {{ selectedDescribedByText }}
            </div>
            <Chip
              v-show="!singleSelect"
              v-for="(item, index) in modelValueList"
              :key="(item[textProp] as string)"
              role="button"
              :id="index === activeChipIndex ? activeChipId : null"
              :focused="index === activeChipIndex"
              :disabled="disabled"
              :text="(item[textProp] as string)"
              :remove-label="removeLabel"
              :pre="getPre(item)"
              @delete="removeFromValue(item)"
            />
            <textarea
              v-bind="inputAttrs"
              class="feather-autocomplete-input"
              data-ref-id="feather-input"
              :class="{ error: error }"
              v-on="inputListeners"
              ref="input"
            />
          </div>

          <template v-slot:post>
            <FeatherIcon
              :icon="dropdownIcon"
              class="feather-autocomplete-dropdown-icon"
              :class="{ rotate: showMenu }"
              @click="handleDropdownIconClick"
            />
          </template>
        </InputWrapper>
      </template>
      <AutocompleteResults
        v-if="!gridConfig"
        v-show="showResults"
        :items="internalResults"
        :value="modelValue"
        :text-prop="textProp"
        :activeId="resultItemId"
        :activeIndex="active.row"
        :aria-label="label"
        @select="clickedItem"
        class="autocomplete-results"
        :id="resultsId"
        :single="singleSelect"
        :new-label="newLabel"
        :highlight="highlight"
        :query="query"
        ref="results"
      />
      <AutocompleteResultsGrid
        v-if="gridConfig"
        v-show="showResults"
        :items="internalResults"
        :value="modelValue"
        :text-prop="textProp"
        :config="gridConfig"
        :activeId="resultItemId"
        :activeRow="active.row"
        :activeCol="(active.col as number)"
        :aria-label="label"
        @select="clickedItem"
        class="autocomplete-results"
        :id="resultsId"
        :single="singleSelect"
        :highlight="highlight"
        :query="query"
      />
      <MenuMessage v-if="showNoResults"
        ><span data-ref-id="feather-autocomplete-no-results">{{
          noResultsLabel
        }}</span></MenuMessage
      >
      <MenuMessage v-if="showSelectionLimit" class="selection-limit-warning"
        ><FeatherIcon :icon="minCharIcon" /><span
          data-ref-id="feather-autocomplete-selection-limit"
          >{{ selectionLimitLabel }}</span
        ></MenuMessage
      >
      <MenuMessage
        v-if="showMinCharWarning"
        class="min-char-warning"
        :id="minCharWarningId"
      >
        <FeatherIcon :icon="minCharIcon" />
        <span data-ref-id="feather-autocomplete-min-char">
          <slot name="min-char">{{ computedMinCharText }}</slot>
        </span>
      </MenuMessage>
      <Spinner v-if="showLoading" />
    </FeatherMenu>
    <InputSubText :id="subTextId"></InputSubText>
  </div>
</template>
<script lang="ts">
import {
  InputWrapper,
  useInputWrapper,
  InputSubText,
  useInputSubText,
  useInputInheritAttrs,
} from "@featherds/input-helper";
import { FeatherIcon } from "@featherds/icon";
import { FeatherMenu } from "@featherds/menu";
import Search from "@featherds/icon/action/Search";
import Info from "@featherds/icon/action/Info";
import KeyboardArrowDown from "@featherds/icon/navigation/ExpandMore";
import AutocompleteResults from "./Results/AutocompleteResults.vue";
import AutocompleteResultsGrid from "./Results/AutocompleteResultsGrid.vue";
import MenuMessage from "./MenuMessage.vue";
import Chip from "./Chip.vue";
import Spinner from "./Spinner.vue";
import { useStrategy } from "./Strategies";
import { getSafeId } from "@featherds/utils/id";
import { KEYCODES } from "@featherds/utils/keys";
import { toView } from "@featherds/utils/scroll";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import { useResultList } from "./Results/ResultList";
import { useResultGrid } from "./Results/ResultGrid";
import { useValidation } from "@featherds/input-helper";

import {
  ref,
  computed,
  toRef,
  toRefs,
  markRaw,
  defineComponent,
  ComponentPublicInstance,
  Ref,
} from "vue";
import {
  IAutocompleteItemType,
  AutocompleteTypes,
  IAutocompleteResultRender,
  IAutocompleteChipIcon,
  props,
  emits,
  LABELS,
} from "./types";

export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits,
  props,
  data() {
    return {
      typingTimeout: -1,
      activeChipIndex: -1,
    };
  },
  computed: {
    singleSelect() {
      return this.type !== AutocompleteTypes.multi;
    },
    raised() {
      return this.hasValue || this.hasFocus;
    },
    hasValue() {
      return this.strategy?.hasValue();
    },

    showMenu() {
      return (
        (this.showResults ||
          this.showNoResults ||
          this.showLoading ||
          this.showSelectionLimit ||
          this.showMinCharWarning) &&
        !this.disabled
      );
    },
    showResults() {
      if (
        this.forceCloseResults ||
        this.selectionLimitReached ||
        this.showMinCharWarning
      ) {
        return false;
      }
      return !!(
        this.hasFocus &&
        this.internalResults &&
        this.internalResults.length &&
        !this.loading
      );
    },

    showNoResults() {
      return (
        !this.forceCloseResults &&
        this.hasFocus &&
        !this.selectionLimitReached &&
        this.internalResults &&
        this.internalResults.length === 0 &&
        this.query &&
        this.query.length > 0 &&
        this.query.length >= this.minChar &&
        !this.loading
      );
    },

    showSelectionLimit() {
      return (
        !this.forceCloseResults &&
        this.hasFocus &&
        this.selectionLimitReached &&
        !this.loading
      );
    },
    showLoading() {
      return this.hasFocus && this.loading;
    },
    showMinCharWarning() {
      return (
        this.minChar > 0 &&
        !this.selectionLimitReached &&
        !this.loading &&
        this.hasFocus &&
        this.query.length < this.minChar
      );
    },

    resultItemId() {
      return getSafeId("result-item");
    },
    activeChipId() {
      return getSafeId("active-chip");
    },
    minCharWarningId() {
      return getSafeId("min-char-warning");
    },
    subTextId() {
      return getSafeId("feather-autocomplete-description");
    },
    resultsId() {
      return getSafeId("feather-autocomplete-input-results");
    },
    selectedDescriptionId() {
      return getSafeId("feather-autocomplete-input-selected");
    },
    searchIcon() {
      return markRaw(Search);
    },
    minCharIcon() {
      return markRaw(Info);
    },
    dropdownIcon() {
      return markRaw(KeyboardArrowDown);
    },
    inputAttrs() {
      const describedby = [this.selectedDescriptionId, this.subTextId].filter(
        Boolean
      );

      let activeDescendant = "";
      if (this.activeChipIndex > -1) {
        activeDescendant = this.activeChipId;
      }
      if (this.active.row > -1 && this.showResults) {
        activeDescendant = this.resultItemId;
      }
      if (this.showMinCharWarning) {
        describedby.push(this.minCharWarningId);
      }

      return {
        id: this.inputId,
        "aria-describedby": describedby.join(" "),
        "aria-busy": this.loading,
        "aria-activedescendant": activeDescendant,
        disabled: this.disabled,
        "aria-disabled": this.disabled,
        "aria-autocomplete": "list" as
          | "inline"
          | "both"
          | "none"
          | "list"
          | undefined,
        autocomplete: "off",
        readonly: this.disabled ? true : false,
        tabindex: this.disabled ? -1 : 0,
        "aria-controls": this.showResults ? this.resultsId : "",
        "aria-invalid": this.$attrs["aria-invalid"] === "true" || !!this.error,
      };
    },
    inputListeners() {
      return {
        input: this.handleTextInput,
        blur: this.handleInputBlur,
        focus: this.handleInputFocus,
        keydown: this.handleInputKeyDown,
      };
    },
    comboxBoxAttrs() {
      return {
        role: "combobox",
        "aria-expanded": this.showResults ? "true" : "false",
        "aria-haspopup": this.gridConfig ? "grid" : "listbox",
        "aria-owns": this.resultsId,
        "aria-label": this.label,
      };
    },

    scrollContainer() {
      const scroll = this.$refs.scroll as ComponentPublicInstance;
      return scroll.$el.querySelector(".feather-input-wrapper");
    },
    computedMinCharText() {
      if (this.minCharLabel) {
        return this.minCharLabel.replace("${min}", this.minChar.toString());
      }
      return "";
    },
    selectedDescribedByText() {
      if (this.modelValue && this.modelValue.length) {
        const modelValue = this.modelValue as IAutocompleteItemType[];
        return modelValue.map((x) => x[this.textProp]).join(", ");
      }
      return "";
    },
    allowNewEnabled() {
      return this.singleSelect && this.allowNew;
    },
    modelValueList() {
      if (this.singleSelect) {
        return [] as IAutocompleteItemType[];
      }
      return this.modelValue as IAutocompleteItemType[];
    },
  },
  watch: {
    activeChipIndex(v) {
      if (v > -1 && this.scrollContainer) {
        this.$nextTick(() => {
          toView(
            this.$el.querySelector(`#${this.activeChipId}`),
            this.scrollContainer
          );
        });
      }
    },
    query(v) {
      if (!this.inputRef) {
        return;
      }
      if (v === this.inputRef.value) {
        return;
      }
      this.inputRef.value = v;
    },
    modelValue: {
      handler(v, o) {
        //when a value is added make sure to scroll input into view
        if (v && o && v.length > o.length && this.scrollContainer) {
          this.$nextTick(() => {
            toView(this.inputRef, this.scrollContainer);
          });
        }
        this.strategy.handleModelValueChange(v);

        //adjust if value is updated but not focused
        if (!this.hasFocus) {
          this.adjustTextArea();
        }
      },
      immediate: true,
    },
    results(v) {
      if (!this.singleSelect && !this.gridConfig && v && v.length > 0) {
        this.selectFirst();
      }
      this.forceCloseResults = false; // should no longer force close
      if (
        v &&
        v.length === 0 &&
        this.query &&
        this.query.length > 0 &&
        !this.allowNewEnabled
      ) {
        this.setAlert(this.noResultsLabel);
      }
      if (this.allowNewEnabled && this.query.length) {
        const found = v.some((item: IAutocompleteItemType) => {
          return this.newMatcher(item, this.query, this);
        });
        if (!found) {
          v = [
            {
              [this.textProp]: this.query,
              _new: this.query,
            },
            ...v,
          ];
        }
      }

      this.internalResults = v;
    },
    showResults(v) {
      const menu = this.$refs.menu as { calculatePosition: () => void };
      if (v && menu.calculatePosition) {
        menu.calculatePosition();
      }
    },
    selectionLimitReached(v) {
      if (v) {
        this.setAlert(this.selectionLimitLabel);
      }
    },
  },
  methods: {
    getPre(item: IAutocompleteItemType) {
      return item._pre as IAutocompleteChipIcon;
    },
    setAlert(txt: string) {
      const alert = this.$refs.alert as HTMLElement;
      alert.textContent = txt;
      setTimeout(() => {
        alert.textContent = "";
      }, 100);
    },

    handleClear() {
      this.query = "";
      this.inputRef.focus();
      this.emitSearch();
      this.$emit("update:modelValue", undefined);
    },
    handleInputFocus() {
      if (this.disabled) {
        return;
      }
      this.adjustTextArea();
      if (this.hasFocus) {
        return;
      }

      this.hasFocus = true;
      if (this.modelValue && this.singleSelect) {
        this.inputRef.select();
      }
      this.emitSearch();
    },

    handleTextInput(e: KeyboardEvent) {
      this.adjustTextArea();
      const target = e.target as HTMLInputElement;
      const str = target.value;
      if (str === undefined) {
        return;
      }
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(() => {
        this.query = str;
        this.emitSearch();
      }, 250);
    },
    handleInputKeyDown(e: KeyboardEvent) {
      const resetChipIndex = () => {
        this.activeChipIndex = -1;
      };
      const resetMenuIndex = () => {
        this.resetResultIndex();
      };
      //stop enter form taking a new line
      if (e.keyCode === KEYCODES.ENTER) {
        e.preventDefault();
      }

      //menu navigation
      if (this.internalResults && this.internalResults.length) {
        const handled = this.handleResultNavigation(e, this.internalResults);
        if (handled) {
          resetChipIndex();
          this.forceCloseResults = false;
          return;
        }
      }

      if (e.keyCode === KEYCODES.ENTER && this.activeChipIndex > -1) {
        e.preventDefault();
        const modelValue = this.modelValue as IAutocompleteItemType[];
        this.removeFromValue(modelValue[this.activeChipIndex]);
        resetChipIndex();
        return;
      }
      if (e.keyCode === KEYCODES.ENTER && this.active.row > -1) {
        e.preventDefault();
        this.selectItem(this.internalResults[this.active.row]);
        return;
      }

      if (e.keyCode === KEYCODES.ESCAPE) {
        this.forceCloseResults = true;
        resetMenuIndex();
        resetChipIndex();
        return;
      }
      //chip navigation
      if (!this.query && this.modelValue && this.modelValue.length) {
        const modelValue = this.modelValue as IAutocompleteItemType[];
        if (e.keyCode === KEYCODES.LEFT) {
          //left
          //if nothing selected select first (aka last element in array);
          e.preventDefault();
          if (this.activeChipIndex === -1) {
            resetMenuIndex();
            this.activeChipIndex = modelValue.length - 1;
          } else if (this.activeChipIndex - 1 >= 0) {
            resetMenuIndex();
            this.activeChipIndex = this.activeChipIndex - 1;
          }
        }
        if (e.keyCode === KEYCODES.RIGHT) {
          //right
          //if in rightmost chip remove activity from chip list
          e.preventDefault();

          if (this.activeChipIndex === modelValue.length - 1) {
            resetMenuIndex();
            this.activeChipIndex = -1;
          } else if (
            this.activeChipIndex < modelValue.length - 1 &&
            this.activeChipIndex > -1
          ) {
            resetMenuIndex();
            this.activeChipIndex = this.activeChipIndex + 1;
          }
        }
        if (
          (e.keyCode === KEYCODES.DELETE || e.keyCode === KEYCODES.BACKSPACE) &&
          this.activeChipIndex !== -1
        ) {
          this.removeFromValue(modelValue[this.activeChipIndex]);
          resetMenuIndex();
          resetChipIndex();
        }
      }
    },
    handleTriggerClick() {
      if (this.disabled) {
        return;
      }
      this.inputRef.focus();
    },
    handleInputBlur() {
      this.validate();
      this.strategy.handleInputBlur();
      if (this.forceCloseResults || !this.showMenu) {
        this.handleOutsideClick();
      }
    },
    handleClose() {
      this.forceCloseResults = true;
      this.resetResultIndex();
      this.activeChipIndex = -1;
    },
    handleOutsideClick() {
      this.hasFocus = false;
      this.forceCloseResults = false;
      this.activeChipIndex = -1;
      this.resetResultIndex();
      this.query = this.strategy.getInitialText();
      this.internalResults = [];
      this.adjustTextArea();
    },
    clickedItem(item: IAutocompleteItemType) {
      this.selectItem(item);
      //clear everything and re focus
      this.internalResults = [];
      this.inputRef.focus();
      this.strategy.clickedItem();
    },
    selectItem(item: IAutocompleteItemType) {
      this.strategy.selectItem(item);
      this.adjustTextArea();
    },
    removeFromValue(item: IAutocompleteItemType) {
      this.strategy.removeItem(item);
    },
    handleDropdownIconClick() {
      if (this.showMenu) {
        this.forceCloseResults = true;
        return;
      }
      if (this.forceCloseResults) {
        this.emitSearch();
      }
    },
    adjustTextArea() {
      //auto adjust height
      const tx = this.inputRef;
      //if this is called before mount
      if (!tx) {
        return;
      }
      tx.style.height = "1.625rem";
      tx.style.flexBasis = "40px";
      tx.style.whiteSpace = "nowrap";

      this.$nextTick(() => {
        const txWidth = tx.getBoundingClientRect().width;
        const parent = tx.parentElement;
        if (
          tx.scrollWidth <= tx.clientWidth &&
          parent &&
          txWidth < parent.getBoundingClientRect().width
        ) {
          tx.style.whiteSpace = "nowrap";
        } else {
          tx.style.whiteSpace = "normal";
          tx.style.flexBasis = "100%";
        }
        this.$nextTick(() => {
          tx.style.height = `${tx.scrollHeight}px`;
        });
      });
    },
  },
  setup(props, context) {
    const labels = useLabelProperty<typeof LABELS>(
      toRef(props, "labels"),
      LABELS
    );
    useInputSubText(props);
    useInputWrapper(props);
    let resultsRender: IAutocompleteResultRender;
    if (props.gridConfig) {
      resultsRender = useResultGrid(props.gridConfig);
    } else {
      resultsRender = useResultList();
    }

    const incomingId = toRef(props, "id");
    const inputId = computed(() => {
      if (incomingId.value) {
        return incomingId.value;
      }
      return getSafeId("feather-autocomplete-input");
    });

    const { validate } = useValidation(
      inputId,
      toRef(props, "modelValue"),
      props.label as string,
      props.schema as Record<string, any>
    );

    const { selectionLimit, modelValue, textProp, allowNew, type, minChar } =
      toRefs(props);
    const hasFocus = ref(false);
    const selectionLimitReached = ref(false);
    const forceCloseResults = ref(false);
    const query = ref("");
    const internalResults = ref([] as IAutocompleteItemType[]);
    const input = ref();
    const inputRef = computed(() => {
      return input.value as HTMLInputElement;
    });
    const emitSearch = () => {
      if (hasFocus.value && !selectionLimitReached.value) {
        if (query.value && query.value.length >= minChar.value) {
          context.emit("search", query.value);
        }
        if (minChar.value <= 0) {
          context.emit("search", query.value || "");
        }
        internalResults.value = [];
        resultsRender.reset();
      }
    };

    const strategy = useStrategy(
      {
        selectionLimit: selectionLimit as Ref<number>,
        selectionLimitReached,
        modelValue: modelValue as Ref<
          IAutocompleteItemType | IAutocompleteItemType[]
        >,
        textProp: textProp as Ref<string>,
        allowNew,
        forceCloseResults,
        query,
        internalResults,
        input: inputRef,
        emitSearch,
      },
      resultsRender,
      type.value as AutocompleteTypes,
      context.emit
    );

    return {
      ...labels,
      ...useInputInheritAttrs(context.attrs as Record<string, unknown>),
      query,
      internalResults,
      selectionLimitReached,
      forceCloseResults,
      hasFocus,
      strategy,
      emitSearch,
      active: resultsRender.active,
      handleResultNavigation: resultsRender.handleKeyPress,
      resetResultIndex: resultsRender.reset,
      selectFirst: resultsRender.first,
      inputId,
      input,
      incomingId,
      inputRef,
      validate,
    };
  },
  mounted() {
    this.adjustTextArea();
  },
  components: {
    InputWrapper,
    InputSubText,
    AutocompleteResults,
    AutocompleteResultsGrid,
    Chip,
    MenuMessage,
    FeatherIcon,
    FeatherMenu,
    Spinner,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";

.alert,
.description {
  @include screen-reader();
}

.feather-autocomplete-container {
  :deep(.post) {
    min-width: 5rem;
    justify-content: flex-end;
  }
  :deep(.prefix),
  :deep(.post) {
    align-self: flex-start;
    margin-top: 0.625rem;
  }
}

.min-char-warning,
.selection-limit-warning {
  :deep(.feather-icon) {
    color: var($primary);
    font-size: 1.25rem;
    margin-right: 0.75rem;
  }
}
.chip-list {
  vertical-align: middle;
}
.feather-autocomplete-input {
  border: none;
  margin: 0.1875rem 0;
  display: inline-block;
  vertical-align: middle;
  height: 1.625rem;
  resize: none;
  background-color: transparent;
  flex: 1 1 2.5rem;
  width: 0;
  @include body-small();
  line-height: 1.5em; //IE has an issue with the mixin lineheight when typing
  color: var($primary-text-on-surface);
  caret-color: var($primary);
  overflow: auto;
  &::-ms-clear {
    display: none;
  }
  &:focus {
    outline: 0;
  }
  &.error {
    caret-color: var($error);
  }
  [disabled] {
    color: var($disabled-text-on-surface);
  }
}

.disabled {
  .feather-autocomplete-dropdown-icon,
  .feather-autocomplete-input {
    color: var($disabled-text-on-surface);
    cursor: default;
  }
}
.feather-autocomplete-dropdown-icon {
  color: var($secondary-text-on-surface);
  transition: transform 280ms ease-in-out;
  transform-origin: center center;
  font-size: 1.25rem;
  cursor: pointer;
  &.rotate {
    transform: rotate(180deg);
  }
}

.feather-autocomplete-menu-container {
  width: 100%;
  position: relative;
  :deep(.feather-menu-dropdown) {
    width: 100%;
  }
  &.grid :deep(.feather-menu-dropdown) {
    width: auto;
    min-width: 100%;
  }
}
.feather-autocomplete-content {
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-width: 0;
  margin-top: 0.25rem;
  margin-bottom: 0.125rem;
}
</style>
