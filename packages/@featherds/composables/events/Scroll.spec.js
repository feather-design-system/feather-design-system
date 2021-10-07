import { useScroll } from "./Scroll";
import { mount } from "@vue/test-utils";
import { ref, nextTick } from "vue";

const createWrapper = (setup) => {
  return mount({
    template: `<div></div>`,
    setup,
  });
};

describe("Scroll composable", () => {
  it("should debounce calls to the callback", async () => {
    const elRef = ref(document);
    const listener = jest.fn();
    jest.useFakeTimers();
    const wrapper = createWrapper(() => {
      const active = useScroll(elRef, listener);
      active.value = true;
    });
    await nextTick();

    //fake call
    const event1 = new Event("scroll");
    const event2 = new Event("scroll");
    document.dispatchEvent(event1);
    document.dispatchEvent(event2);
    jest.runAllTimers();
    expect(listener).toHaveBeenCalledTimes(1);
  });
  it("should update the listener to new element when ref is updated", async () => {
    const el1 = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    const el2 = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    const elRef = ref(el1);
    const wrapper = createWrapper(() => {
      const active = useScroll(elRef, jest.fn());
      active.value = true;
    });
    await nextTick();
    expect(el1.addEventListener).toHaveBeenCalled();
    elRef.value = el2;
    await nextTick();
    expect(el1.removeEventListener).toHaveBeenCalled();
    expect(el2.addEventListener).toHaveBeenCalled();
  });
  it("should only add event listener when active is set to true", async () => {
    const elRef = ref({
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });

    let active;
    const wrapper = createWrapper(() => {
      active = useScroll(elRef, jest.fn());
    });
    await nextTick();
    expect(elRef.value.addEventListener).not.toHaveBeenCalled();
    active.value = true;
    await nextTick();
    expect(elRef.value.addEventListener).toHaveBeenCalled();
  });
  it("should remove events on unmount", async () => {
    const elRef = ref({
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
    const wrapper = createWrapper(() => {
      const active = useScroll(elRef, jest.fn());
      active.value = true;
    });
    await nextTick();
    wrapper.unmount();
    expect(elRef.value.removeEventListener).toHaveBeenCalled();
  });
});
