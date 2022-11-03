import { useOutsideClick } from "./OutsideClick";
import { mount } from "@vue/test-utils";
import { ref, nextTick } from "vue";
import { vi, expect, describe, it } from "vitest";
const createWrapper = (setup) => {
  return mount({
    template: `<div></div>`,
    setup,
  });
};

describe("Scroll composable", () => {
  it("should only attach listeners when element and active", async () => {
    const windowSpy = vi.spyOn(window, "addEventListener");
    const documentSpy = vi.spyOn(document, "addEventListener");
    const el = document.createElement("div");
    document.body.appendChild(el);
    const elRef = ref(el);
    let active;
    const wrapper = createWrapper(() => {
      active = useOutsideClick(elRef, vi.fn());
    });
    await nextTick();
    expect(windowSpy).not.toHaveBeenCalled();
    expect(documentSpy).not.toHaveBeenCalled();

    active.value = true;
    await nextTick();
    expect(windowSpy).toHaveBeenCalled();
    expect(documentSpy).toHaveBeenCalled();
  });
  it("should only call callback when an element outside is clicked", async () => {
    const el = document.createElement("div");
    el.classList.add("test");
    document.body.appendChild(el);
    const elRef = ref(el);
    const listener = vi.fn();
    const wrapper = createWrapper(() => {
      const active = useOutsideClick(elRef, listener);
      active.value = true;
    });
    await nextTick();

    let event = new MouseEvent("click", {
      bubbles: true,
      cancelable: false,
    });
    document.body.dispatchEvent(event);

    await nextTick();

    expect(listener).toHaveBeenCalledTimes(1);

    event = new MouseEvent("click", {
      bubbles: true,
      cancelable: false,
    });
    document.querySelector("div.test").dispatchEvent(event);

    await nextTick();

    expect(listener).toHaveBeenCalledTimes(1);
  });
  it("should remove listeners when active is false", async () => {
    const windowSpy = vi.spyOn(window, "removeEventListener");
    const documentSpy = vi.spyOn(document, "removeEventListener");
    const el = document.createElement("div");
    document.body.appendChild(el);
    const elRef = ref(el);
    let active;
    const wrapper = createWrapper(() => {
      active = useOutsideClick(elRef, vi.fn());
      active.value = true;
    });
    await nextTick();

    active.value = false;
    await nextTick();

    expect(windowSpy).toHaveBeenCalled();
    expect(documentSpy).toHaveBeenCalled();
  });
  it("should remove listeners on unmount", async () => {
    const windowSpy = vi.spyOn(window, "removeEventListener");
    const documentSpy = vi.spyOn(document, "removeEventListener");
    const el = document.createElement("div");
    document.body.appendChild(el);
    const elRef = ref(el);
    let active;
    const wrapper = createWrapper(() => {
      active = useOutsideClick(elRef, vi.fn());
      active.value = true;
    });
    await nextTick();

    wrapper.unmount();

    expect(windowSpy).toHaveBeenCalled();
    expect(documentSpy).toHaveBeenCalled();
  });
});
