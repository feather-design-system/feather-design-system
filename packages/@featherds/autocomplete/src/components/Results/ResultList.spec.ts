import { useResultList } from "./ResultList";
import Vue from "vue";
import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { KEYCODES } from "@featherds/utils/keys";
const DOWNEVENT = {
  keyCode: KEYCODES.DOWN,
  preventDefault: () => {},
} as KeyboardEvent;
const UPEVENT = {
  keyCode: KEYCODES.UP,
  preventDefault: () => {},
} as KeyboardEvent;
const getResults = () => [
  {
    _text: "Item 1",
  },
  {
    _text: "Item 2",
  },
];
const createWrapper = () => {
  return mount({
    template: `<div></div>`,
    setup: () => {
      return useResultList();
    },
  });
};

describe("useResultList", () => {
  it("should select first row when down is pressed with no active row", async () => {
    const wrapper = createWrapper();
    const processed = wrapper.vm.handleKeyPress(DOWNEVENT, getResults());
    await nextTick();
    expect(wrapper.vm.active.row).toBe(0);
    expect(processed).toBe(true);
  });
  it("should move row down one when down arrow is pressed", async () => {
    const wrapper = createWrapper();
    wrapper.vm.active.row = 0;
    const processed = wrapper.vm.handleKeyPress(DOWNEVENT, getResults());
    await nextTick();
    expect(processed).toBe(true);
    expect(wrapper.vm.active.row).toBe(1);
  });
  it("should not wrap when down is pressed on last item", async () => {
    const wrapper = createWrapper();
    const results = getResults();
    wrapper.vm.active.row = results.length - 1;
    const processed = wrapper.vm.handleKeyPress(DOWNEVENT, results);
    await nextTick();
    expect(processed).toBe(true);
    expect(wrapper.vm.active.row).toBe(results.length - 1);
  });
  it("should move row up one when up arrow is pressed", async () => {
    const wrapper = createWrapper();
    const results = getResults();
    wrapper.vm.active.row = 1;
    const processed = wrapper.vm.handleKeyPress(UPEVENT, results);
    await nextTick();
    expect(processed).toBe(true);
    expect(wrapper.vm.active.row).toBe(0);
  });
  it("should reset row when up arrow is pressed on first item", async () => {
    const wrapper = createWrapper();
    const results = getResults();
    wrapper.vm.active.row = 0;
    const processed = wrapper.vm.handleKeyPress(UPEVENT, results);
    await nextTick();
    expect(processed).toBe(true);
    expect(wrapper.vm.active.row).toBe(-1);
  });
  it("should select first row when first is called", async () => {
    const wrapper = createWrapper();
    wrapper.vm.active.row = -1;
    wrapper.vm.first();
    await nextTick();
    expect(wrapper.vm.active.row).toBe(0);
  });
  it("should reset row when reset is called", async () => {
    const wrapper = createWrapper();
    wrapper.vm.active.row = 1;
    wrapper.vm.reset();
    await nextTick();
    expect(wrapper.vm.active.row).toBe(-1);
  });
});
