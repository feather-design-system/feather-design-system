import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import FeatherTooltip from "./FeatherTooltip.vue";
import * as id from "@featherds/utils/id";
import axe from "@featherds/utils/test/axe";
import { TooltipPlacement } from "../types";
jest.spyOn(id, "getSafeId").mockImplementation((x) => x);
const getDefault = () =>
  `<template #scoped="params">
  <button v-bind="params.attrs">TOOLTIP BUTTON</button>
  </template>
`;
const getWrapper = (placement = TooltipPlacement.top) =>
  mount(FeatherTooltip, {
    props: {
      title: "hello world",
      placement,
    },
    slots: {
      default: getDefault(),
    },
    attachTo: "body",
  });
const hover = async (wrapper: ReturnType<typeof getWrapper>) => {
  await wrapper.find("button").trigger("mouseenter");
  await nextTick();
};

const focus = async (wrapper: ReturnType<typeof getWrapper>) => {
  await wrapper.find("button").trigger("focus");
  await nextTick();
};
describe("FeatherTooltip", () => {
  it("should not show a tooltip until hover", () => {
    const wrapper = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should show a tooltip on hover", async () => {
    jest.useFakeTimers();
    const wrapper = getWrapper();
    await hover(wrapper);
    jest.runAllTimers();
    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should show a tooltip on focus", async () => {
    jest.useFakeTimers();
    const wrapper = getWrapper();
    await focus(wrapper);
    jest.runAllTimers();
    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should hide tooltip on escape", async () => {
    jest.useFakeTimers();
    const wrapper = getWrapper();
    await focus(wrapper);
    jest.runAllTimers();
    await nextTick();
    await nextTick();
    await nextTick();
    await wrapper.find("button").trigger("keydown.esc");
    expect(wrapper.element).toMatchSnapshot();
  });
});
