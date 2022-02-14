<template>
  <div v-bind="inherittedAttrs" class="feather-autocomplete-container">
    <FeatherMenu
      no-expand
      :open="showMenu"
      @outside-click="handleOutsideClick"
      @trigger-click="handleTriggerClick"
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
              :key="item[textProp]"
              role="button"
              :id="index === activeChipIndex ? activeChipId : null"
              :focused="index === activeChipIndex"
              :disabled="disabled"
              :text="item[textProp]"
              :remove-label="removeLabel"
              :pre="item._pre"
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
        :activeCol="active.col"
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
<script>
import {
  InputWrapper,
  InputWrapperMixin,
  InputSubText,
  InputSubTextMixin,
  InputInheritAttrsMixin,
} from "@featherds/input-helper";
import { FeatherIcon } from "@featherds/icon";
import { FeatherMenu } from "@featherds/menu";
import Search from "@featherds/icon/action/Search";
import Info from "@featherds/icon/action/Info";
import KeyboardArrowDown from "@featherds/icon/navigation/ExpandMore";
import AutocompleteResults from "./Results/AutocompleteResults";
import AutocompleteResultsGrid from "./Results/AutocompleteResultsGrid";
import MenuMessage from "./MenuMessage";
import Chip from "./Chip";
import Spinner from "./Spinner";
import { createStrategy, TYPES } from "./Strategies";
import { getSafeId } from "@featherds/utils/id";
import { KEYCODES } from "@featherds/utils/keys";
import { toView } from "@featherds/utils/scroll";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import { useResultList } from "./Results/ResultList";
import { useResultGrid } from "./Results/ResultGrid";
import { useValidation } from "@featherds/input/src/components/useValidation";
import HighlightMixin from "./Highlight/HighlightMixin";
import { ref, computed, toRef, markRaw } from "vue";

const LABELS = {
  noResults: "No results found",
  minChar: "Enter ${min} characters to search",
  clear: "Clear value",
  selectionLimit: "Selection limit reached",
  new: "New",
  remove: "Remove",
};

export default {
  mixins: [
    InputWrapperMixin,
    InputSubTextMixin,
    HighlightMixin,
    InputInheritAttrsMixin,
  ],
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits: ["update:modelValue", "search", "new"],
  props: {
    modelValue: {
      type: [Array, Object],
    },
    results: {
      type: Array,
      default: () => [],
    },
    textProp: {
      type: String,
      default: "_text",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    minChar: {
      type: Number,
      default: 0,
    },
    allowNew: {
      type: Boolean,
      default: false,
    },
    selectionLimit: {
      type: Number,
    },
    newMatcher: {
      type: Function,
      default(item, query, comp) {
        return (
          item[comp.textProp].toString().toLowerCase() === query.toLowerCase()
        );
      },
    },
    type: {
      type: String,
      required: true,
      validator(v) {
        // The value must match either
        return [TYPES.multi, TYPES.single].indexOf(v) !== -1;
      },
    },
    labels: {
      type: Object,
      default() {
        return LABELS;
      },
    },
    gridConfig: {
      type: Array,
    },
    schema: {
      type: Object,
      required: false,
    },
  },
  data() {
    const strategy = createStrategy(this, this.type);
    return {
      typingTimeout: -1,
      query: "",
      strategy,
      hasFocus: false,
      activeChipIndex: -1,
      internalResults: [],
      forceCloseResults: false,
      selectionLimitReached: false,
    };
  },
  computed: {
    singleSelect() {
      return this.type !== TYPES.multi;
    },
    raised() {
      return this.hasValue || this.hasFocus;
    },
    hasValue() {
      return this.strategy.hasValue(this.modelValue);
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
      const describedby = [this.selectedDescriptionId, this.subTextId];

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
        "aria-autocomplete": "list",
        autocomplete: "off",
        readonly: this.disabled ? "readonly" : false,
        tabindex: this.disabled ? -1 : 0,
        "aria-controls": this.resultsId,
        "aria-invalid": this.$attrs["aria-invalid"] || !!this.error,
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
      return this.$refs.scroll.$el.querySelector(".feather-input-wrapper");
    },
    computedMinCharText() {
      if (this.minCharLabel) {
        return this.minCharLabel.replace("${min}", this.minChar);
      }
      return "";
    },
    selectedDescribedByText() {
      if (this.modelValue && this.modelValue.length) {
        return this.modelValue.map((x) => x[this.textProp]).join(", ");
      }
      return "";
    },
    allowNewEnabled() {
      return this.singleSelect && this.allowNew;
    },
    modelValueList() {
      if (this.singleSelect) {
        return [];
      }
      return this.modelValue;
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
      if (!this.$refs.input) {
        return;
      }
      if (v === this.$refs.input.value) {
        return;
      }
      this.$refs.input.value = v;
    },
    modelValue: {
      handler(v, o) {
        //when a value is added make sure to scroll input into view
        if (v && o && v.length > o.length && this.scrollContainer) {
          this.$nextTick(() => {
            toView(this.$refs.input, this.scrollContainer);
          });
        }

        this.strategy.handleModelValueChange(v, o);

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
        const found = v.some((item) => {
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
      if (v && this.$refs.menu.calculatePosition) {
        this.$refs.menu.calculatePosition();
      }
    },
    selectionLimitReached(v) {
      if (v) {
        this.setAlert(this.selectionLimitLabel);
      }
    },
  },
  methods: {
    setAlert(txt) {
      this.$refs.alert.textContent = txt;
      setTimeout(() => {
        this.$refs.alert.textContent = "";
      }, 100);
    },

    emitSearch() {
      if (this.hasFocus && !this.selectionLimitReached) {
        if (this.query && this.query.length >= this.minChar) {
          this.$emit("search", this.query);
        }
        if (this.minChar <= 0) {
          this.$emit("search", this.query || "");
        }
        this.internalResults = [];
        this.resetResultIndex();
      }
    },
    handleClear() {
      this.query = "";
      this.$refs.input.focus();
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
        this.$refs.input.select();
      }
      // this.cursorToEnd(this.type !== TYPES.multi);

      this.emitSearch();
    },

    handleTextInput(e) {
      this.adjustTextArea();

      const str = e.target.value;
      if (str === undefined) {
        return;
      }
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(() => {
        this.query = str;
        this.emitSearch();
      }, 250);
    },
    handleInputKeyDown(e) {
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
        const handled = this.handleResultNavigation(
          e,
          this.internalResults,
          (i) => this.selectItem(i)
        );
        if (handled) {
          resetChipIndex();
          this.forceCloseResults = false;
          return;
        }
      }

      if (e.keyCode === KEYCODES.ENTER && this.activeChipIndex > -1) {
        e.preventDefault();
        this.removeFromValue(this.modelValue[this.activeChipIndex]);
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
        if (e.keyCode === KEYCODES.LEFT) {
          //left
          //if nothing selected select first (aka last element in array);
          e.preventDefault();
          if (this.activeChipIndex === -1) {
            resetMenuIndex();
            this.activeChipIndex = this.modelValue.length - 1;
          } else if (this.activeChipIndex - 1 >= 0) {
            resetMenuIndex();
            this.activeChipIndex = this.activeChipIndex - 1;
          }
        }
        if (e.keyCode === KEYCODES.RIGHT) {
          //right
          //if in rightmost chip remove activity from chip list
          e.preventDefault();

          if (this.activeChipIndex === this.modelValue.length - 1) {
            resetMenuIndex();
            this.activeChipIndex = -1;
          } else if (
            this.activeChipIndex < this.modelValue.length - 1 &&
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
          this.removeFromValue(this.modelValue[this.activeChipIndex]);
          resetMenuIndex();
          resetChipIndex();
        }
      }
    },
    handleTriggerClick() {
      if (this.disabled) {
        return;
      }
      this.$refs.input.focus();
    },
    handleInputBlur() {
      this.validate();
      this.strategy.handleInputBlur();
      if (this.forceCloseResults || !this.showMenu) {
        this.handleOutsideClick();
      }
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
    clickedItem(item) {
      this.selectItem(item);
      //clear everything and re focus
      this.internalResults = [];
      this.$refs.input.focus();
      this.strategy.clickedItem();
    },
    selectItem(item) {
      this.strategy.selectItem(item);
      this.adjustTextArea();
    },
    removeFromValue(item) {
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
      const tx = this.$refs.input;
      //if this is called before mount
      if (!tx) {
        return;
      }
      tx.style.height = "26px";
      tx.style.flexBasis = "40px";
      tx.style.whiteSpace = "nowrap";

      this.$nextTick(() => {
        const txWidth = tx.getBoundingClientRect().width;
        if (
          tx.scrollWidth <= tx.clientWidth &&
          txWidth < tx.parentElement.getBoundingClientRect().width
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
  setup(props) {
    const labels = useLabelProperty(toRef(props, "labels"), LABELS);
    let resultsRender;
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
      props.label,
      props.schema
    );

    return {
      ...labels,
      active: resultsRender.active,
      handleResultNavigation: resultsRender.handleKeyPress,
      resetResultIndex: resultsRender.reset,
      selectFirst: resultsRender.first,
      inputId,
      incomingId,
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
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";
@import "@featherds/input-helper/scss/spacing";
.feather-autocomplete-container {
  @include input-spacing;
}

.alert,
.description {
  @include screen-reader();
}

.feather-autocomplete-container {
  :deep(.post) {
    min-width: 80px;
    justify-content: flex-end;
  }
  :deep(.prefix),
  :deep(.post) {
    align-self: flex-start;
    margin-top: 10px;
  }
}

.min-char-warning,
.selection-limit-warning {
  :deep(.feather-icon) {
    color: var($primary);
    font-size: 20px;
    margin-right: 12px;
  }
}
.chip-list {
  vertical-align: middle;
}
.feather-autocomplete-input {
  border: none;
  margin: 3px 0;
  display: inline-block;
  vertical-align: middle;
  height: 26px;
  resize: none;
  background-color: transparent;
  flex: 1 1 40px;
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
  font-size: 20px;
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
  margin-top: 4px;
  margin-bottom: 2px;
}
</style>
