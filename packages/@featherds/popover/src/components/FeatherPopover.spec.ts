import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import FeatherPopover from "./FeatherPopover.vue";
import * as id from "@featherds/utils/id";
import { PopoverPlacement } from "../types";
import { Code } from "@featherds/utils/keys";
jest.spyOn(id, "getSafeId").mockImplementation((x) => x);
const getTrigger = () =>
  `<template #trigger="params">
  <button v-bind="params.attrs" v-on="params.on">popover BUTTON</button>
  </template>
`;

const getDefault = () =>
  `<p>Hello from a popover</p>
`;
const getWrapper = (placement = PopoverPlacement.top) =>
  mount(FeatherPopover, {
    props: {
      title: "hello world",
      placement,
    },
    slots: {
      default: getDefault(),
      trigger: getTrigger(),
    },
    attachTo: "body",
  });
const click = async (wrapper: ReturnType<typeof getWrapper>) => {
  await wrapper.find("button").trigger("click");
  await nextTick();
};

describe("FeatherPopover", () => {
  it("should not show a popover until click", () => {
    const wrapper = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should show a popover on click", async () => {
    jest.useFakeTimers();
    const wrapper = getWrapper();
    await click(wrapper);
    jest.runAllTimers();
    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should hide popover on escape", async () => {
    jest.useFakeTimers();
    const wrapper = getWrapper();
    await click(wrapper);
    jest.runAllTimers();
    await nextTick();
    await nextTick();
    await nextTick();

    const button = wrapper.find("button");
    await button.trigger("keydown", { code: Code.ESCAPE });

    expect(wrapper.element).toMatchSnapshot();
  });
});
