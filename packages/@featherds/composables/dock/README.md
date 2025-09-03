useDock
=======

Composable that centralises access to `dock` state and wires two common watchers
used by UI components (close popovers when the dock closes; react when the dock
toggle button is hovered).

Usage
-----

```ts
import { useDock } from '@featherds/composables/dock/useDock'

const { isDocked, isDockCollapsed } = useDock({
  onDockClosed: () => { /* e.g. close popovers */ },
  onToggleHoverOpen: () => { /* maybe close popovers when toggle hovered */ },
})
```

API
---

useDock(options?: UseDockOptions)

Returns an object:

- `dockConfig` — injected `Ref<DockConfig>` (falls back to `{id:'none',location:'none',isOpen:false}` if not provided)
- `dockToggleBtnHovering` — injected `Ref<boolean>` (falls back to `false`)
- `dockId` — local ref snapshot of the dock id at composable creation time
- `isDocked` — computed boolean
- `isDockCollapsed` — computed boolean
- `stop()` — call to stop internal watchers early (also called on unmount)

Options
-------

- `onDockClosed(cfg)` — called when the dock closes for the `dockId` snapshot
- `onToggleHoverOpen()` — called when `toggleHovering` transitions false -> true
- `immediateToggleWatch` — whether the toggle watcher runs with `immediate: true` (defaults to `true`)
- `watchDeep` — whether the dockConfig watcher uses `deep: true` (defaults to `true`)

Notes & Testing
---------------

- The composable stores the stop functions for its watchers and exposes `stop()` for deterministic teardown.
- To unit test, provide a `provide()`-backed `dockConfig`/`toggleHovering` and assert callbacks are invoked.
