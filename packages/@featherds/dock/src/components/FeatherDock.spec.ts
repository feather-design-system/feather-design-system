import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import FeatherDock from "./FeatherDock.vue";

describe("FeatherDock", () => {
  let wrapper: any = null;

  beforeEach(() => {
    wrapper = mount(FeatherDock as unknown as any, {
      props: {
        id: "test-dock",
        modelValue: false,
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    if (wrapper) wrapper.unmount();
    wrapper = null;
  });

  it('reflects the open property to the "open" attribute (via aria-expanded/class)', async () => {
    if (!wrapper) throw new Error("wrapper not mounted");

    // set open -> toggle button aria-expanded should be "true" and root should have dock-open class
    await wrapper.setProps({ modelValue: true });
    await nextTick();

    const toggle = wrapper.find('[data-ref-id="feather-dock-toggle"]');
    expect(toggle.exists()).toBe(true);
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(wrapper.classes()).toContain("dock-open");

    // unset open -> aria-expanded should be "false" and class removed
    await wrapper.setProps({ modelValue: false });
    await nextTick();
    expect(toggle.attributes("aria-expanded")).toBe("false");
    expect(wrapper.classes()).not.toContain("dock-open");
  });

  it("emits update events with the new state when toggled", async () => {
    if (!wrapper) throw new Error("wrapper not mounted");

    const toggle = wrapper.find('[data-ref-id="feather-dock-toggle"]');
    expect(toggle.exists()).toBe(true);

    // ensure starting state
    await wrapper.setProps({ modelValue: false });
    await nextTick();

    // click the toggle button
    await toggle.trigger("click");
    await nextTick();

    // component should emit update:modelValue with true and update:dock-expanded
    expect(wrapper.emitted("update:modelValue")?.[0]?.[0]).toBe(true);
    expect(wrapper.emitted("update:dock-expanded")).toBeTruthy();
    // aria and classes should reflect new state
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(wrapper.classes()).toContain("dock-open");
  });

  it("updates internal state when external prop changes without emitting update events", async () => {
    if (!wrapper) throw new Error("wrapper not mounted");

    // Ensure no emits initially
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();

    // Change the prop externally and expect the component to reflect the change
    await wrapper.setProps({ modelValue: true });
    await nextTick();

    const toggle = wrapper.find('[data-ref-id="feather-dock-toggle"]');
    expect(toggle.attributes("aria-expanded")).toBe("true");

    // Changing the prop should not cause the component to emit an update back to the parent
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("computes and exposes expanded/collapsed widths and dockWidth reacts to modelValue", async () => {
    // mount with explicit width props
    const w = mount(FeatherDock as unknown as any, {
      props: {
        id: "width-dock",
        modelValue: true,
        expandedWidth: "420px",
        collapsedWidth: "48px",
      },
    });

    // expandedWidthPx / collapsedWidthPx should reflect the px values
    expect(w.vm.expandedWidthPx).toBe("420px");
    expect(w.vm.collapsedWidthPx).toBe("48px");

    // dockWidth should reflect expandedWidth when modelValue=true
    expect(w.vm.dockWidth).toBe("420px");

    // collapse and assert dockWidth changes
    await w.setProps({ modelValue: false });
    await nextTick();
    expect(w.vm.dockWidth).toBe("48px");

    w.unmount();
  });

  it("closes on Escape key and focuses the toggle button", async () => {
    // mount open
    const w = mount(FeatherDock as unknown as any, {
      attachTo: document.body,
      props: { id: "kbd-dock", modelValue: true },
    });

    // Wait for DOM to be updated and for the component to mount into document
    await nextTick();

    // The component's handler queries the document by id, so spy the actual DOM element
    const docToggleEl = document.querySelector(
      `#kbd-dock .feather-dock-toggle`
    ) as HTMLElement | null;
    expect(docToggleEl).toBeTruthy();
    const focusSpy = vi.fn();
    if (docToggleEl) docToggleEl.focus = focusSpy as unknown as () => void;

    // dispatch Escape keydown on document
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await nextTick();

    // component should emit closing events
    expect(w.emitted("update:modelValue")?.[0]?.[0]).toBe(false);
    expect(w.emitted("update:dock-collapsed")).toBeTruthy();

    // focus should have been called on the toggle button
    expect(focusSpy).toHaveBeenCalled();

    w.unmount();
  });
});
