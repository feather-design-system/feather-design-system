import AutocompleteResults from "./AutocompleteResults.vue";
import { FeatherListItem } from "@featherds/list";
import { shallowMount } from "@vue/test-utils";
import { getCalls } from "@featherds/utils/test/calls";
import { expect, describe, it } from "vitest";
const activeId = "ACTIVE";
const items = [
  {
    _text: "Test1",
  },
  {
    _text: "Test2",
  },
  {
    _text: "Test3",
  },
  {
    _text: "Test4",
  },
];
const getProps = (props: Record<string, unknown> = {}) => {
  return {
    activeId,
    items: items.slice(0),
    query: "t",
    ...props,
  };
};

const getWrapper = function (options: Record<string, unknown> = {}) {
  options.props = getProps(options.props as Record<string, unknown>);
  return shallowMount(AutocompleteResults, options);
};

describe("Autocomplete Results", () => {
  it("should support single select", () => {
    const wrapper = getWrapper({
      props: {
        single: true,
        activeIndex: -1,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should support no item active", () => {
    const wrapper = getWrapper({
      props: {
        activeIndex: -1,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should support active index being out of range", () => {
    const wrapper = getWrapper({
      props: {
        activeIndex: items.length + 1,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should support active index within results range", () => {
    const wrapper = getWrapper({
      props: {
        activeIndex: 0,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should mark items as selected that appear in value array", () => {
    const wrapper = getWrapper({
      props: {
        activeIndex: -1,
        value: [items[0]],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should mark items as selected that appear in value array and active when active index is set.", () => {
    const wrapper = getWrapper({
      props: {
        activeIndex: 0,
        value: [items[0]],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should emit select event with item when item is clicked", async () => {
    const wrapper = getWrapper({
      props: {
        activeIndex: -1,
      },
    });
    await wrapper.findComponent(FeatherListItem).trigger("click");
    expect(getCalls<[{ _text: string }]>(wrapper, "select")[0]![0]._text).toBe(
      items[0]!._text
    );
  });
});
