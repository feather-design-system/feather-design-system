import { shallowMount } from "@vue/test-utils";
import FeatherSortHeader from "./FeatherSortHeader.vue";
import { SORT } from "../types/types";
import * as id from "@featherds/utils/id";

jest.spyOn(id, "getSafeId").mockImplementation((x) => x);
const PROPERTY = "test";

const getWrapper = function (options = {}) {
  options.props = {
    sort: SORT.ASCENDING,
    property: PROPERTY,
    ...options.props,
  };
  return shallowMount(FeatherSortHeader, options);
};

describe("FeatherSortHeader.vue", () => {
  it("should set aria-sort based on prop", async () => {
    const wrapper = getWrapper();
    expect(wrapper.wrapperElement).toMatchSnapshot();
    await wrapper.setProps({
      sort: SORT.DESCENDING,
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
    await wrapper.setProps({
      sort: SORT.NONE,
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should emit sort-changed when clicked", async () => {
    const wrapper = getWrapper();
    await wrapper.find("[role='button']").trigger("click");
    const firstEvent = wrapper.emitted("sort-changed")[0][0];
    expect(firstEvent.property).toBe(PROPERTY);
    expect(firstEvent.value).toBe(SORT.DESCENDING);

    await wrapper.setProps({
      sort: SORT.DESCENDING,
    });
    await wrapper.find("[role='button']").trigger("click");
    const secondEvent = wrapper.emitted("sort-changed")[1][0];
    expect(secondEvent.property).toBe(PROPERTY);
    expect(secondEvent.value).toBe(SORT.NONE);

    await wrapper.setProps({
      sort: SORT.NONE,
    });

    await wrapper.find("[role='button']").trigger("click");
    const thirdEvent = wrapper.emitted("sort-changed")[2][0];
    expect(thirdEvent.property).toBe(PROPERTY);
    expect(thirdEvent.value).toBe(SORT.ASCENDING);
  });
});
