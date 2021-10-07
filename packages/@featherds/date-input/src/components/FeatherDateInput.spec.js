import { nextTick } from "vue";
import FeatherDateInput from "./FeatherDateInput.vue";

import * as id from "@featherds/utils/id";
jest.spyOn(id, "getSafeId").mockImplementation((x) => x);

import { mount, config } from "@vue/test-utils";
import "@featherds/input-helper/test/MutationObserver";
import axe from "@featherds/utils/test/axe";

config.renderStubDefaultSlot = true;

const getWrapper = function (options = {}) {
  options.attachTo = document.body;
  options.props = {
    ...options.props,
    label: "Test",
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
    inputWrapper.vm.$emit("wrapper-click", { target: inputWrapper.$el });
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
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(date);
  });
  it("should select date initially passed in as value", async () => {
    const wrapper = getWrapper({
      props: {
        modelValue: new Date(2020, 1, 1),
      },
    });
    expect(wrapper.find(".feather-date-input-group").element).toMatchSnapshot();
  });
  it("should be accessible", async () => {
    id.getSafeId.mockRestore();
    const wrapper = mount(FeatherDateInput, {
      props: {
        label: "Test",
      },
    });
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
