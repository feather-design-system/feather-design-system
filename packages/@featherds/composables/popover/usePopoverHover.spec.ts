import { mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import { usePopoverHover } from "./usePopoverHover";
import { describe, it, expect, vi } from "vitest";

// lightweight helpers (moved here so tests are self-contained)
function createPopoverContainer(id = "test-popover") {
  const pop = document.createElement("div");
  pop.id = id;
  pop.className = "popover";

  const container = document.createElement("div");
  container.className = "feather-popover-container";
  container.appendChild(pop);

  document.body.appendChild(container);
  return { container, pop };
}

function createTriggerButton(opts?: {
  ariaControls?: string;
  dataAttr?: string;
}) {
  const trigger = document.createElement("button");

  if (opts?.ariaControls) {
    trigger.setAttribute("aria-controls", opts.ariaControls);
  }

  if (opts?.dataAttr) {
    trigger.setAttribute(opts.dataAttr, "true");
  }

  document.body.appendChild(trigger);
  return trigger;
}

function cleanupPopoversAndTriggers() {
  document
    .querySelectorAll(".feather-popover-container")
    .forEach((n) => n.remove());

  document
    .querySelectorAll("button[aria-controls], button[data-feather-popover]")
    .forEach((n) => n.remove());
}

describe("usePopoverHover composable", () => {
  it("opens popover and attaches container listeners on mouse enter in hover mode", async () => {
    // create trigger element with aria-controls pointing to popover id
    const trigger = createTriggerButton({ ariaControls: "test-popover" });

    // openTrigger should create the popover DOM so attachPopoverHoverListeners can find it
    const openSpy = vi.fn().mockImplementation(() => {
      createPopoverContainer("test-popover");
    });

    const Child = defineComponent({
      setup() {
        const { setTriggerRef, onItemMouseEnter, popoverListeners } =
          usePopoverHover(true, {
            openTrigger: (el: HTMLElement) => {
              openSpy(el);
            },
          });

        // register the trigger ref to the composable
        setTriggerRef("item1", trigger as any);

        return { onItemMouseEnter, popoverListeners };
      },
      template: "<div />",
    });

    const wrapper = mount(Child);

    // simulate mouse enter for the registered item
    wrapper.vm.onItemMouseEnter("item1");

    // wait for attach logic to run
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const rec = wrapper.vm.popoverListeners["item1"];
    expect(rec).toBeTruthy();
    // the container should exist in document and be registered
    const containerEl = document.querySelector(
      ".feather-popover-container"
    ) as HTMLElement | null;
    expect(containerEl).toBeTruthy();
    expect(rec!.el).toBe(containerEl);

    // cleanup DOM
    cleanupPopoversAndTriggers();
  });

  it("schedules and clears close timers for popovers", async () => {
    const trigger = createTriggerButton({ ariaControls: "close-popover" });

    const closeSpy = vi.fn();

    const Child = defineComponent({
      setup() {
        const {
          setTriggerRef,
          scheduleClosePopoverForItem,
          clearCloseTimeout,
          openPopoverForItemByEl,
        } = usePopoverHover(true, {
          openTrigger: () => {
            createPopoverContainer("close-popover");
          },
          closeTrigger: () => closeSpy(),
        });

        setTriggerRef("t1", trigger as any);

        return {
          scheduleClosePopoverForItem,
          clearCloseTimeout,
          openPopoverForItemByEl,
        };
      },
      template: "<div />",
    });

    const wrapper = mount(Child);

    // open the popover via the composable so DOM exists and listeners are attached
    wrapper.vm.openPopoverForItemByEl("t1", trigger as any);

    wrapper.vm.scheduleClosePopoverForItem("t1", 20);
    // clear it before it fires
    wrapper.vm.clearCloseTimeout("t1");
    await new Promise((r) => setTimeout(r, 40));
    expect(closeSpy).not.toHaveBeenCalled();

    // schedule again and allow it to fire
    wrapper.vm.scheduleClosePopoverForItem("t1", 20);
    await new Promise((r) => setTimeout(r, 40));
    expect(closeSpy).toHaveBeenCalled();

    // cleanup
    cleanupPopoversAndTriggers();
  });

  it("resolves trigger from event using nested selectors", async () => {
    // build li > div > button[data-feather-popover]
    const li = document.createElement("li");
    const wrapperDiv = document.createElement("div");
    const innerBtn = document.createElement("button");
    innerBtn.setAttribute("data-feather-popover", "true");
    wrapperDiv.appendChild(innerBtn);
    li.appendChild(wrapperDiv);
    document.body.appendChild(li);

    const Child = defineComponent({
      setup() {
        const { resolveTriggerFromEvent } = usePopoverHover(true);
        return { resolveTriggerFromEvent };
      },
      template: "<div />",
    });

    const wrapper = mount(Child);

    const fakeEvent = { target: innerBtn } as unknown as Event;
    const resolved = wrapper.vm.resolveTriggerFromEvent(fakeEvent);
    expect(resolved).toBe(innerBtn);

    li.remove();
  });

  it("removes popover listeners and forceClosePopovers triggers closeTrigger", async () => {
    createPopoverContainer("force-pop");
    const trigger = createTriggerButton({
      ariaControls: "force-pop",
      dataAttr: "data-feather-popover",
    });

    const closeSpy = vi.fn();

    const Child = defineComponent({
      setup() {
        const {
          attachPopoverHoverListeners,
          removePopoverHoverListeners,
          forceClosePopovers,
          popoverListeners,
        } = usePopoverHover(true, { closeTrigger: () => closeSpy() });
        // simulate attach
        attachPopoverHoverListeners("x", trigger as any);
        return {
          removePopoverHoverListeners,
          forceClosePopovers,
          popoverListeners,
        };
      },
      template: "<div />",
    });

    const wrapper = mount(Child);

    // after attach, record should exist
    // wait for attach to complete
    await new Promise((r) => setTimeout(r, 20));
    expect(wrapper.vm.removePopoverHoverListeners).toBeTruthy();

    // force close should call closeTrigger spy
    wrapper.vm.forceClosePopovers();
    await new Promise((r) => setTimeout(r, 0));
    expect(closeSpy).toHaveBeenCalled();

    // remove listeners explicitly
    wrapper.vm.removePopoverHoverListeners("x");
    // internal record should be null
    const rec = wrapper.vm.popoverListeners["x"];
    expect(rec).toBeNull();

    cleanupPopoversAndTriggers();
  });

  it("retries attach until popover DOM appears and then attaches listeners", async () => {
    let popRef: HTMLElement | null = null;
    const trigger = createTriggerButton({ ariaControls: "async-pop" });

    const findPopoverById = (id: string) =>
      popRef && popRef.id === id ? popRef : null;

    const Child = defineComponent({
      setup() {
        const { attachPopoverHoverListeners, popoverListeners } =
          usePopoverHover(true, {
            findPopoverById,
            maxAttempts: 10,
            retryDelayMs: 10,
          });
        return { attachPopoverHoverListeners, popoverListeners };
      },
      template: "<div />",
    });

    const wrapper = mount(Child);

    // call attach; initially popRef is null so composable will retry
    wrapper.vm.attachPopoverHoverListeners("a", trigger as any);

    // after a delay, create the popover so next retry finds it
    setTimeout(() => {
      const { pop } = createPopoverContainer("async-pop");
      popRef = pop;
    }, 30);

    // wait enough time for retries to succeed
    await new Promise((r) => setTimeout(r, 200));

    const rec = wrapper.vm.popoverListeners["a"];
    expect(rec).toBeTruthy();

    cleanupPopoversAndTriggers();
  });
});
