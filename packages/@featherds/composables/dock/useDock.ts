import { inject, ref, computed, watch, onBeforeUnmount, Ref } from "vue";
import type { DockConfig } from "@featherds/dock";

export type UseDockOptions = {
  /** Called when the dock closes for this component's dock id. */
  onDockClosed?: (cfg: DockConfig) => void;
  /** Called when the dock toggle button hover changes false -> true. */
  onToggleHoverOpen?: () => void;
  /** Watcher option: whether the toggle watcher should be run with immediate: true. */
  immediateToggleWatch?: boolean;
  /** Watcher option: deep watch for dockConfig (defaults to true to match existing code). */
  watchDeep?: boolean;
  /** Provide key for dock config injection if your app uses custom provide keys. */
  dockConfigKey?: string;
  /** Provide key for toggle-hover injection. */
  toggleHoverKey?: string;
};

/**
 * useDock
 *
 * Injects dock state and wires two watchers commonly used by components that need
 * to know when the dock opens/closes or when the dock toggle button is hovered.
 *
 * Returns both the raw injected refs and two computed helpers: `isDocked` and
 * `isDockCollapsed`. Optional callbacks may be provided to react to lifecycle
 * events.
 */
export function useDock(options: UseDockOptions = {}) {
  const {
    onDockClosed,
    onToggleHoverOpen,
    immediateToggleWatch = true,
    watchDeep = true,
    dockConfigKey = "dockConfig",
    toggleHoverKey = "toggleHovering",
  } = options;

  // safe defaults when providers are absent (SSR / standalone usage)
  const defaultDock = ref<DockConfig>({
    id: "none",
    location: "none",
    isOpen: false,
  });
  const defaultToggle = ref<boolean>(false);

  const dockConfig = inject<Ref<DockConfig>>(dockConfigKey, defaultDock);
  const dockToggleBtnHovering = inject<Ref<boolean>>(
    toggleHoverKey,
    defaultToggle
  );

  // snapshot id used to detect when the dock for this component closes
  const dockId = ref(dockConfig.value?.id ?? "none");

  const isDocked = computed(
    () => (dockConfig.value?.location ?? "none") !== "none"
  );
  const isDockCollapsed = computed(
    () => isDocked.value && !(dockConfig.value?.isOpen ?? false)
  );

  // store stop handlers so we can stop watchers early or on unmount
  const stopFns: Array<() => void> = [];

  const stopDockWatcher = watch(
    dockConfig,
    (cfg) => {
      // if the dock for this component closed, call the callback
      if (!cfg.isOpen && isDocked.value && cfg.id === dockId.value) {
        onDockClosed?.(cfg);
      }
    },
    { deep: watchDeep }
  );
  stopFns.push(() => stopDockWatcher());

  const stopToggleWatcher = watch(
    dockToggleBtnHovering,
    (newVal, oldVal) => {
      // call the callback on false -> true transitions
      if (oldVal === false && newVal === true) {
        onToggleHoverOpen?.();
      }
    },
    { immediate: immediateToggleWatch }
  );
  stopFns.push(() => stopToggleWatcher());

  onBeforeUnmount(() => stopFns.forEach((s) => s()));

  return {
    dockConfig,
    dockToggleBtnHovering,
    dockId,
    isDocked,
    isDockCollapsed,
    stop: () => stopFns.forEach((s) => s()),
  } as const;
}
