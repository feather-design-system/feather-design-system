import FeatherPagination from "./FeatherPagination.vue";
import { shallowMount } from "@vue/test-utils";

const getWrapper = function (options = {}) {
  options.props = {
    pageSize: 10,
    ...options.props,
  };
  return shallowMount(FeatherPagination, options);
};

describe("FeatherPagination.vue", () => {
  it("should disable first and previous buttons on first page", () => {
    const wrapper = getWrapper({
      props: {
        modelValue: 1,
        total: 100,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should disable last and next buttons on last page", () => {
    const wrapper = getWrapper({
      props: {
        modelValue: 2,
        total: 20,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should emit update event when pageSize is changed", () => {
    const wrapper = getWrapper({
      props: {
        modelValue: 1,
        total: 100,
      },
    });
    wrapper.vm.updatePageSize({ _text: "20" });
    expect(wrapper.emitted("update:pageSize")[0][0]).toBe(20);
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(1);
  });
  it("should set page to 1 when first is clicked", () => {
    const wrapper = getWrapper({
      props: {
        modelValue: 4,
        total: 100,
      },
    });
    wrapper.vm.first();
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(1);
  });
  it("should set page to last possible page when last is clicked", () => {
    const wrapper = getWrapper({
      props: {
        modelValue: 4,
        total: 100,
      },
    });
    wrapper.vm.last();
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(10);
  });
  it("should increment page by one when next is clicked", () => {
    const wrapper = getWrapper({
      props: {
        modelValue: 4,
        total: 100,
      },
    });
    wrapper.vm.next();
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(5);
  });
  it("should decrement page by one when previous is clicked", () => {
    const wrapper = getWrapper({
      props: {
        modelValue: 4,
        total: 100,
      },
    });
    wrapper.vm.previous();
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(3);
  });
  it("should display the correct range text for first and second pages", async () => {
    const wrapper = getWrapper({
      props: {
        modelValue: 1,
        total: 100,
      },
    });
    expect(wrapper.vm.rangeText).toBe("1 - 10 of 100");
    await wrapper.setProps({
      modelValue: 2,
    });
    expect(wrapper.vm.rangeText).toBe("11 - 20 of 100");
  });
  it("should display the correct range text for the last page that is not a round value of page size", () => {
    const wrapper = getWrapper({
      props: {
        modelValue: 11,
        total: 103,
      },
    });
    expect(wrapper.vm.rangeText).toBe("101 - 103 of 103");
  });
});
