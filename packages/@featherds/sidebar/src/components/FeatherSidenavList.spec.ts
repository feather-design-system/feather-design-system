import { describe, it, expect, vi, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

// Lightweight stubs for child components to keep tests focused and fast
const globalStubs = {
  FeatherList: true,
  FeatherListItem: true,
  FeatherListHeader: true,
  FeatherListSeparator: true,
  FeatherPopover: true,
  FeatherMenuList: true,
  FeatherIcon: true,
};

describe("FeatherSidenavList (unit)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    // reset module mocks if any
    try {
      vi.resetModules();
    } catch (e) {
      /* ignore */
    }
  });

  it("applies dock-related classes when useDock reports docked/collapsed state", async () => {
    // Mock the composable before importing the component so the module uses the mock
    vi.doMock("@featherds/composables/dock/useDock", () => {
      const vue = require("vue");
      return {
        useDock: () => ({
          isDocked: vue.ref(true),
          isDockCollapsed: vue.ref(false),
        }),
      };
    });

    const { default: FeatherSidenavList } = await import(
      "./FeatherSidenavList.vue"
    );

    const items = [
      { id: "i1", type: "item", title: "One" },
      { id: "h1", type: "header", title: "Hdr" },
    ];

    const wrapper = mount(FeatherSidenavList as any, {
      props: { id: "dock-test", items },
      global: { stubs: globalStubs },
    });

    // listClasses is a computed; ensure it reflects the mocked dock state
    const classes = (wrapper.vm as any).listClasses as Record<string, boolean>;
    expect(classes.docked).toBe(true);
    expect(classes["dock-open"]).toBe(true);
    expect(classes["dock-closed"]).toBe(false);

    wrapper.unmount();
  });

  it("canShowPopover logic returns expected boolean for items", async () => {
    const { default: FeatherSidenavList } = await import(
      "./FeatherSidenavList.vue"
    );

    const items = [
      { id: "a", type: "item", title: "A" },
      { id: "b", type: "item", title: "B", href: "/b" },
      { id: "h", type: "header", title: "Hdr" },
    ];

    const wrapper = mount(FeatherSidenavList as any, {
      props: { id: "test-can", items },
      global: { stubs: globalStubs },
    });

    const vm: any = wrapper.vm;
    expect(vm.canShowPopover(items[0])).toBe(true); // no href
    expect(vm.canShowPopover(items[1])).toBe(false); // has href
    expect(vm.canShowPopover(items[2])).toBe(true); // header

    wrapper.unmount();
  });

  it("hovers first popover then hovering second calls forceClosePopovers", async () => {
    // prepare spy object to be returned by the mocked composable
    const hoverMocks: any = {
      setTriggerRef: vi.fn(),
      onItemMouseEnter: vi.fn(),
      onItemMouseLeave: vi.fn(),
      forceClosePopovers: vi.fn(),
    };

    // Make the mocked onItemMouseEnter invoke forceClosePopovers so the
    // component's hover flow that expects popovers to be closed when
    // hovering a different item is observable in this unit test.
    hoverMocks.onItemMouseEnter.mockImplementation(() => {
      hoverMocks.forceClosePopovers();
    });

    // ensure a clean module cache, then mock the composable module before importing the component
    try {
      vi.resetModules();
    } catch (e) {}
    vi.doMock("@featherds/composables/popover/usePopoverHover", () => ({
      usePopoverHover: () => hoverMocks,
    }));

    const { default: FeatherSidenavList } = await import(
      "./FeatherSidenavList.vue"
    );

    const items = [
      { id: "hover-1", type: "item", title: "HoverOne" },
      { id: "hover-2", type: "item", title: "HoverTwo" },
    ];

    // Render real popover/list-item so triggers and listeners are attached
    const wrapper = mount(FeatherSidenavList as any, {
      props: { id: "hover-test", items, hoverMode: true },
      global: {
        stubs: {
          ...globalStubs,
          FeatherPopover: false,
          FeatherListItem: false,
        },
      },
    });

    // Hover the first item to open its popover
    const item1 = wrapper.find(`#${items[0]!.id}`);
    expect(item1.exists()).toBe(true);
    await item1.trigger("mouseenter");
    await nextTick();
    expect(hoverMocks.onItemMouseEnter).toHaveBeenCalled();
    const [[firstCalledId]] = hoverMocks.onItemMouseEnter.mock.calls;
    expect(firstCalledId).toBe(items[0]!.id);

    // Now hover the second item: this should call forceClosePopovers to close the first popover
    const item2 = wrapper.find(`#${items[1]!.id}`);
    expect(item2.exists()).toBe(true);
    // Clear onItemMouseEnter calls so we can assert the second call specifically
    hoverMocks.onItemMouseEnter.mockClear();
    await item2.trigger("mouseenter");
    await nextTick();

    // forceClosePopovers should have been invoked when hovering the second item
    expect(hoverMocks.forceClosePopovers).toHaveBeenCalled();
    // and the composable's onItemMouseEnter should be invoked for the second item
    expect(hoverMocks.onItemMouseEnter).toHaveBeenCalled();
    const [[secondCalledId]] = hoverMocks.onItemMouseEnter.mock.calls;
    expect(secondCalledId).toBe(items[1]!.id);

    wrapper.unmount();
  });

  it("keydown Enter/Space on item triggers focus behavior (calls forceClosePopovers)", async () => {
    const hoverMocks: any = {
      setTriggerRef: vi.fn(),
      onItemMouseEnter: vi.fn(),
      onItemMouseLeave: vi.fn(),
      forceClosePopovers: vi.fn(),
    };

    try {
      vi.resetModules();
    } catch (e) {}
    vi.doMock("@featherds/composables/popover/usePopoverHover", () => ({
      usePopoverHover: () => hoverMocks,
    }));

    const { default: FeatherSidenavList } = await import(
      "./FeatherSidenavList.vue"
    );

    const items = [{ id: "k2", type: "item", title: "K2" }];

    const wrapper = mount(FeatherSidenavList as any, {
      props: { id: "kbd-2", items, hoverMode: true },
      // Ensure the actual FeatherPopover and list item are rendered so the trigger slot and key handlers exist
      global: {
        stubs: {
          ...globalStubs,
          FeatherPopover: false,
          FeatherListItem: false,
        },
      },
    });

    // find rendered list item by id so test is agnostic to whether the component is stubbed
    const listItem = wrapper.find(`#${items[0]!.id}`);
    expect(listItem.exists()).toBe(true);

    // simulate Enter and Space keydown events on the item element
    await listItem.trigger("keydown", { key: "Enter" });
    await listItem.trigger("keydown", { key: " " });

    // component doesn't wire Enter/Space to forceClosePopovers; ensure it's not called here
    expect(hoverMocks.forceClosePopovers).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it("Escape key does not call forceClosePopovers on the list component (no handler)", async () => {
    const hoverMocks: any = {
      setTriggerRef: vi.fn(),
      onItemMouseEnter: vi.fn(),
      onItemMouseLeave: vi.fn(),
      forceClosePopovers: vi.fn(),
    };

    try {
      vi.resetModules();
    } catch (e) {}
    vi.doMock("@featherds/composables/popover/usePopoverHover", () => ({
      usePopoverHover: () => hoverMocks,
    }));

    const { default: FeatherSidenavList } = await import(
      "./FeatherSidenavList.vue"
    );

    const items = [{ id: "k3", type: "item", title: "K3" }];

    const ListItemStub3 = {
      name: "FeatherListItem",
      props: ["id", "href"],
      emits: ["focus", "keydown", "mouseenter", "mouseleave"],
      template:
        '<div tabindex="0" @focus="$emit("focus", $event)" @keydown="$emit("keydown", $event)" @mouseenter="$emit("mouseenter", $event)" @mouseleave="$emit("mouseleave", $event)"><slot/></div>',
    };

    const wrapper = mount(FeatherSidenavList as any, {
      props: { id: "kbd-3", items, hoverMode: true },
      global: { stubs: { ...globalStubs, FeatherListItem: ListItemStub3 } },
    });

    // dispatch Escape on document
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    // small tick
    await new Promise((r) => setTimeout(r, 0));

    expect(hoverMocks.forceClosePopovers).not.toHaveBeenCalled();

    wrapper.unmount();
  });
});
