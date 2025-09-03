import { ref, nextTick, defineComponent } from "vue";
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    // ensure clean storage and timers for each test
    localStorage.clear();
    vi.useRealTimers();
  });

  afterEach(() => {
    // restore any spies/mocks and timers
    vi.restoreAllMocks();
    vi.useRealTimers();
  });
  it("initializes from the provided ref and persists changes to localStorage", async () => {
    // clean slate
    localStorage.clear();

    const key = "test-use-local-storage-key";

    const TestComp = defineComponent({
      props: { _initial: { type: String, required: true } },
      setup(props) {
        const r = ref<string>(props._initial);
        useLocalStorage<string>(key, r);
        return { r };
      },
      template: `<div />`,
    });

    const wrapper = mount(TestComp, { props: { _initial: "hello" } });
    // wait for post-flush watcher
    await nextTick();
    expect(localStorage.getItem(key)).toBe(JSON.stringify("hello"));

    // update the ref via the component instance and assert persistence
    (wrapper.vm as any).r = "world";
    await nextTick();
    expect(localStorage.getItem(key)).toBe(JSON.stringify("world"));

    wrapper.unmount();
  });
  it("updates ref on storage events from other contexts and ignores removals", async () => {
    const key = "sync-key";

    const TestComp = defineComponent({
      setup() {
        const r = ref("x");
        useLocalStorage<string>(key, r);
        return { r };
      },
      template: `<div />`,
    });

    const wrapper = mount(TestComp);

    // simulate other tab writing a JSON value
    const newVal = JSON.stringify("y");
    window.dispatchEvent(
      new StorageEvent("storage", { key, newValue: newVal })
    );
    await nextTick();
    expect((wrapper.vm as any).r).toBe("y");

    // simulate removal (should NOT change consumer ref)
    window.dispatchEvent(new StorageEvent("storage", { key, newValue: null }));
    await nextTick();
    expect((wrapper.vm as any).r).toBe("y");

    wrapper.unmount();
  });
  it("persists boolean values to localStorage", async () => {
    const key = "bool-key";
    localStorage.removeItem(key);

    const TestComp = defineComponent({
      setup() {
        const r = ref<boolean>(true);
        useLocalStorage<boolean>(key, r);
        return { r };
      },
      template: `<div />`,
    });

    const wrapper = mount(TestComp);
    await nextTick();

    // initial true should be stored as JSON true
    expect(localStorage.getItem(key)).toBe(JSON.stringify(true));

    // toggle to false and assert persistence
    (wrapper.vm as any).r = false;
    await nextTick();
    expect(localStorage.getItem(key)).toBe(JSON.stringify(false));

    wrapper.unmount();
  });
  it("persists numeric values to localStorage", async () => {
    const key = "num-key";
    localStorage.removeItem(key);

    const TestComp = defineComponent({
      setup() {
        const r = ref<number>(42);
        useLocalStorage<number>(key, r);
        return { r };
      },
      template: `<div />`,
    });

    const wrapper = mount(TestComp);
    await nextTick();

    // initial number should be stored as JSON
    expect(localStorage.getItem(key)).toBe(JSON.stringify(42));

    // change number and assert persistence
    (wrapper.vm as any).r = 7;
    await nextTick();
    expect(localStorage.getItem(key)).toBe(JSON.stringify(7));

    wrapper.unmount();
  });
  it("persists object values to localStorage", async () => {
    const key = "obj-key";
    localStorage.removeItem(key);

    const TestComp = defineComponent({
      setup() {
        const r = ref({ a: 1, b: "x" });
        useLocalStorage<typeof r.value>(key, r);
        return { r };
      },
      template: `<div />`,
    });

    const wrapper = mount(TestComp);
    await nextTick();

    expect(localStorage.getItem(key)).toBe(JSON.stringify({ a: 1, b: "x" }));

    // replace the object and assert persistence
    (wrapper.vm as any).r = { a: 2, b: "y" };
    await nextTick();
    expect(localStorage.getItem(key)).toBe(JSON.stringify({ a: 2, b: "y" }));

    wrapper.unmount();
  });
  it("initializes from existing localStorage value", async () => {
    const key = "init-key";
    localStorage.setItem(key, JSON.stringify("stored"));

    const TestComp = defineComponent({
      setup() {
        const r = ref("initial");
        useLocalStorage<string>(key, r);
        return { r };
      },
      template: `<div />`,
    });

    const wrapper = mount(TestComp);
    await nextTick();

    expect((wrapper.vm as any).r).toBe("stored");

    wrapper.unmount();
    localStorage.removeItem(key);
  });

  it("is SSR-safe when localStorage is missing", async () => {
    const origLS = (window as any).localStorage;
    try {
      // remove localStorage to simulate SSR environment
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete (window as any).localStorage;

      const key = "ssr-key";
      const TestComp = defineComponent({
        setup() {
          const r = ref("x");
          const ret = useLocalStorage<string>(key, r);
          return { r, rawGet: ret.rawGet };
        },
        template: `<div />`,
      });

      const wrapper = mount(TestComp);
      await nextTick();

      expect((wrapper.vm as any).rawGet()).toBeNull();

      wrapper.unmount();
    } finally {
      // restore
      (window as any).localStorage = origLS;
    }
  });

  it("falls back to raw string on JSON parse error", async () => {
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      const key = "parse-key";
      localStorage.setItem(key, "not-json");

      const TestComp = defineComponent({
        setup() {
          const r = ref("init");
          useLocalStorage<string>(key, r);
          return { r };
        },
        template: `<div />`,
      });

      const wrapper = mount(TestComp);
      await nextTick();

      expect((wrapper.vm as any).r).toBe("not-json");

      wrapper.unmount();
      localStorage.removeItem(key);
    } finally {
      errSpy.mockRestore();
    }
  });

  it("respects debounce option and cancels pending write on unmount", async () => {
    vi.useFakeTimers();
    const key = "debounce-key";
    localStorage.removeItem(key);

    // use direct localStorage checks instead of spying on setItem which may
    // not be reliable in some JSDOM environments

    const TestComp = defineComponent({
      setup() {
        const r = ref<string>("a");
        useLocalStorage<string>(key, r, { debounce: 200 });
        return { r };
      },
      template: `<div />`,
    });

    const wrapper = mount(TestComp);
    await nextTick();

    // initial write may be scheduled; clear previous calls to focus on our changes
    // change value and advance timers to trigger write
    (wrapper.vm as any).r = "b";
    await nextTick();
    vi.advanceTimersByTime(200);
    await nextTick();
    expect(localStorage.getItem(key)).toBe(JSON.stringify("b"));

    // now change again but unmount before debounce fires
    // now change again but unmount before debounce fires; value should remain "b"
    (wrapper.vm as any).r = "c";
    await nextTick();
    wrapper.unmount();
    vi.advanceTimersByTime(200);
    await nextTick();
    expect(localStorage.getItem(key)).toBe(JSON.stringify("b"));

    vi.useRealTimers();
  });

  it("registers and removes storage event listeners on mount/unmount", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const key = "listener-key";
    const TestComp = defineComponent({
      setup() {
        const r = ref("x");
        useLocalStorage<string>(key, r);
        return { r };
      },
      template: `<div />`,
    });

    const wrapper = mount(TestComp);
    expect(addSpy).toHaveBeenCalledWith("storage", expect.any(Function));

    wrapper.unmount();
    expect(removeSpy).toHaveBeenCalledWith("storage", expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
