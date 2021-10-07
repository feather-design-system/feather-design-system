import { nextTick } from "vue";
import { useResize } from "./Resize";
import { mount } from "@vue/test-utils";

const createWrapper = (setup) => {
  return mount({
    template: `<div></div>`,
    setup,
  });
};

describe("Resize composable", () => {
  it("should debounce calls to the callback", async () => {
    const listener = jest.fn();

    jest.useFakeTimers();
    const wrapper = createWrapper(() => {
      const active = useResize(listener);
      active.value = true;
    });
    await nextTick();

    //fake call
    const event1 = new Event("resize");
    const event2 = new Event("resize");
    window.dispatchEvent(event1);
    window.dispatchEvent(event2);

    jest.runAllTimers();
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("should only add event listener when active is set to true", async () => {
    const spy = spyOn(window, "addEventListener");
    const listener = jest.fn();

    let active;
    const wrapper = createWrapper(() => {
      active = useResize(listener);
    });

    await nextTick();
    expect(spy).not.toHaveBeenCalled();
    active.value = true;
    await nextTick();
    expect(spy).toHaveBeenCalled();
  });
  it("should remove events on unmount", async () => {
    const spy = spyOn(window, "removeEventListener");
    const wrapper = createWrapper(() => {
      const active = useResize(jest.fn());
      active.value = true;
    });
    await nextTick();
    wrapper.unmount();
    expect(spy).toHaveBeenCalled();
  });
});
