import AutocompleteResultsGrid from "./AutocompleteResultsGrid.vue";
import { shallowMount, config as testUtilsConfig } from "@vue/test-utils";

testUtilsConfig.renderStubDefaultSlot = true;

const activeId = "ACTIVE";
const items = [
  {
    text: "Test1",
    number: 1,
  },
  {
    text: "Test2",
    number: 2,
  },
  {
    text: "Test3",
    number: 3,
  },
  {
    text: "Test4",
    number: 4,
  },
];
const config = [
  { title: "TEXT", prop: "text" },
  { title: "NUMBER", prop: "number", align: "right" },
];
const getProps = (props) => {
  return {
    activeId,
    config,
    query: "t",
    items: items.slice(0),
    ...props,
  };
};

const getWrapper = function (options = {}) {
  options.props = getProps(options.props || {});
  return shallowMount(AutocompleteResultsGrid, options);
};

describe("Autocomplete Results Grid", () => {
  it("should support single select", () => {
    const wrapper = getWrapper({
      props: {
        single: true,
        activeRow: -1,
        activeCol: -1,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should support no item active", () => {
    const wrapper = getWrapper({
      props: {
        activeRow: -1,
        activeCol: -1,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should support active index being out of range", () => {
    const wrapper = getWrapper({
      props: {
        activeRow: items.length + 1,
        activeCol: -1,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should support active index within results range", () => {
    const wrapper = getWrapper({
      props: {
        activeRow: 0,
        activeCol: 0,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should mark items as selected that appear in value array", () => {
    const wrapper = getWrapper({
      props: {
        activeRow: -1,
        activeCol: -1,
        value: [items[0]],
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should mark items as selected that appear in value array and active when active index is set.", () => {
    const wrapper = getWrapper({
      props: {
        activeRow: 0,
        activeCol: 0,
        value: [items[0]],
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
});
