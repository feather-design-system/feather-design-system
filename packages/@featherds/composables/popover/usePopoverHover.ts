import { ref, onBeforeUnmount, Ref } from "vue";

/**
 * Options for `usePopoverHover` allow callers to override DOM resolution
 * and trigger open/close behavior so the composable can be reused across
 * different popover implementations.
 */
export type UsePopoverHoverOptions = {
  /**
   * Given a trigger element, return the aria-controls id for the popover it opens.
   * Defaults to reading the `aria-controls` attribute.
   */
  getPopoverIdFromTrigger?: (trigger: HTMLElement | null) => string | null;
  /**
   * Given an ID, return the popover DOM element. Defaults to `document.getElementById`.
   */
  findPopoverById?: (id: string) => HTMLElement | null;
  /**
   * Given a popover element, return the container element that should receive
   * hover enter/leave listeners. Defaults to the nearest `.feather-popover-container` or the popover itself.
   */
  getPopoverContainer?: (popoverEl: HTMLElement | null) => HTMLElement | null;
  /**
   * Given a list item (`li`) element, find the trigger element inside it (or return the li).
   * Defaults to querying `[data-feather-popover], [aria-controls]` inside the li.
   */
  resolveTriggerSelector?: (li: HTMLElement | null) => HTMLElement | null;
  /**
   * How to open a popover for a trigger element. By default dispatches a synthetic click event.
   * Override when using a programmatic API.
   */
  openTrigger?: (triggerEl: HTMLElement) => void;
  /**
   * How to close a popover for a trigger element. By default dispatches an Escape keydown event.
   * Override when using a programmatic API.
   */
  closeTrigger?: (triggerEl: HTMLElement) => void;
  /**
   * When waiting for the popover DOM to appear, how many attempts to try before giving up.
   */
  maxAttempts?: number;
  /**
   * Delay in milliseconds between attempts when waiting for popover DOM to be created.
   */
  retryDelayMs?: number;
};

type ListenerRec = {
  enter: EventListener;
  leave: EventListener;
  el: HTMLElement;
};

/**
 * Composable for handling hover-triggered popovers.
 *
 * This composable encapsulates the DOM glue that:
 * - maps trigger elements to popover ids (aria-controls),
 * - opens popovers (by dispatching a click by default),
 * - attaches mouseenter/mouseleave listeners to the popover container so
 *   the popover remains open while the mouse is over it,
 * - schedules and cancels close timers to avoid flicker.
 *
 * The implementation intentionally accepts a set of overrideable options to
 * make it reusable across different popover implementations (programmatic
 * open/close, different container selectors, etc.).
 *
 * Contract (short):
 * - inputs: hoverMode (boolean or Ref<boolean>) and options to customize DOM behavior
 * - outputs: refs and functions for components to wire trigger refs and mouse events
 *
 * Example:
 * const { setTriggerRef, onItemMouseEnter } = usePopoverHover(toRef(props, 'hoverMode'))
 * // in template: <li ref="el => setTriggerRef(id, el)" @mouseenter="() => onItemMouseEnter(id)">...
 */
export function usePopoverHover(
  hoverMode: boolean | Ref<boolean> = false,
  options: UsePopoverHoverOptions = {}
) {
  const triggerRefs = ref<Record<string, HTMLElement | null>>({});
  const closeTimeouts = ref<Record<string, number | null>>({});
  const popoverListeners = ref<Record<string, ListenerRec | null>>({});

  const defaults = {
    getPopoverIdFromTrigger: (t: HTMLElement | null) =>
      t ? t.getAttribute("aria-controls") : null,
    findPopoverById: (id: string) =>
      typeof document !== "undefined" ? document.getElementById(id) : null,
    getPopoverContainer: (pop: HTMLElement | null) =>
      pop
        ? (pop.closest(".feather-popover-container") as HTMLElement | null) ||
          pop
        : null,
    resolveTriggerSelector: (li: HTMLElement | null) =>
      li
        ? (li.querySelector(
            "[data-feather-popover], [aria-controls]"
          ) as HTMLElement | null) || li
        : null,
    openTrigger: (el: HTMLElement) =>
      el.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true })
      ),
    closeTrigger: (el: HTMLElement) =>
      el.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "Escape",
          key: "Escape",
          bubbles: false,
          cancelable: true,
        })
      ),
    maxAttempts: 20,
    retryDelayMs: 50,
  } as const;

  const opts = { ...defaults, ...(options || {}) } as Required<
    UsePopoverHoverOptions & typeof defaults
  >;

  const getHoverMode = () =>
    typeof (hoverMode as any)?.value === "boolean"
      ? (hoverMode as Ref<boolean>).value
      : (hoverMode as boolean);

  const setTriggerRef = (id: string, el: any) => {
    /**
     * Store a reference to the trigger element for a given item id.
     * The function attempts to normalise Vue component refs ($el) and DOM nodes,
     * and prefers to store the nearest <li> ancestor if present. Components
     * should call this in their `ref` binding for each list item.
     */
    if (!el) {
      triggerRefs.value[id] = null;
      return;
    }
    let node: HTMLElement | null = null;
    if (el instanceof HTMLElement) node = el;
    else if ((el as any)?.$el instanceof HTMLElement) node = (el as any).$el;
    let nearestLi: HTMLElement | null = null;
    if (node && typeof node.closest === "function") {
      try {
        nearestLi = node.closest("li") as HTMLElement | null;
      } catch (e) {
        nearestLi = null;
      }
    }
    triggerRefs.value[id] = nearestLi || node;
  };

  const clearCloseTimeout = (id: string) => {
    const t = closeTimeouts.value[id];
    if (t) {
      try {
        window.clearTimeout(t);
      } catch (e) {
        /* ignore */
      }
      closeTimeouts.value[id] = null;
    }
  };

  const attachPopoverHoverListeners = (id: string, triggerEl: HTMLElement) => {
    /**
     * Attach mouseenter/mouseleave listeners to the popover container associated
     * with `triggerEl`. Uses `getPopoverIdFromTrigger` and `findPopoverById`
     * to resolve the popover DOM and `getPopoverContainer` to pick the element
     * that should receive the listeners. Listeners are retried until the
     * popover DOM appears or `maxAttempts` is reached.
     */
    if (!getHoverMode()) return;
    if (popoverListeners.value[id]) return; // already attached
    const aria = opts.getPopoverIdFromTrigger(triggerEl as HTMLElement | null);
    if (!aria || typeof document === "undefined") return;
    let attempts = 0;
    const maxAttempts = opts.maxAttempts;
    const tryAttach = () => {
      const pop = opts.findPopoverById(aria);
      if (!pop && attempts < maxAttempts) {
        attempts++;
        window.setTimeout(tryAttach, opts.retryDelayMs);
        return;
      }
      if (!pop) return;
      const container = opts.getPopoverContainer(
        pop as HTMLElement
      ) as HTMLElement | null;
      if (!container) return;
      const onEnter = () => clearCloseTimeout(id);
      const onLeave = () => scheduleClosePopoverForItem(id, 150);
      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);
      popoverListeners.value[id] = {
        enter: onEnter,
        leave: onLeave,
        el: container,
      };
    };
    tryAttach();
  };

  const removePopoverHoverListeners = (id: string) => {
    /**
     * Remove previously attached popover listeners for the given id.
     */
    const rec = popoverListeners.value[id];
    if (!rec) return;
    try {
      rec.el.removeEventListener("mouseenter", rec.enter);
      rec.el.removeEventListener("mouseleave", rec.leave);
    } catch (e) {
      /* ignore */
    }
    popoverListeners.value[id] = null;
  };

  const closePopoverForItem = (id: string) => {
    /**
     * Programmatically close the popover for a stored trigger ref by id.
     * This uses the configured `closeTrigger` function so implementations that
     * require programmatic APIs can override it.
     */
    const el = triggerRefs.value[id];
    if (!el) return;
    const aria = opts.getPopoverIdFromTrigger(el);
    if (aria && typeof document !== "undefined" && opts.findPopoverById(aria)) {
      removePopoverHoverListeners(id); // cleanup first
      opts.closeTrigger(el);
    }
  };

  const scheduleClosePopoverForItem = (id: string, delay = 250) => {
    clearCloseTimeout(id);
    if (typeof window === "undefined") return;
    closeTimeouts.value[id] = window.setTimeout(() => {
      closePopoverForItem(id);
      closeTimeouts.value[id] = null;
    }, delay) as unknown as number;
  };

  const findPopoverListenerIdByContainer = (container: HTMLElement) => {
    for (const k of Object.keys(popoverListeners.value)) {
      const rec = popoverListeners.value[k];
      if (rec && rec.el === container) return k;
    }
    return null;
  };

  const closeAllPopoversExceptEl = (exceptEl?: HTMLElement | null) => {
    if (typeof document === "undefined") return;
    const containers = document.querySelectorAll(".feather-popover-container");
    containers.forEach((container) => {
      try {
        const pop = container.querySelector(".popover") as HTMLElement | null;
        if (!pop?.id) return;
        const triggerEl = document.querySelector(
          `[aria-controls="${pop.id}"]`
        ) as HTMLElement | null;
        if (!triggerEl) return;
        if (exceptEl && triggerEl === exceptEl) return;
        opts.closeTrigger(triggerEl);
        const id = findPopoverListenerIdByContainer(container as HTMLElement);
        if (id) removePopoverHoverListeners(id);
      } catch (e) {
        /* ignore */
      }
    });
  };

  const resolveTriggerFromEvent = (event?: Event): HTMLElement | null => {
    if (!event || !(event.target instanceof Element)) return null;
    const target = event.target as Element;
    const li = target.closest("li") as HTMLElement | null;
    if (!li) return null;
    const trigger = opts.resolveTriggerSelector(li as HTMLElement);
    return trigger || li;
  };

  const openPopoverForItemByEl = (id: string, el?: HTMLElement | null) => {
    if (!getHoverMode()) return;
    const triggerEl = el || triggerRefs.value[id];
    if (!triggerEl || typeof document === "undefined") return;
    const aria = opts.getPopoverIdFromTrigger(triggerEl as HTMLElement);
    if (aria && opts.findPopoverById(aria)) return; // already open
    opts.openTrigger(triggerEl as HTMLElement);
    attachPopoverHoverListeners(id, triggerEl as HTMLElement); // attach after opening
  };

  const onItemMouseEnter = (id: string, event?: Event) => {
    if (!getHoverMode()) return;
    clearCloseTimeout(id);
    const stored = triggerRefs.value[id];
    const fromEvent = resolveTriggerFromEvent(event);
    const triggerEl = stored || fromEvent;
    closeAllPopoversExceptEl(triggerEl);
    if (!triggerEl) return;
    openPopoverForItemByEl(id, triggerEl);
  };

  const onItemMouseLeave = () => {
    // noop: closing handled via popover container leave
    return;
  };

  const forceClosePopovers = () => {
    if (typeof document === "undefined") return;
    const popoverContainers = document.querySelectorAll(
      ".feather-popover-container"
    );
    popoverContainers.forEach((container) => {
      const popoverEl = container.querySelector(".popover");
      if (!popoverEl?.id) return;
      const triggerEl = document.querySelector(
        `[data-feather-popover][aria-controls="${popoverEl.id}"]`
      );
      if (!triggerEl) return;
      opts.closeTrigger(triggerEl as HTMLElement);
      try {
        const id = findPopoverListenerIdByContainer(container as HTMLElement);
        if (id) removePopoverHoverListeners(id);
      } catch (e) {
        /* ignore */
      }
    });
  };

  onBeforeUnmount(() => {
    Object.keys(closeTimeouts.value).forEach((k) => {
      const t = closeTimeouts.value[k];
      if (t) {
        try {
          window.clearTimeout(t);
        } catch (e) {
          /* ignore */
        }
      }
    });
    Object.keys(popoverListeners.value).forEach((k) => {
      removePopoverHoverListeners(k);
    });
  });

  return {
    triggerRefs,
    popoverListeners,
    setTriggerRef,
    clearCloseTimeout,
    openPopoverForItemByEl,
    attachPopoverHoverListeners,
    removePopoverHoverListeners,
    closePopoverForItem,
    scheduleClosePopoverForItem,
    findPopoverListenerIdByContainer,
    closeAllPopoversExceptEl,
    resolveTriggerFromEvent,
    onItemMouseEnter,
    onItemMouseLeave,
    forceClosePopovers,
  } as const;
}
