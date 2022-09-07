<template>
  <div
    v-bind="inherittedAttrs"
    @focusin="handleFocus"
    @focusout="handleBlur"
    @keypress="handleKeyDown"
    class="feather-date-input-container"
  >
    <FeatherMenu
      right
      :open="showMenu"
      @outside-click="handleOutsideClick"
      @trigger-click="handleTriggerClick"
      class="feather-date-input-menu-container"
      data-ref-id="feather-date-input-menu-container"
      ref="menu"
    >
      <template #trigger="triggerProps">
        <InputWrapper
          :for="inputId"
          raised
          :focused="hasFocus"
          :show-clear="showClear"
          :clear-text="clearLabel"
          @wrapper-click="handleWrapperClick"
          @clear="handleClear"
          ref="wrapper"
        >
          <template v-slot:pre>
            <slot name="pre" />
          </template>
          <div
            v-bind="attrs"
            role="group"
            class="feather-date-input-group"
            data-ref-id="feather-date-input-group"
          >
            <SpinButton
              :id="monthId"
              :tabindex="disabled ? -1 : 0"
              :label="monthLabel"
              ref="monthButton"
              :min="1"
              :max="12"
              :disabled="disabled"
              v-model="month"
              placeholder="mm"
              @next="focusDay"
              @paste="handlePaste"
              data-ref-id="feather-date-input-month"
            />
            /
            <SpinButton
              :label="dayLabel"
              ref="dayButton"
              :min="1"
              :max="31"
              :disabled="disabled"
              v-model="day"
              placeholder="dd"
              @next="focusYear"
              @previous="focusMonth"
              @paste="handlePaste"
              data-ref-id="feather-date-input-day"
            />
            /
            <SpinButton
              :label="yearLabel"
              ref="yearButton"
              :min="minYear"
              :max="maxYear"
              :disabled="disabled"
              v-model="year"
              placeholder="yyyy"
              @previous="focusDay"
              @paste="handlePaste"
              data-ref-id="feather-date-input-year"
            />
          </div>
          <template v-slot:post>
            <DateIcon
              v-bind="triggerProps.attrs"
              v-on="triggerProps.on"
              :title="calendarLabel"
              ref="icon"
              data-ref-id="feather-date-input-button"
            ></DateIcon>
          </template>
        </InputWrapper>
      </template>
      <Calendar
        ref="calendar"
        :modelValue="modelValue"
        @update:modelValue="handleCalendarSelection"
        @close="showMenu = false"
        :max-year="maxYear"
        :min-year="minYear"
        :disabled="disabledDates"
        :labels="labels"
        :monday-first="mondayFirst"
        :aria-label="menuLabel"
      />
    </FeatherMenu>
    <InputSubText :id="descriptionId"> </InputSubText>
  </div>
</template>
<script lang="ts">
import {
  ref,
  computed,
  watch,
  toRef,
  nextTick,
  defineComponent,
  Ref,
  PropType,
} from "vue";
import { getSafeId } from "@featherds/utils/id";
import { Code } from "@featherds/utils/keys";
import { useValidation } from "@featherds/input-helper";

import { useLabelProperty } from "@featherds/composables/LabelProperty";
import {
  InputWrapper,
  InputSubText,
  InputWrapperProps,
  InputSubTextProps,
  useInputWrapper,
  useInputSubText,
  useInputInheritAttrs,
} from "@featherds/input-helper";
import SpinButton from "./SpinButton.vue";
import DateIcon from "./Calendar/DateIcon.vue";
import Calendar from "./Calendar/Calendar.vue";
import { IDateDisabledConfig, LABELS } from "./types";
import { FeatherMenu } from "@featherds/menu";
import parse from "date-fns/parse";

export const props = {
  ...InputWrapperProps,
  ...InputSubTextProps,
  modelValue: {
    type: Date,
    required: false,
  },
  minYear: {
    type: Number,
    default: 1900,
  },
  maxYear: {
    type: Number,
    default: 2030,
  },
  disabledDates: {
    type: Object as PropType<IDateDisabledConfig>,
  },
  mondayFirst: {
    type: Boolean,
    default: false,
  },
  labels: {
    type: Object as PropType<Partial<typeof LABELS>>,
    default: () => {
      return LABELS;
    },
  },
  schema: {
    type: Object,
    required: false,
  },
  pasteFormats: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => {
      return [
        "yyyy-MM-dd",
        "MM/dd/yyyy",
        "MM-dd-yyyy",
        "MMM/dd/yyyy",
        "MMM-dd-yyyy",
        "MM/dd/yy",
        "MM-dd-yy",
        "MMM/dd/yy",
        "MMM-dd-yy",
        "M/d/yyyy",
        "M-d-yyyy",
        "M/d/yy",
        "M-d-yy",
      ];
    },
  },
  referenceDate: {
    type: Object as PropType<Date>,
    required: false,
    default: () => new Date(),
  },
} as const;
export const emits = {
  "update:modelValue": (_value: Date | undefined) => true,
  blur: () => true,
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

    const day = ref() as Ref<number | undefined>;
    const month = ref() as Ref<number | undefined>;
    const year = ref() as Ref<number | undefined>;

    const value = toRef(props, "modelValue");
    const label = toRef(props, "label");
    const disabled = toRef(props, "disabled");
    const menu = ref();
    const showClear = ref(false);

    const inputId = computed(() => {
      return getSafeId("feather-date-input-label");
    });
    const monthId = computed(() => {
      return getSafeId("feather-date-input-month");
    });

    const { validate } = useValidation(
      ref(monthId),
      value,
      props.label as string,
      props.schema as Record<string, any>,
      toRef(props, "error") as Ref<string>
    );

    watch(
      [day, month, year],
      ([_day, _month, _year]) => {
        //check to make sure we aren't updating
        //to the date that already is set
        let _oldDay = 0;
        let _oldYear = 0;
        let _oldMonth = 0;
        if (value.value instanceof Date) {
          _oldDay = value.value.getDate();
          _oldYear = value.value.getFullYear();
          _oldMonth = value.value.getMonth() + 1;
        }
        if (
          _day !== undefined &&
          _month !== undefined &&
          _year !== undefined &&
          _year !== _oldYear &&
          _day !== _oldDay &&
          _month !== _oldMonth
        ) {
          context.emit("update:modelValue", new Date(_year, _month - 1, _day));
        }
        showClear.value = !!(_day || _month || _year);
      },
      { immediate: true }
    );

    const handleCalendarSelection = (_value: Date | undefined) => {
      context.emit("update:modelValue", _value);
      showMenu.value = false;
    };

    const focused = ref(false);
    const showMenu = ref(false);

    const descriptionId = computed(() => {
      return getSafeId("feather-date-input-description");
    });

    const attrs = computed(() => {
      const _attrs = {
        ...context.attrs,
        class: disabled.value ? "disabled" : "",
        id: inputId.value,
        "aria-label": label.value,
        "aria-disabled": disabled.value,
        "aria-describedby": (
          (context.attrs["aria-describedby"] as string) || ""
        )
          .split(" ")
          .concat([descriptionId.value])
          .filter(Boolean)
          .join(" "),
      } as Record<string, unknown>;
      delete _attrs.placeholder;

      //use aria-invalid if passed in (some validation libraries will specify this)
      //otherwise base it off this.error
      if (!_attrs["aria-invalid"]) {
        _attrs["aria-invalid"] = !!props.error;
      }

      return _attrs;
    });

    const spinbuttons = (() => {
      const dayButton = ref();
      const monthButton = ref();
      const yearButton = ref();

      const focusMonth = () => {
        if (disabled.value) {
          return;
        }
        monthButton.value.focus();
      };
      const focusDay = () => {
        if (disabled.value) {
          return;
        }
        dayButton.value.focus();
      };
      const focusYear = () => {
        if (disabled.value) {
          return;
        }
        yearButton.value.focus();
      };
      const clear = () => {
        dayButton.value?.clear();
        monthButton.value?.clear();
        yearButton.value?.clear();
      };

      const deselectAllSpinButtons = () => {
        dayButton.value?.deselect();
        monthButton.value?.deselect();
        yearButton.value?.deselect();
      };

      return {
        dayButton,
        monthButton,
        yearButton,
        focusDay,
        focusMonth,
        focusYear,
        deselectAllSpinButtons,
        clear,
      };
    })();

    const handleFocus = () => {
      if (disabled.value) {
        return;
      }
      focused.value = true;
    };
    const handleBlur = (e: FocusEvent) => {
      if (!menu.value.$el.contains(e.relatedTarget) && !showMenu.value) {
        validate();
        focused.value = false;
        context.emit("blur");
        spinbuttons.deselectAllSpinButtons();
      } else {
        spinbuttons.deselectAllSpinButtons();
      }
    };

    //taken from https://github.com/date-fns/date-fns/issues/2087
    const isMatchYears = (date: string, pattern: string) => {
      const yearsLen = pattern.split("y").length - 1;
      if (!(yearsLen > 0)) {
        return true;
      } else {
        const yearsIndex = pattern.indexOf("y");
        const afterYears = date.slice(yearsIndex);
        const yearsMatch = afterYears.match(/^.\d+/);
        if (yearsMatch !== null) {
          const firstMatch = yearsMatch[0];
          const result = firstMatch.match(/\d+/);
          if (result) {
            return result[0].length === yearsLen;
          }
        }
        return false;
      }
    };
    const handlePaste = (pasted: string) => {
      let date = new Date();
      const found = props.pasteFormats.some((format) => {
        try {
          date = parse(pasted, format, props.referenceDate);
          return !isNaN(date.getTime()) && isMatchYears(pasted, format);
        } catch (e) {
          return false;
        }
      });
      if (found) {
        handleCalendarSelection(date);
      }
    };
    const hasFocus = computed(() => {
      return focused.value || showMenu.value;
    });

    watch(hasFocus, (v) => {
      if (!v) {
        validate();
        context.emit("blur");
        showMenu.value = false;
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === Code.ENTER || e.code === Code.SPACE) {
        openCalendar();
      }
    };

    // Element refs
    const icon = ref();
    const calendar = ref();

    const handleWrapperClick = (e: MouseEvent) => {
      if (icon.value.$el.contains(e.target)) {
        spinbuttons.deselectAllSpinButtons();
        return;
      }
      spinbuttons.focusMonth();
    };
    const handleTriggerClick = () => {
      openCalendar();
    };
    const handleOutsideClick = () => {
      showMenu.value = false;
    };

    const reset = () => {
      showMenu.value = false;
      day.value = undefined;
      year.value = undefined;
      month.value = undefined;

      context.emit("update:modelValue", undefined);
      spinbuttons.clear();
    };

    const handleClear = () => {
      reset();
      spinbuttons.focusMonth();
    };
    let calendarActivator: HTMLElement | undefined;
    const openCalendar = () => {
      if (props.disabled) {
        return;
      }
      calendarActivator = document.activeElement as HTMLElement;
      showMenu.value = true;
      nextTick(() => {
        calendar.value.focus();
      });
    };

    watch(
      value,
      (nv, ov) => {
        if (nv instanceof Date) {
          day.value = nv.getDate();
          year.value = nv.getFullYear();
          month.value = nv.getMonth() + 1;
        }
        if (ov !== undefined && nv === undefined) {
          reset();
        }
      },
      { immediate: true }
    );

    watch(showMenu, (v) => {
      if (!v) {
        if (props.disabled) {
          return;
        }
        if (calendarActivator) {
          calendarActivator.focus();
        }
        calendarActivator = undefined;
      }
    });

    const labels = useLabelProperty<typeof LABELS>(
      toRef(props, "labels"),
      LABELS
    );
    context.expose({ reset });
    return {
      validate,
      day,
      month,
      year,
      showClear,
      focused,
      hasFocus,
      showMenu,
      icon,
      menu,
      calendar,
      inputId,
      monthId,
      descriptionId,
      attrs,
      handleClear,
      reset,
      handleFocus,
      handlePaste,
      handleBlur,
      handleKeyDown,
      handleWrapperClick,
      handleOutsideClick,
      handleTriggerClick,
      handleCalendarSelection,
      ...labels,
      ...spinbuttons,
      ...useInputInheritAttrs(context.attrs as Record<string, unknown>),
    };
  },

  components: {
    SpinButton,
    InputSubText,
    InputWrapper,
    FeatherMenu,
    DateIcon,
    Calendar,
  },
});
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.feather-date-input-group {
  flex: 1;
  &.disabled {
    cursor: default;
    color: var($disabled-text-on-surface);
  }
}
.feather-date-input-menu-container {
  width: 100%;
  :deep(.feather-menu-dropdown) {
    border-radius: 4px;
  }
}
</style>
