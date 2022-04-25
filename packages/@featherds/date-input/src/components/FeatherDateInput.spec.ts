import { nextTick } from "vue";
import FeatherDateInput from "./FeatherDateInput.vue";

import * as id from "@featherds/utils/id";
const idSpy = jest.spyOn(id, "getSafeId").mockImplementation((x) => x);

import { mount } from "@vue/test-utils";
import "@featherds/input-helper/test/MutationObserver";
import axe from "@featherds/utils/test/axe";
import { getCalls } from "@featherds/utils/test/calls";
declare global {
  interface Date {
    toLocaleDateStringDefault: (locale: string, opts: unknown) => string;
  }
}
Date.prototype.toLocaleDateStringDefault = Date.prototype.toLocaleDateString;
Date.prototype.toLocaleDateString = function (
  _locale?: string | string[] | undefined,
  options?: Intl.DateTimeFormatOptions | undefined
) {
  const result = this.toLocaleDateStringDefault("en-US", options);
  return result;
};

const getWrapper = function (options: Record<string, unknown> = {}) {
  const props = (options.props as Object) || {};
  options.props = {
    ...props,
    label: "Test",
  };
  options.global = {
    stubs: {
      "feather-menu": { template: "<div><slot name='trigger'/><slot/></div>" },
    },
  };
  return mount(FeatherDateInput, options);
};

describe("FeatherDateInput.vue", () => {
  it("should move from month to day with next from month spinner", async () => {
    const wrapper = getWrapper();
    const stubFocusDay = jest.fn();
    wrapper.vm.dayButton.focus = stubFocusDay;
    const month = wrapper.findComponent({ ref: "monthButton" });
    month.vm.$emit("next");
    await nextTick();
    expect(stubFocusDay).toHaveBeenCalled();
  });
  it("should move from day to year with next from day spinner", async () => {
    const wrapper = getWrapper();
    const stubFocus = jest.fn();
    wrapper.vm.yearButton.focus = stubFocus;

    const day = wrapper.findComponent({ ref: "dayButton" });
    day.vm.$emit("next");
    await nextTick();
    expect(stubFocus).toHaveBeenCalled();
  });
  it("should move from year to day with  previous from year spinner", async () => {
    const wrapper = getWrapper();
    const stubFocus = jest.fn();
    wrapper.vm.dayButton.focus = stubFocus;

    const year = wrapper.findComponent({ ref: "yearButton" });
    year.vm.$emit("previous");
    await nextTick();
    expect(stubFocus).toHaveBeenCalled();
  });
  it("should move from day to month with previous from day spinner", async () => {
    const wrapper = getWrapper();
    const stubFocus = jest.fn();
    wrapper.vm.monthButton.focus = stubFocus;

    const day = wrapper.findComponent({ ref: "dayButton" });
    day.vm.$emit("previous");
    await nextTick();
    expect(stubFocus).toHaveBeenCalled();
  });

  it("should clear spin buttons when value is typed in", async () => {
    const wrapper = getWrapper();

    const day = wrapper.findComponent({ ref: "dayButton" });
    const month = wrapper.findComponent({ ref: "monthButton" });
    const year = wrapper.findComponent({ ref: "yearButton" });
    await month.trigger("keydown", { key: "3" });
    await day.trigger("keydown", { key: "2" });
    await day.trigger("keydown", { key: "8" });
    await nextTick();
    await wrapper
      .find("[data-ref-id='feather-form-element-clear']")
      .trigger("click");
    expect(month.text().toLowerCase()).toBe("mm");
    expect(day.text().toLowerCase()).toBe("dd");
    expect(year.text().toLowerCase()).toBe("yyyy");
  });
  it("should open menu when calendar is clicked", async () => {
    const wrapper = getWrapper();

    const icon = wrapper.findComponent({ ref: "icon" });
    expect(icon.attributes()["menu-trigger"]).toBeDefined();
    const stubFocus = jest.fn();
    wrapper.vm.calendar.focus = stubFocus;
    const menu = wrapper.findComponent({ ref: "menu" });
    menu.vm.$emit("trigger-click");
    await nextTick();
    expect(wrapper.vm.showMenu).toBe(true);
  });
  it("should focus month if wrapper is clicked", async () => {
    const wrapper = getWrapper();
    const stubFocus = jest.fn();
    wrapper.vm.monthButton.focus = stubFocus;
    const inputWrapper = wrapper.findComponent({ ref: "wrapper" });
    inputWrapper.vm.$emit("wrapper-click", { target: inputWrapper.vm.$el });
    await nextTick();

    expect(stubFocus).toHaveBeenCalled();
  });

  it("should open calendar if enter is pressed", async () => {
    const wrapper = getWrapper();
    const stubFocus = jest.fn();
    wrapper.vm.calendar.focus = stubFocus;
    await wrapper.findComponent({ ref: "wrapper" }).trigger("keypress.enter");
    expect(wrapper.vm.showMenu).toBe(true);
    expect(stubFocus).toHaveBeenCalled();
  });

  it("should open calendar if space is pressed", async () => {
    const wrapper = getWrapper();
    const stubFocus = jest.fn();
    wrapper.vm.calendar.focus = stubFocus;
    await wrapper.findComponent({ ref: "wrapper" }).trigger("keypress.space");
    expect(wrapper.vm.showMenu).toBe(true);
    expect(stubFocus).toHaveBeenCalled();
  });
  it("should update value when calendar selection is made", async () => {
    const wrapper = getWrapper();
    const calendar = wrapper.findComponent({ ref: "calendar" });
    const date = new Date(2020, 1, 1);
    calendar.vm.$emit("update:modelValue", date);
    await nextTick();
    expect(getCalls<[Date]>(wrapper, "update:modelValue")[0][0]).toBe(date);
  });
  it("should select date initially passed in as value", async () => {
    const wrapper = getWrapper({
      props: {
        modelValue: new Date(2020, 1, 1),
      },
    });
    expect(wrapper.find(".feather-date-input-group").element).toMatchSnapshot();
  });
  it("should show clear icon when there is a value", async () => {
    const wrapper = getWrapper();

    await wrapper.setProps({
      modelValue: new Date(2020, 1, 1),
    });

    //check show clear as to avoid GMT issues with snapshotting.
    expect(wrapper.vm.showClear).toBe(true);
  });
  it("should render disabled", async () => {
    const wrapper = getWrapper({
      propsData: {
        disabled: true,
        modelValue: new Date(2020, 1, 1),
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should show clear icon when there is a value", async () => {
    const wrapper = getWrapper({
      propsData: {
        modelValue: new Date(2020, 1, 1),
      },
    });

    //check show clear as to avoid GMT issues with snapshotting.
    expect(wrapper.vm.showClear).toBe(true);
  });
  it("should be accessible", async () => {
    idSpy.mockRestore();
    const wrapper = getWrapper({
      props: {
        label: "Test",
      },
    });
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
