import SpinButton from "./SpinButton.vue";
import { mount } from "@vue/test-utils";
import { Code } from "@featherds/utils/keys";
import { getCalls } from "@featherds/utils/test/calls";

const getWrapper = function (options: Record<string, any>) {
  return mount(SpinButton, options);
};

const setValue = async (
  wrapper: ReturnType<typeof getWrapper>,
  str: string
) => {
  await wrapper.trigger("focus");
  const chars = str.split("");
  return chars.reduce((prev, curr) => {
    return prev.then(() => {
      return wrapper.find("span").trigger("keydown", {
        key: curr,
      });
    });
  }, Promise.resolve());
};
const getValue = (wrapper: ReturnType<typeof getWrapper>) => {
  return wrapper.find("span").element.textContent;
};

describe("SpinButton.vue", () => {
  it("should render correctly", () => {
    const wrapper = getWrapper({
      props: {
        min: 0,
        max: 10,
        modelValue: 4,
        label: "Test",
        placeholder: "dd",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render placeholder when there is no value", () => {
    const wrapper = getWrapper({
      props: {
        min: 0,
        max: 10,
        label: "Test",
        placeholder: "dd",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render disabled", () => {
    const wrapper = getWrapper({
      propsData: {
        min: 0,
        max: 10,
        label: "Test",
        placeholder: "dd",
        disabled: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should add 0s for 1000 ", async () => {
    const wrapper = getWrapper({
      props: {
        min: 0,
        max: 1000,
        modelValue: 4,
        label: "Test",
        placeholder: "dd",
      },
    });
    expect(getValue(wrapper)).toBe("0004");

    await wrapper.setProps({
      max: 1000,
      modelValue: 32,
    });
    expect(getValue(wrapper)).toBe("0032");

    await wrapper.setProps({
      max: 100,
      modelValue: 3,
    });
    expect(getValue(wrapper)).toBe("003");

    await wrapper.setProps({
      max: 10,
      modelValue: 2,
    });
    expect(getValue(wrapper)).toBe("02");
  });
  it("should emit next when a user cannot type any more values to match the current range", async () => {
    const wrapper = getWrapper({
      props: {
        min: 1,
        max: 1000,
        label: "Test",
        placeholder: "dd",
      },
    });
    await setValue(wrapper, "200");
    expect(getCalls<[unknown]>(wrapper, "next").length).toBe(1);

    await setValue(wrapper, "99");
    expect(getCalls<[unknown]>(wrapper, "next").length).toBe(1);

    await setValue(wrapper, "909");
    expect(getCalls<[unknown]>(wrapper, "next").length).toBe(2);

    await wrapper.setProps({
      max: 31,
    });
    await setValue(wrapper, "3");
    expect(getCalls<[unknown]>(wrapper, "next").length).toBe(2);
    await setValue(wrapper, "31");
    expect(getCalls<[unknown]>(wrapper, "next").length).toBe(3);
    await setValue(wrapper, "0001");
    expect(getCalls<[unknown]>(wrapper, "next").length).toBe(4);
  });
  it("should emit update models when value is input", async () => {
    const wrapper = getWrapper({
      props: {
        min: 5,
        max: 1000,
        label: "Test",
        placeholder: "dd",
      },
    });
    await setValue(wrapper, "1");
    expect(getCalls<[number]>(wrapper, "update:modelValue").length).toBe(1);
    expect(
      getCalls<[unknown]>(wrapper, "update:modelValue")[0][0]
    ).toBeUndefined();

    await setValue(wrapper, "009");
    expect(getCalls<[number]>(wrapper, "update:modelValue")[3][0]).toBe(9); //one for each char
  });
  it("should clear value when delete is pressed", async () => {
    const wrapper = getWrapper({
      propsData: {
        modelValue: 11,
        min: 5,
        max: 1000,
        label: "Test",
        placeholder: "dd",
      },
    });

    const span = wrapper.find("span");
    await span.trigger("keydown", { code: Code.DELETE });

    expect(
      getCalls<[unknown]>(wrapper, "update:modelValue")[0][0]
    ).toBeUndefined();
    await wrapper.setProps({
      modelValue: getCalls<[unknown]>(wrapper, "update:modelValue")[0][0],
    });
    expect(getValue(wrapper)).toBe("dd");
  });
  it("should clear input when no character is typed", async () => {
    const wrapper = getWrapper({
      propsData: {
        modelValue: 11,
        min: 5,
        max: 1000,
        label: "Test",
        placeholder: "dd",
      },
    });

    const span = wrapper.find("span");
    await span.trigger("keydown", { code: Code.BACKSPACE });

    expect(
      getCalls<[unknown]>(wrapper, "update:modelValue")[0][0]
    ).toBeUndefined();
    await wrapper.setProps({
      modelValue: getCalls<[unknown]>(wrapper, "update:modelValue")[0][0],
    });
    expect(getValue(wrapper)).toBe("dd");
  });
  it("should clear last character typed when backspace is pressed", async () => {
    const wrapper = getWrapper({
      propsData: {
        modelValue: 11,
        min: 5,
        max: 1000,
        label: "Test",
        placeholder: "dd",
      },
    });

    await wrapper.find("span").trigger("keydown", {
      key: "1",
    });
    await wrapper.find("span").trigger("keydown", {
      key: "1",
    });
    await wrapper.find("span").trigger("keydown", {
      key: "9",
    });

    expect(getCalls<[number]>(wrapper, "update:modelValue")[2][0]).toBe(119);

    const span = wrapper.find("span");
    await span.trigger("keydown", { code: Code.BACKSPACE });

    expect(getCalls<[number]>(wrapper, "update:modelValue")[3][0]).toBe(11);
    expect(getValue(wrapper)).toBe("0011");
  });
});
