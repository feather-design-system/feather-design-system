import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import FeatherTooltip from "./FeatherTooltip.vue";
import * as id from "@featherds/utils/id";
import { PopoverPlacement } from "@featherds/popover";
import { Code } from "@featherds/utils/keys";
import { vi, expect, describe, it } from "vitest";
vi.spyOn(id, "getSafeId").mockImplementation((x) => x);
const getDefault = () =>
  `<template #scoped="params">
  <button v-bind="params.attrs" v-on="params.on">TOOLTIP BUTTON</button>
  </template>
`;
const getWrapper = (placement = PopoverPlacement.top) =>
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
    vi.useFakeTimers();
    const wrapper = getWrapper();
    await hover(wrapper);
    vi.runAllTimers();
    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should show a tooltip on focus", async () => {
    vi.useFakeTimers();
    const wrapper = getWrapper();
    await focus(wrapper);
    vi.runAllTimers();
    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should hide tooltip on escape", async () => {
    vi.useFakeTimers();
    const wrapper = getWrapper();
    await focus(wrapper);
    vi.runAllTimers();
    await nextTick();
    await nextTick();
    await nextTick();

    const button = wrapper.find("button");
    await button.trigger("keydown", { code: Code.ESCAPE });

    expect(wrapper.element).toMatchSnapshot();
  });
});
