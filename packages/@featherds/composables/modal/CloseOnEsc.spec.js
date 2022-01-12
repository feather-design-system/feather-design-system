import { useCloseOnEsc } from "./CloseOnEsc";
import { mount } from "@vue/test-utils";
import { ref, nextTick } from "vue";
import { KEYCODES } from "@featherds/utils/keys";

const createWrapper = (setup) => {
  return mount({
    template: `<div></div>`,
    setup,
  });
};

describe("Close On Escape composable", () => {
  it("should only attach listeners when visible", async () => {
    const documentSpy = jest.spyOn(document, "addEventListener");
    const visible = ref(false);
    const wrapper = createWrapper(() => {
      useCloseOnEsc(visible);
    });
    await nextTick();
    expect(documentSpy).not.toHaveBeenCalled();

    visible.value = true;
    await nextTick();
    expect(documentSpy).toHaveBeenCalled();
  });
  it("should remove listeners when visible is false", async () => {
    const documentSpy = jest.spyOn(document, "removeEventListener");
    const visible = ref(true);
    const wrapper = createWrapper(() => {
      useCloseOnEsc(visible);
    });
    await nextTick();
    expect(documentSpy).not.toHaveBeenCalled();
    visible.value = false;
    await nextTick();
    expect(documentSpy).toHaveBeenCalled();
  });
  it("should only call callback when an element outside is clicked", async () => {
    const visible = ref(false);
    let active;
    const wrapper = createWrapper(() => {
      active = useCloseOnEsc(visible);
    });
    await nextTick();
    visible.value = true;
    await nextTick();

    const event = new KeyboardEvent("keydown", {
      keyCode: KEYCODES.ESCAPE,
      view: window,
      bubbles: true,
      cancelable: false,
    });
    document.body.dispatchEvent(event);

    await nextTick();
    await nextTick();

    expect(active.value).toBe(true);
  });

  it("should remove listeners on unmount", async () => {
    const documentSpy = jest.spyOn(document, "removeEventListener");
    const visible = ref(true);
    const wrapper = createWrapper(() => {
      useCloseOnEsc(visible);
    });
    await nextTick();

    wrapper.unmount();

    expect(documentSpy).toHaveBeenCalled();
  });
});
