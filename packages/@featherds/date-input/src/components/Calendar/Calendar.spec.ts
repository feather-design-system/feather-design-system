import Calendar from "./Calendar.vue";
import { shallowMount } from "@vue/test-utils";
import utils from "./DateUtils";
import { getCalls } from "@featherds/utils/test/calls";
import { LABELS } from "../types";
import { Code, Modifier } from "@featherds/utils/keys";

const getWrapper = () =>
  shallowMount(Calendar, {
    props: {
      modelValue: new Date(2018, 2, 24),
      minYear: 1900,
      maxYear: 2030,
      labels: LABELS,
      mondayFirst: false,
      disabled: undefined,
    },
  });

describe("Calendar", () => {
  let wrapper: ReturnType<typeof getWrapper>;
  beforeEach(() => {
    wrapper = getWrapper();
  });

  it("knows the selected date", async () => {
    const newDate = new Date(2016, 9, 15);
    await wrapper.setProps({
      modelValue: newDate,
    });
    expect(utils.isSameDay(wrapper.vm.currentlyHighlighted, newDate)).toEqual(
      true
    );
    expect(
      utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2017, 1, 1))
    ).toEqual(false);
    expect(utils.isSameDay(wrapper.vm.localValue as Date, newDate)).toEqual(
      true
    );
    expect(
      utils.isSameDay(wrapper.vm.localValue as Date, new Date(2017, 1, 1))
    ).toEqual(false);
  });
  it("should emit input when date is clicked", async () => {
    await wrapper.find("button.cell.day:not(.blank)").trigger("click");
    expect(getCalls<[Date]>(wrapper, "update:modelValue")).toBeTruthy();
    expect(
      utils.isSameDay(
        getCalls<[Date]>(wrapper, "update:modelValue")[0][0],
        new Date(2018, 2, 1)
      )
    ).toBe(true);
  });
  describe("keydown", () => {
    it("should highlight previous week with up key", async () => {
      const selected = wrapper.find<HTMLButtonElement>("button.selected");
      selected.element.focus();
      await selected.trigger("keydown", { code: Code.UP });
      expect(
        utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2018, 2, 17))
      ).toBe(true);
    });
    it("should highlight next day with right key", async () => {
      const selected = wrapper.find<HTMLButtonElement>("button.selected");
      selected.element.focus();
      await selected.trigger("keydown", { code: Code.RIGHT });
      expect(
        utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2018, 2, 25))
      ).toBe(true);
    });
    it("should highlight previous day with left key", async () => {
      const selected = wrapper.find<HTMLButtonElement>("button.selected");
      selected.element.focus();
      await selected.trigger("keydown", { code: Code.LEFT });
      expect(
        utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2018, 2, 23))
      ).toBe(true);
    });
    it("should highlight next week with down key", async () => {
      const selected = wrapper.find<HTMLButtonElement>("button.selected");
      selected.element.focus();
      await selected.trigger("keydown", { code: Code.DOWN });
      expect(
        utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2018, 2, 31))
      ).toBe(true);
    });
    it("should select current day and emit close with space", async () => {
      const selected = wrapper.find<HTMLButtonElement>("button.selected");
      selected.element.focus();
      await selected.trigger("keydown", { code: Code.SPACE });
      expect(
        utils.isSameDay(
          getCalls<[Date]>(wrapper, "update:modelValue")[0][0],
          new Date(2018, 2, 24)
        )
      ).toBe(true);
      expect(wrapper.emitted().close).toBeDefined();
    });
    it("should select current day and emit close with enter", async () => {
      const selected = wrapper.find<HTMLButtonElement>("button.selected");
      selected.element.focus();
      await selected.trigger("keydown", { code: Code.ENTER });
      expect(
        utils.isSameDay(
          getCalls<[Date]>(wrapper, "update:modelValue")[0][0],
          new Date(2018, 2, 24)
        )
      ).toBe(true);
      expect(wrapper.emitted().close).toBeDefined();
    });
    it("should emit close with esc", async () => {
      const selected = wrapper.find<HTMLButtonElement>("button.selected");
      selected.element.focus();
      await selected.trigger("keydown", { code: Code.ESCAPE });
      expect(wrapper.emitted("update:modelValue")).not.toBeDefined();
      expect(wrapper.emitted().close).toBeDefined();
    });
    it("should highlight next month with page down", async () => {
      const selected = wrapper.find<HTMLButtonElement>("button.selected");
      selected.element.focus();
      await selected.trigger("keydown", { code: Code.PAGEDOWN });
      expect(
        utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2018, 3, 24))
      ).toBe(true);
    });
    it("should highlight previous month with page up", async () => {
      const selected = wrapper.find<HTMLButtonElement>("button.selected");
      selected.element.focus();
      await selected.trigger("keydown", { code: Code.PAGEUP });
      expect(
        utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2018, 1, 24))
      ).toBe(true);
    });
    it("should highlight next year with shift page down", async () => {
      const selected = wrapper.find<HTMLButtonElement>("button.selected");
      selected.element.focus();
      await selected.trigger("keydown", {
        code: Code.PAGEDOWN,
        [Modifier.SHIFT]: true,
      });
      expect(
        utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2019, 2, 24))
      ).toBe(true);
    });
    it("should highlight previous year with shift page up", async () => {
      const selected = wrapper.find<HTMLButtonElement>("button.selected");
      selected.element.focus();
      await selected.trigger("keydown", {
        code: Code.PAGEUP,
        [Modifier.SHIFT]: true,
      });
      expect(
        utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2017, 2, 24))
      ).toBe(true);
    });
  });
  it("should select next month when next month button is clicked", async () => {
    const next = wrapper.getComponent({ ref: "next-month" });
    await next.vm.$emit("click");
    expect(
      utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2018, 3, 24))
    ).toBe(true);
  });
  it("should select previous month when previous month button is clicked", async () => {
    const next = wrapper.getComponent({ ref: "prev-month" });
    await next.vm.$emit("click");
    expect(
      utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2018, 1, 24))
    ).toBe(true);
  });
  it("should not highlight an invalid value when navigating by month", async () => {
    const newDate = new Date(2018, 0, 31);
    await wrapper.setProps({
      modelValue: newDate,
    });
    wrapper.vm.nextMonth();
    expect(
      utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2018, 1, 28))
    ).toBe(true);
  });
  it("should change month when month dropdown is changed", async () => {
    const select = wrapper.getComponent({ ref: "select-month" });
    await select.vm.$emit("update:modelValue", { value: "11" });
    expect(
      utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(2018, 11, 24))
    ).toBe(true);
  });

  it("should change year when year dropdown is changed", async () => {
    const select = wrapper.getComponent({ ref: "select-year" });
    await select.vm.$emit("update:modelValue", { value: "1999" });
    expect(
      utils.isSameDay(wrapper.vm.currentlyHighlighted, new Date(1999, 2, 24))
    ).toBe(true);
  });
});
