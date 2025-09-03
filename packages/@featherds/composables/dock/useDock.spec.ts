import { mount } from "@vue/test-utils";
import { defineComponent, provide, ref, nextTick } from "vue";
import { useDock } from "./useDock";
import { describe, it, expect, vi } from "vitest";

// Local test helpers to reduce boilerplate in this spec
function makeDockRef(opts?: {
  id?: string;
  location?: string;
  isOpen?: boolean;
}) {
  const { id = "test-dock", location = "left", isOpen = true } = opts || {};
  return ref({ id, location, isOpen });
}

async function flushWatchers() {
  await nextTick();
  // allow microtask queue to run
  await new Promise((r) => setTimeout(r, 0));
}

function mountWithProvides(
  childSetupFn: () => any,
  provides: Record<string, any> = {}
) {
  const Child = defineComponent({
    setup() {
      return childSetupFn();
    },
    template: "<div />",
  });

  const Parent = defineComponent({
    components: { Child },
    setup() {
      Object.entries(provides).forEach(([k, v]) => provide(k, v));
      return {};
    },
    template: "<Child />",
  });

  return mount(Parent);
}

describe("useDock composable", () => {
  it("calls onDockClosed when the dock closes for the same id", async () => {
    const dockRef = makeDockRef({ id: "test-dock", isOpen: true });
    const closed = ref(false);

    mountWithProvides(
      () => {
        useDock({ onDockClosed: () => (closed.value = true) });
        return {};
      },
      { dockConfig: dockRef }
    );

    // initially not closed
    expect(closed.value).toBe(false);

    // close the dock for the same id
    dockRef.value.isOpen = false;

    await flushWatchers();

    expect(closed.value).toBe(true);
  });

  it("does not call onDockClosed when dock id does not match initial snapshot", async () => {
    const dockRef = makeDockRef({ id: "a", isOpen: true });
    const called = ref(false);

    mountWithProvides(
      () => {
        useDock({ onDockClosed: () => (called.value = true) });
        return {};
      },
      { dockConfig: dockRef }
    );

    // change the dock id before closing
    dockRef.value.id = "b";
    dockRef.value.isOpen = false;

    await flushWatchers();

    expect(called.value).toBe(false);
  });

  it("calls onToggleHoverOpen only on false->true transitions", async () => {
    const toggleRef = ref(false);
    const called = ref(0);

    mountWithProvides(
      () => {
        useDock({
          onToggleHoverOpen: () => (called.value += 1),
          immediateToggleWatch: true,
        });
        return {};
      },
      { toggleHovering: toggleRef }
    );

    // initial false -> true should fire
    toggleRef.value = true;
    await flushWatchers();
    expect(called.value).toBe(1);

    // true -> false should not fire
    toggleRef.value = false;
    await flushWatchers();
    expect(called.value).toBe(1);

    // false -> true should fire again
    toggleRef.value = true;
    await flushWatchers();
    expect(called.value).toBe(2);
  });

  it("stop() prevents further callbacks", async () => {
    const dockRef = makeDockRef({ id: "stop-test", isOpen: true });
    const called = ref(0);

    let stopFn: (() => void) | undefined;

    mountWithProvides(
      () => {
        const { stop } = useDock({ onDockClosed: () => (called.value += 1) });
        stopFn = stop;
        return {};
      },
      { dockConfig: dockRef }
    );

    // stop watchers
    stopFn?.();

    // mutate dock to closed
    dockRef.value.isOpen = false;
    await flushWatchers();

    expect(called.value).toBe(0);
  });

  it("provides safe defaults when no provider is present", async () => {
    const Child = defineComponent({
      setup() {
        const { dockConfig, isDocked, isDockCollapsed, stop } = useDock();
        return { dockConfig, isDocked, isDockCollapsed, stop };
      },
      template: "<div />",
    });

    const wrapper = mount(Child);

    // defaults should be present
    expect(wrapper.vm.dockConfig).toBeDefined();
    // VTU unwraps refs returned from setup, so we get the raw values on vm
    expect(wrapper.vm.dockConfig.id).toBe("none");
    expect(wrapper.vm.isDocked).toBe(false);
    expect(wrapper.vm.isDockCollapsed).toBe(false);

    // calling stop() should not throw
    expect(() => wrapper.vm.stop()).not.toThrow();
  });

  it("cleans up watchers on unmount (no callbacks after unmount)", async () => {
    const dockRef = makeDockRef({ id: "unmount-test", isOpen: true });
    const spy = vi.fn();

    const wrapper = mountWithProvides(
      () => {
        useDock({ onDockClosed: spy });
        return {};
      },
      { dockConfig: dockRef }
    );

    // unmount and then change dock - spy should not be called
    wrapper.unmount();

    dockRef.value.isOpen = false;
    await flushWatchers();

    expect(spy).not.toHaveBeenCalled();
  });

  it("respects custom provide keys for dockConfig", async () => {
    const dockRef = makeDockRef({ id: "custom-key", isOpen: true });
    const called = ref(false);

    mountWithProvides(
      () => {
        useDock({
          dockConfigKey: "myDock",
          onDockClosed: () => (called.value = true),
        });
        return {};
      },
      { myDock: dockRef }
    );

    dockRef.value.isOpen = false;
    await flushWatchers();

    expect(called.value).toBe(true);
  });
});
