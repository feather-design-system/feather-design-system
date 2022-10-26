import { useScroll } from "./Scroll";
import { mount } from "@vue/test-utils";
import { ref, nextTick, Ref } from "vue";
import { expect, describe, it, vi } from "vitest";
const createWrapper = (setup) => {
  return mount({
    template: `<div></div>`,
    setup,
  });
};

describe("Scroll composable", () => {
  it("should debounce calls to the callback", async () => {
    const elRef = ref(document);
    const listener = vi.fn();
    vi.useFakeTimers();
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
    vi.runAllTimers();
    expect(listener).toHaveBeenCalledTimes(1);
  });
  it("should update the listener to new element when ref is updated", async () => {
    const el1 = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as HTMLElement;
    const el2 = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as HTMLElement;
    const elRef = ref(el1);
    const wrapper = createWrapper(() => {
      const active = useScroll(elRef, vi.fn());
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
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }) as unknown as Ref<HTMLElement>;

    let active;
    const wrapper = createWrapper(() => {
      active = useScroll(elRef, vi.fn());
    });
    await nextTick();
    expect(elRef.value.addEventListener).not.toHaveBeenCalled();
    active.value = true;
    await nextTick();
    expect(elRef.value.addEventListener).toHaveBeenCalled();
  });
  it("should remove events on unmount", async () => {
    const elRef = ref({
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }) as unknown as Ref<HTMLElement>;
    const wrapper = createWrapper(() => {
      const active = useScroll(elRef, vi.fn());
      active.value = true;
    });
    await nextTick();
    wrapper.unmount();
    expect(elRef.value.removeEventListener).toHaveBeenCalled();
  });
});
