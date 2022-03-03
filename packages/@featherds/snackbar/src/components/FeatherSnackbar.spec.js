import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import FeatherSnackbar from "./FeatherSnackbar.vue";
import axe from "@featherds/utils/test/axe";

const slots = {
  default: {
    template: `This is a test`,
  },
  button: {
    template: `<button>Click me</button>`,
  },
};

const getprops = (modelValue, center = false, error = false) => ({
  modelValue,
  center,
  error,
});

const getWrapper = function (options) {
  return mount(FeatherSnackbar, options);
};

describe("FeatherSnackbar.vue", () => {
  it("should show snackbar and auto-close", async () => {
    jest.useFakeTimers();

    const wrapper = getWrapper({ props: getprops(false), slots });
    expect(wrapper.find(".feather-snackbar-wrapper").exists()).toBe(false);

    await wrapper.setProps({ modelValue: true });
    await nextTick();
    await nextTick();
    expect(wrapper.find(".feather-snackbar-wrapper").exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();

    jest.runAllTimers();
    await nextTick();
    expect(wrapper.vm.internalValue).toBe(false);
    const events = wrapper.emitted("update:modelValue");
    expect(events.length).toBe(1);
  });

  it("should close when ESC is pressed", async () => {
    jest.useFakeTimers();
    const wrapper = getWrapper({ props: getprops(true), slots });
    const snackbar = wrapper.find(".feather-snackbar");
    await snackbar.trigger("keydown.esc");

    jest.runAllTimers();
    await nextTick();

    expect(wrapper.vm.internalValue).toBe(false);
    const events = wrapper.emitted("update:modelValue");
    expect(events.length).toBe(1);
  });

  it("should stop the timer when mouseover occurs and restart when mouseleave", async () => {
    const wrapper = getWrapper({ props: getprops(true), slots });
    const snackbar = wrapper.find(".feather-snackbar");
    await nextTick();

    const stopTimerSpy = jest.spyOn(wrapper.vm, "stopTimer");
    const resumeTimerSpy = jest.spyOn(wrapper.vm, "resumeTimer");

    await snackbar.trigger("mouseover");
    expect(stopTimerSpy).toBeCalled();

    await snackbar.trigger("mouseleave");
    expect(resumeTimerSpy).toBeCalled();
  });

  it("should assign classes correctly", async () => {
    jest.useFakeTimers();
    const wrapper = getWrapper({ props: getprops(true, true, true), slots });
    const snackbar = wrapper.find(".feather-snackbar");
    await nextTick();

    expect(snackbar.element.classList.contains("center")).toBe(true);
    expect(snackbar.element.classList.contains("error")).toBe(true);
  });

  it("should be accessible when open", async () => {
    jest.useRealTimers();
    const wrapper = getWrapper({ props: getprops(true), slots });
    await nextTick();
    expect(await axe(wrapper.element)).toHaveNoViolations();
  }, 60000);
});
