import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { DockLabels } from "@featherds/dock";

describe("FeatherSidenav (unit)", () => {
  it("forwards computed dock props to FeatherDock", async () => {
    const { default: FeatherSidenav } = await import("./FeatherSidenav.vue");

    // Stub for FeatherDock that exposes received props for assertions
    const DockStub = {
      name: "FeatherDock",
      props: [
        "id",
        "rootTag",
        "ariaLabel",
        "pushedSelector",
        "modelValue",
        "location",
        "expandedWidth",
        "collapsedWidth",
        "labels",
      ],
      template: '<div data-test-dock><slot name="docked"/></div>',
    };

    const props = {
      id: "sidenav1",
      items: [],
      modelValue: true,
      pushedSelector: "#app",
      location: "right",
      expandedWidth: "25rem",
      collapsedWidth: "4rem",
      labels: { expand: "Expand", collapse: "Collapse" } as DockLabels,
    };

    const wrapper = mount(FeatherSidenav as any, {
      props,
      global: {
        stubs: {
          FeatherDock: DockStub,
          // keep the inner list stubbed to avoid overlapping tests with FeatherSidenavList.spec.ts
          FeatherSidenavList: true,
        },
      },
    });

    // wait for computed props and slots to be processed
    await nextTick();

    const dock = wrapper.findComponent({ name: "FeatherDock" });
    expect(dock.exists()).toBe(true);

    const dockProps = dock.props();
    expect(dockProps.id).toBe(props.id);
    expect(dockProps.modelValue).toBe(true);
    expect(dockProps.pushedSelector).toBe(props.pushedSelector);
    expect(dockProps.location).toBe(props.location);
    expect(dockProps.expandedWidth).toBe(props.expandedWidth);
    expect(dockProps.collapsedWidth).toBe(props.collapsedWidth);
    expect(dockProps.labels).toEqual(props.labels);

    // computed rootTag in the component is hard-coded to 'nav'
    expect(dockProps.rootTag).toBe("nav");
    // ariaLabel should be 'Navigation' when rootTag === 'nav'
    expect(dockProps.ariaLabel).toBe("Navigation");

    wrapper.unmount();
  });

  it("forwards dock expanded/collapsed events as update:expanded/update:collapsed", async () => {
    const { default: FeatherSidenav } = await import("./FeatherSidenav.vue");

    // Dock stub; we'll programmatically emit events from it after mount
    const DockStub = {
      name: "FeatherDock",
      props: ["id"],
      template: "<div />",
    };

    const wrapper = mount(FeatherSidenav as any, {
      props: { id: "emit-test", items: [] },
      global: { stubs: { FeatherDock: DockStub, FeatherSidenavList: true } },
    });

    // Find the dock stub and emit the dock-level events to simulate the child emitting
    const dock = wrapper.findComponent({ name: "FeatherDock" });
    expect(dock.exists()).toBe(true);

    // Emit dock events as the Dock would; Sidenav should re-emit translated events
    // emit expanded
    (dock.vm as any).$emit("update:dock-expanded", dock.props("id"));
    // emit collapsed
    (dock.vm as any).$emit("update:dock-collapsed", dock.props("id"));

    // allow parent's listeners to run
    await nextTick();

    const emitted = wrapper.emitted();
    expect(emitted["update:expanded"]).toBeTruthy();
    expect(emitted["update:expanded"]?.[0]).toEqual(["emit-test"]);
    expect(emitted["update:collapsed"]).toBeTruthy();
    expect(emitted["update:collapsed"]?.[0]).toEqual(["emit-test"]);

    wrapper.unmount();
  });

  it("forwards default computed dock props when props omitted", async () => {
    const { default: FeatherSidenav } = await import("./FeatherSidenav.vue");

    const DockStub = {
      name: "FeatherDock",
      props: [
        "id",
        "rootTag",
        "ariaLabel",
        "pushedSelector",
        "modelValue",
        "location",
        "expandedWidth",
        "collapsedWidth",
      ],
      template: "<div />",
    };

    const wrapper = mount(FeatherSidenav as any, {
      props: { id: "defaults-test", items: [] },
      global: { stubs: { FeatherDock: DockStub, FeatherSidenavList: true } },
    });

    const dock = wrapper.findComponent({ name: "FeatherDock" });
    const dp = dock.props();
    expect(dp.modelValue).toBe(false); // default
    expect(dp.location).toBe("left");
    expect(dp.expandedWidth).toBe("20rem");
    expect(dp.collapsedWidth).toBe("3rem");
    expect(dp.rootTag).toBe("nav");
    expect(dp.ariaLabel).toBe("Navigation");

    wrapper.unmount();
  });

  it("sets ariaLabel to 'Navigation' when rootTag is 'nav'", async () => {
    const { default: FeatherSidenav } = await import("./FeatherSidenav.vue");

    const DockStub = {
      name: "FeatherDock",
      props: ["rootTag", "ariaLabel"],
      template: "<div />",
    };

    const wrapper = mount(FeatherSidenav as any, {
      props: { id: "aria-test", items: [] },
      global: { stubs: { FeatherDock: DockStub, FeatherSidenavList: true } },
    });

    const dock = wrapper.findComponent({ name: "FeatherDock" });
    const dp = dock.props();
    expect(dp.rootTag).toBe("nav");
    expect(dp.ariaLabel).toBe("Navigation");

    wrapper.unmount();
  });

  it("forwards labels prop to the dock", async () => {
    const { default: FeatherSidenav } = await import("./FeatherSidenav.vue");

    const DockStub = {
      name: "FeatherDock",
      props: ["labels"],
      template: "<div />",
    };

    const labels = { expand: "Open", collapse: "Close" };

    const wrapper = mount(FeatherSidenav as any, {
      props: { id: "labels-test", items: [], labels: labels },
      global: { stubs: { FeatherDock: DockStub, FeatherSidenavList: true } },
    });

    const dock = wrapper.findComponent({ name: "FeatherDock" });
    expect(dock.props("labels")).toEqual(labels);

    wrapper.unmount();
  });

  it("renders the docked slot content (FeatherSidenavList) inside the dock", async () => {
    const { default: FeatherSidenav } = await import("./FeatherSidenav.vue");

    const DockStub = {
      name: "FeatherDock",
      template: '<div data-test-dock><slot name="docked"/></div>',
    };

    const ListStub = {
      name: "FeatherSidenavList",
      props: ["id"],
      template: '<div data-test-list id="stub-list"/>',
    };

    const wrapper = mount(FeatherSidenav as any, {
      props: { id: "slot-test", items: [] },
      global: {
        stubs: { FeatherDock: DockStub, FeatherSidenavList: ListStub },
      },
    });

    expect(wrapper.find("[data-test-dock]").exists()).toBe(true);
    expect(wrapper.find("[data-test-list]").exists()).toBe(true);

    wrapper.unmount();
  });

  it("passes menuProps.id as `${id}-menu` to FeatherSidenavList", async () => {
    const { default: FeatherSidenav } = await import("./FeatherSidenav.vue");

    const DockStub = {
      name: "FeatherDock",
      template: '<div><slot name="docked"/></div>',
    };

    const ListStub = {
      name: "FeatherSidenavList",
      props: ["id"],
      template: "<div />",
    };

    const wrapper = mount(FeatherSidenav as any, {
      props: { id: "rootid", items: [] },
      global: {
        stubs: { FeatherDock: DockStub, FeatherSidenavList: ListStub },
      },
    });

    const list = wrapper.findComponent({ name: "FeatherSidenavList" });
    expect(list.exists()).toBe(true);
    expect(list.props("id")).toBe("rootid-menu");

    wrapper.unmount();
  });
});
