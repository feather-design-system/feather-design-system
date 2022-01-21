<template>
  <div
    v-bind="inherittedAttrs"
    @focusin="handleFocus"
    @focusout="handleBlur"
    @keypress="handleKeyDown"
    class="feather-date-input-container"
  >
    <FeatherMenu
      :open="showMenu"
      right
      @outside-click="handleOutsideClick"
      @trigger-click="handleTriggerClick"
      class="feather-date-input-menu-container"
      ref="menu"
    >
      <template v-slot:trigger>
        <InputWrapper
          :for="inputId"
          raised
          :focused="focused"
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
              data-ref-id="feather-date-input-year"
            />
          </div>
          <template v-slot:post>
            <DateIcon
              menu-trigger
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
        @close="closeCalendar"
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
<script>
import { ref, computed, watch, toRef } from "vue";
import { getSafeId } from "@featherds/utils/id";
import { KEYCODES } from "@featherds/utils/keys";
import { useValidation } from "@featherds/input-helper";

import { useLabelProperty } from "@featherds/composables/LabelProperty";
import {
  InputWrapper,
  InputWrapperMixin,
  InputSubText,
  InputSubTextMixin,
  InputInheritAttrsMixin,
} from "@featherds/input-helper";
import SpinButton from "./SpinButton";
import DateIcon from "./Calendar/DateIcon";
import Calendar from "./Calendar/Calendar";
import { FeatherMenu } from "@featherds/menu";

const LABELS = {
  day: "Day",
  month: "Month",
  year: "Year",
  prevMonth: "Previous month",
  nextMonth: "Next month",
  selectMonth: "Select month",
  selectYear: "Select year",
  inCalendar: "In calendar",
  calendar: "Click for calendar",
  clear: "Clear date",
  menu: "Use arrow keys to navigate dates. Page down and page up will navigate by month. Shift page down and shift page up will navigate by year. Press escape to exit the calendar.",
};

export default {
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits: ["update:modelValue", "blur"],
  props: {
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
      type: Object,
    },
    mondayFirst: {
      type: Boolean,
      default: false,
    },
    labels: {
      type: Object,
      default() {
        return LABELS;
      },
    },
    schema: {
      type: Object,
      required: false,
    },
  },
  mixins: [InputWrapperMixin, InputSubTextMixin, InputInheritAttrsMixin],
  setup(props, context) {
    const day = ref(undefined);
    const month = ref(undefined);
    const year = ref(undefined);

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
      props.label,
      props.schema,
      toRef(props, "error")
    );

    watch(
      value,
      (nv) => {
        if (nv instanceof Date) {
          day.value = nv.getDate();
          year.value = nv.getFullYear();
          month.value = nv.getMonth() + 1;
        }
        if (nv === undefined) {
          day.value = undefined;
          year.value = undefined;
          month.value = undefined;
        }
      },
      { immediate: true }
    );

    watch(
      [day, month, year],
      ([_day, _month, _year]) => {
        if (_day !== undefined && _month !== undefined && _year !== undefined) {
          context.emit("update:modelValue", new Date(_year, _month - 1, _day));
        }
        showClear.value = !!(_day || _month || _year);
      },
      { immediate: true }
    );

    const handleCalendarSelection = (_value) => {
      context.emit("update:modelValue", _value);
      closeCalendar();
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
        "aria-describedby": (context.attrs["aria-describedby"] || "")
          .split(" ")
          .concat([descriptionId.value])
          .filter((x) => x.length > 0)
          .join(" "),
      };
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
        dayButton.value.clear();
        monthButton.value.clear();
        yearButton.value.clear();
      };

      const deselectAllSpinButtons = () => {
        dayButton.value.deselect();
        monthButton.value.deselect();
        yearButton.value.deselect();
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
    const handleBlur = () => {
      validate();
      focused.value = false;
      context.emit("blur");
      spinbuttons.deselectAllSpinButtons();
    };

    const handleKeyDown = (e) => {
      if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
        openCalendar();
      }
    };

    // Element refs
    const icon = ref();
    const calendar = ref();

    const handleWrapperClick = (e) => {
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
    const handleClear = () => {
      showMenu.value = false;
      day.value = undefined;
      year.value = undefined;
      month.value = undefined;

      context.emit("update:modelValue", undefined);
      spinbuttons.clear();
      spinbuttons.focusMonth();
    };
    let calendarActivator;
    const openCalendar = () => {
      if (props.disabled) {
        return;
      }
      calendarActivator = document.activeElement;
      showMenu.value = true;
      calendar.value.focus();
    };

    const closeCalendar = () => {
      if (props.disabled) {
        return;
      }
      showMenu.value = false;
      if (calendarActivator) {
        calendarActivator.focus();
      }
      calendarActivator = undefined;
    };
    const labels = useLabelProperty(toRef(props, "labels"), LABELS);
    return {
      validate,
      day,
      month,
      year,
      showClear,
      focused,
      showMenu,
      icon,
      menu,
      calendar,
      inputId,
      monthId,
      descriptionId,
      attrs,
      closeCalendar,
      handleClear,
      handleFocus,
      handleBlur,
      handleKeyDown,
      handleWrapperClick,
      handleTriggerClick,
      handleOutsideClick,
      handleCalendarSelection,
      ...labels,
      ...spinbuttons,
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
};
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
