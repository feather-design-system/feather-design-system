<template>
  <div
    class="picker"
    role="application"
    @focusout.capture="clearAlertText"
    @focusin.capture="setAlertText()"
    tabindex="-1"
    @focus="focus"
  >
    <div role="alert" class="sr-only">{{ alertText }}</div>
    <div class="header">
      <FeatherButton
        link
        class="chevron left"
        :icon="labels.prevMonth"
        @click="prevMonth"
        ref="prev-month"
        data-ref-id="feather-calendar-prev-month"
      >
        <FeatherIcon :icon="prevIcon" />
      </FeatherButton>
      <FeatherSelect
        :model-value="currentMonth"
        @update:modelValue="monthChanged"
        :label="(labels.selectMonth as string)"
        :options="months"
        inline
        ref="select-month"
        data-ref-id="feather-calendar-select-month"
        class="inline-select"
      />
      <FeatherSelect
        :model-value="currentYear"
        @update:modelValue="yearChanged"
        :label="(labels.selectYear as string)"
        :options="years"
        inline
        ref="select-year"
        data-ref-id="feather-calendar-select-year"
        class="inline-select year"
      />

      <FeatherButton
        link
        class="chevron"
        :icon="labels.nextMonth"
        @click="nextMonth"
        ref="next-month"
        data-ref-id="feather-calendar-next-month"
      >
        <FeatherIcon :icon="nextIcon" />
      </FeatherButton>
    </div>
    <table class="calendar" role="presentation">
      <tr>
        <th class="cell day-header" v-for="d in daysOfWeek" :key="d">
          {{ d }}
        </th>
      </tr>
      <tr v-for="week in weeks" :key="'week' + week[0].timestamp">
        <td v-for="day in week" :key="day.timestamp">
          <button
            class="cell day hover focus"
            type="button"
            :aria-label="day.label"
            :aria-disabled="day.isDisabled ? 'true' : 'false'"
            :aria-pressed="day.isSelected ? 'true' : 'false'"
            :class="dayClasses(day)"
            @click="onClick(day)"
            @keydown="onKeydown"
            :data-ref-id="
              day.isHighlighted ? 'feather-calendar-highlighted-day' : ''
            "
            :tabindex="day.isHighlighted ? 0 : -1"
          >
            {{ day.date }}
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import { KEYCODES } from "@featherds/utils/keys";
import { FeatherButton } from "@featherds/button";
import { FeatherSelect, ISelectItemType } from "@featherds/select";
import { FeatherIcon } from "@featherds/icon";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import prevIcon from "@featherds/icon/navigation/ChevronLeft";
import nextIcon from "@featherds/icon/navigation/ChevronRight";
import utils from "./DateUtils";
import { defineComponent, PropType, toRef } from "vue";
import { IDateDisabledConfig, LABELS } from "../types";
interface ICalendarDay {
  date: number;
  timestamp: number;
  label: string;
  isDisabled: boolean;
  isBlank?: boolean;
  isSelected?: boolean;
  isHighlighted?: boolean;
  isToday?: boolean;
}
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits: ["update:modelValue", "close"],
  provide: { validationErrorMessage: undefined },
  props: {
    modelValue: {
      type: Date,
      validator: (val: Date | null | undefined) => {
        return !!(val === null || val === undefined || val instanceof Date);
      },
    },
    minYear: {
      type: Number,
      required: true,
    },
    maxYear: {
      type: Number,
      required: true,
    },
    mondayFirst: { type: Boolean, default: false },
    disabled: {
      type: Object as PropType<IDateDisabledConfig>,
      required: false,
    },
    labels: {
      type: Object as PropType<Partial<typeof LABELS>>,
      required: true,
    },
  },
  data() {
    return {
      currentlyHighlighted: utils.isValidDate(this.modelValue)
        ? (this.modelValue as Date)
        : new Date(),
      localValue: utils.isValidDate(this.modelValue)
        ? (this.modelValue as Date)
        : undefined,
      alertText: "",
      nextIcon: nextIcon,
      prevIcon: prevIcon,
    };
  },
  setup(props) {
    return useLabelProperty<typeof LABELS>(toRef(props, "labels"), LABELS);
  },
  watch: {
    modelValue(v) {
      if (v instanceof Date) {
        this.currentlyHighlighted = v;
        this.localValue = v;
      } else {
        this.currentlyHighlighted = new Date();
      }
    },
  },
  computed: {
    currentYear() {
      return {
        _text: utils.getYear(this.currentlyHighlighted),
        value: utils.getYear(this.currentlyHighlighted),
      };
    },
    years() {
      const years = [];
      let current = this.minYear;
      const max = this.maxYear;
      while (current <= max) {
        years.push(current);
        current++;
      }
      return years.reverse().map((x) => ({
        _text: x,
        value: x,
      }));
    },
    months() {
      const tempDate = new Date();
      tempDate.setDate(1);
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((x) => {
        tempDate.setMonth(x);
        return {
          _text: tempDate.toLocaleDateString(undefined, { month: "long" }),
          value: tempDate.getMonth(),
        };
      });
    },
    currentMonth() {
      return {
        _text: this.currentlyHighlighted.toLocaleDateString(undefined, {
          month: "long",
        }),
        value: this.currentlyHighlighted.getMonth(),
      };
    },
    daysOfWeek() {
      const date = 21;
      const tempDate = new Date(2021, 1, 21); //set to a sunday please
      const translations = [0, 1, 2, 3, 4, 5, 6].map((x) => {
        tempDate.setDate(date + x);
        return tempDate.toLocaleDateString(undefined, { weekday: "short" })[0];
      });
      if (this.mondayFirst) {
        const tempDays = translations.slice();
        tempDays.push(tempDays.shift() as string);
        return tempDays;
      }
      return translations;
    },
    startBlankDays(): ICalendarDay[] {
      const d = this.currentlyHighlighted;
      const dObj = new Date(d.getFullYear(), d.getMonth(), 1);
      let count = utils.getDay(dObj) as number;
      if (this.mondayFirst) {
        count = utils.getDay(dObj) > 0 ? utils.getDay(dObj) - 1 : 6;
      }
      const days: ICalendarDay[] = [];
      let date = dObj;
      for (let i = 0; i < count; i++) {
        date = utils.subDays(date, 1);
        days.unshift({
          date: utils.getDate(date),
          timestamp: date.getTime(),
          label: this.getAriaLabel(date),
          isDisabled: utils.isDateDisabled(this.disabled, date),
          isBlank: true,
        });
      }
      return days;
    },
    endBlankDays(): ICalendarDay[] {
      const d = new Date(this.days[this.days.length - 1].timestamp);
      const dObj = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      let count = utils.getDay(dObj) as number;
      if (this.mondayFirst) {
        count = utils.getDay(dObj) > 0 ? utils.getDay(dObj) - 1 : 6;
      }
      count = 6 - count;
      const days = [];
      let date = dObj;
      for (let i = 0; i < count; i++) {
        date = utils.addDays(date, 1);
        days.push({
          date: utils.getDate(date),
          timestamp: date.getTime(),
          label: this.getAriaLabel(date),
          isDisabled: utils.isDateDisabled(this.disabled, date),
          isBlank: true,
        });
      }
      return days;
    },
    days(): ICalendarDay[] {
      const d = this.currentlyHighlighted;
      const days: ICalendarDay[] = [];
      // set up a new date object to the beginning of the current 'page'
      let dObj = new Date(d.getFullYear(), d.getMonth(), 1);
      const daysInMonth = utils.getDaysInMonth(dObj);
      for (let i = 0; i < daysInMonth; i++) {
        const disabled = utils.isDateDisabled(this.disabled, dObj);
        days.push({
          date: utils.getDate(dObj),
          timestamp: dObj.getTime(),
          label: this.getAriaLabel(dObj),
          isSelected: utils.isSameDay(dObj, this.localValue as Date),
          isHighlighted: utils.isSameDay(dObj, this.currentlyHighlighted),
          isToday: utils.isSameDay(dObj, new Date()),
          isDisabled: disabled,
        });
        dObj = utils.addDays(dObj, 1);
      }
      return days;
    },
    weeks() {
      const allDays: ICalendarDay[] = [
        ...this.startBlankDays,
        ...this.days,
        ...this.endBlankDays,
      ];

      const weeks = [];
      while (allDays.length > 0) {
        weeks.push(allDays.splice(0, 7));
      }
      return weeks;
    },
  },
  methods: {
    clearAlertText() {
      this.alertText = "";
    },
    setAlertText() {
      this.alertText = this.inCalendarLabel;
    },
    focus() {
      this.$nextTick(() => {
        const focusable = this.$el.querySelector("[tabindex='0']");
        if (focusable) {
          this.$nextTick(() => {
            //another tick to account for the menu
            focusable.focus();
          });
        }
      });
    },
    nextMonth() {
      this.highlightDate(utils.addMonths(this.currentlyHighlighted, 1));
      this.focus();
    },
    prevMonth() {
      this.highlightDate(utils.subMonths(this.currentlyHighlighted, 1));
      this.focus();
    },
    nextYear() {
      this.highlightDate(utils.addYears(this.currentlyHighlighted, 1));
      this.focus();
    },
    prevYear() {
      this.highlightDate(utils.subYears(this.currentlyHighlighted, 1));
      this.focus();
    },
    yearChanged(e: ISelectItemType | undefined) {
      if (e) {
        const val = e as { _text: number; value: number };
        this.highlightDate(
          utils.setYear(
            this.currentlyHighlighted,
            parseInt(val.value.toString(), 10)
          )
        );
      }
    },
    monthChanged(e: ISelectItemType | undefined) {
      if (e) {
        const val = e as { _text: number; value: number };
        this.highlightDate(
          utils.setMonth(
            this.currentlyHighlighted,
            parseInt(val.value.toString(), 10)
          )
        );
      }
    },
    getAriaLabel(date: Date) {
      return date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    onClick(day: ICalendarDay) {
      if (day.isDisabled) {
        return;
      }
      this.selectDate(new Date(day.timestamp));
      this.$emit("close");
    },
    onKeydown(e: KeyboardEvent) {
      const highlightDay = (date: Date) => {
        this.highlightDate(date);
        this.focus();
      };
      switch (e.keyCode) {
        case KEYCODES.ESCAPE: //esc
          e.stopPropagation();
          this.$emit("close");
          break;
        case KEYCODES.ENTER:
        case KEYCODES.SPACE:
          e.preventDefault();
          if (!(e.target as HTMLElement).classList.contains("disabled")) {
            this.selectDate(this.currentlyHighlighted);
            this.$emit("close");
          }
          break;
        //down
        case KEYCODES.DOWN:
          highlightDay(utils.addWeeks(this.currentlyHighlighted, 1));
          e.preventDefault();
          break;
        //right
        case KEYCODES.RIGHT:
          highlightDay(utils.addDays(this.currentlyHighlighted, 1));

          e.preventDefault();
          break;
        //left
        case KEYCODES.LEFT:
          highlightDay(utils.subDays(this.currentlyHighlighted, 1));
          e.preventDefault();
          break;
        //up
        case KEYCODES.UP:
          highlightDay(utils.subWeeks(this.currentlyHighlighted, 1));
          e.preventDefault();
          break;
        //page up
        case KEYCODES.PAGEUP:
          if (e.shiftKey) {
            this.prevYear();
          } else {
            this.prevMonth();
          }
          highlightDay(this.currentlyHighlighted);
          break;
        //pagedown
        case KEYCODES.PAGEDOWN:
          if (e.shiftKey) {
            this.nextYear();
          } else {
            this.nextMonth();
          }
          highlightDay(this.currentlyHighlighted);
          break;
        default:
          break;
      }
    },
    highlightDate(date: Date) {
      this.currentlyHighlighted = date instanceof Date ? date : new Date();
    },
    selectDate(date: Date) {
      if (utils.isDateDisabled(this.disabled, date)) {
        return;
      }
      this.$emit("update:modelValue", date);
    },

    dayClasses(day: ICalendarDay) {
      return {
        selected: day.isSelected,
        highlighted: day.isHighlighted,
        today: day.isToday,
        blank: day.isBlank,
        disabled: day.isDisabled,
      };
    },
  },
  components: {
    FeatherButton,
    FeatherIcon,
    FeatherSelect,
  },
});
</script>

<style lang="scss" scoped>
@import "./Calendar";
</style>
