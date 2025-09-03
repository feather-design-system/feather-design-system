usePopoverHover
================

Composable that centralises hover-triggered popover behavior used by menu/list components.

Why
---

Feather components often implement hover-to-open popovers where a list item contains
a trigger element (usually via `aria-controls` or `data-feather-popover`) that opens
a popover rendered elsewhere in the DOM. Keeping the logic in components causes
duplication and brittle DOM coupling. `usePopoverHover` extracts that logic so it
can be reused across packages.

What it does
------------

- Maps stored trigger refs (from list item refs) to popover ids (`aria-controls`).
- Opens a popover by dispatching a synthetic click on the trigger (configurable).
- Attaches `mouseenter`/`mouseleave` listeners to the popover container so the
  popover remains open while hovered.
- Schedules/clears close timeouts to prevent flicker during pointer movement.
- Exposes helpers so components can wire refs and mouse events.

API
---

```ts
usePopoverHover(hoverMode?: boolean | Ref<boolean>, options?: UsePopoverHoverOptions)
```

Returns an object with these properties:

- `triggerRefs` (ref<Record<string, HTMLElement | null>>): stored trigger elements by id.
- `popoverListeners` (ref<Record<string, ListenerRec | null>>): active listener records.
- `setTriggerRef(id, el)`: store a trigger ref for a list item. Call from `ref` bindings.
- `onItemMouseEnter(id, event?)`: to call from `@mouseenter` handlers.
- `onItemMouseLeave()`: noop — popover container leave handles closing.
- `openPopoverForItemByEl(id, el?)`: open the popover for the item; el overrides stored ref.
- `closePopoverForItem(id)`: immediately close popover for the given id.
- many other helpers (attach/remove listeners, schedule close, forceClosePopovers).

Options (UsePopoverHoverOptions)
-------------------------------

All options are optional and mostly exist to make the composable adaptable to
different popover implementations.

- `getPopoverIdFromTrigger(trigger)` — default: reads `aria-controls`.
- `findPopoverById(id)` — default: `document.getElementById`.
- `getPopoverContainer(pop)` — default: nearest `.feather-popover-container` or the pop element.
- `resolveTriggerSelector(li)` — default: query `[data-feather-popover], [aria-controls]`.
- `openTrigger(el)` — default: dispatch synthetic click event.
- `closeTrigger(el)` — default: dispatch Escape KeyboardEvent.
- `maxAttempts` / `retryDelayMs` — retry waiting for popover DOM to appear.

Example usage (Vue 3, script setup)
-----------------------------------

In a list component:

```vue
<script setup lang="ts">
import { toRef } from 'vue'
import { usePopoverHover } from '@featherds/composables/popover'

const props = defineProps({ hoverMode: Boolean })
const { setTriggerRef, onItemMouseEnter } = usePopoverHover(toRef(props, 'hoverMode'))

// In template use: &lt;li ref="el => setTriggerRef(id, el)" @mouseenter="() => onItemMouseEnter(id)"&gt;...
</script>
```

Custom programmatic open/close example
-------------------------------------

If your popover must be opened with a programmatic API (e.g. an injected popover service), pass custom open/close:

```ts
usePopoverHover(true, {
  openTrigger: (el) => myPopoverService.openForTrigger(el),
  closeTrigger: (el) => myPopoverService.closeForTrigger(el),
})
```

Edge cases & notes
------------------

- The composable assumes a browser DOM; all DOM interactions are guarded with `typeof document !== 'undefined'`.
- When a popover is created asynchronously (teleported or rendered after a microtask), the composable retries `maxAttempts` times with `retryDelayMs` between tries.
- Callers should ensure only a single canonical copy of this composable is used to avoid duplicate listener management.

Testing
-------

- Add unit tests that stub `document` and dispatch synthetic events to assert:
  - `setTriggerRef` stores correct element and nearest `li` preference.
  - `onItemMouseEnter` opens the popover and attaches listeners.
  - `scheduleClosePopoverForItem` triggers `closeTrigger` after the delay and removes listeners.
  - Custom `openTrigger`/`closeTrigger` options are used when provided.

License
-------

Same license as the repository.
