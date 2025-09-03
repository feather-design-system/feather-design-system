import { Ref, onBeforeUnmount, watch, isRef } from "vue";

type UseLocalStorageReturn<T> = {
  value: Ref<T>;
  set: (v: T) => void;
  remove: () => void;
  rawGet: () => string | null;
};

type UseLocalStorageOptions = {
  debounce?: number; // milliseconds
};

/**
 * A small SSR-safe localStorage composable.
 * - JSON serializes values
 * - Guards against missing window/localStorage
 * - Listens to storage events and keeps ref in sync
 */
export function useLocalStorage<T>(
  key: string,
  // consumer provides the ref that they control
  value: Ref<T>,
  options: UseLocalStorageOptions = {}
): UseLocalStorageReturn<T> {
  if (!isRef(value)) {
    // eslint-disable-next-line no-console
    console.error(`useLocalStorage expected a Vue ref for key=${key}`);
  }
  let writeTimeout: number | null = null;

  const hasLocalStorage = () =>
    typeof window !== "undefined" && typeof window.localStorage !== "undefined";

  const rawGet = () => {
    if (!hasLocalStorage()) return null;
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      // swallow and return null
      // eslint-disable-next-line no-console
      console.error(`useLocalStorage.get error for key=${key}:`, e);
      return null;
    }
  };

  const read = () => {
    const raw = rawGet();
    if (raw === null) return;
    try {
      value.value = JSON.parse(raw) as T;
    } catch (e) {
      // fallback to raw string when parse fails
      // eslint-disable-next-line no-console
      console.error(`useLocalStorage.parse error for key=${key}:`, e);
      // set raw string as the value so consumers still see stored data
      try {
        value.value = raw as unknown as T;
      } catch (e2) {
        // eslint-disable-next-line no-console
        console.error(`useLocalStorage.fallback set error for key=${key}:`, e2);
      }
    }
  };

  const write = (v: T) => {
    if (!hasLocalStorage()) return;
    try {
      // debug: log write attempts
      window.localStorage.setItem(key, JSON.stringify(v));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`useLocalStorage.set error for key=${key}:`, e);
    }
  };

  const set = (v: T) => {
    // only update the ref here; an internal watcher will persist changes
    value.value = v;
  };

  const remove = () => {
    if (!hasLocalStorage()) return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`useLocalStorage.remove error for key=${key}:`, e);
    }
  };

  const onStorage = (ev: StorageEvent) => {
    if (!ev) return;
    if (ev.key !== key) return;
    // if key was removed elsewhere, do nothing (consumer still controls ref)
    if (ev.newValue === null) return;
    try {
      value.value = JSON.parse(ev.newValue) as T;
    } catch (e) {
      // fallback to raw
      // eslint-disable-next-line no-console
      console.error(
        `useLocalStorage.storage event parse error for key=${key}:`,
        e
      );
      try {
        value.value = ev.newValue as unknown as T;
      } catch (e2) {
        // eslint-disable-next-line no-console
        console.error(
          `useLocalStorage.storage event fallback set error for key=${key}:`,
          e2
        );
      }
    }
  };

  // helper that writes (debounced) to localStorage
  const persist = (v: T) => {
    const d = options.debounce || 0;
    if (d > 0) {
      if (writeTimeout) window.clearTimeout(writeTimeout);
      writeTimeout = window.setTimeout(() => {
        // eslint-disable-next-line no-console
        write(v);
        writeTimeout = null;
      }, d) as unknown as number;
    } else {
      // eslint-disable-next-line no-console
      write(v);
    }
  };

  // watch local ref and persist automatically when it changes
  watch(
    value,
    (v) => {
      persist(v as T);
    },
    { flush: "post" }
  );

  // initialize from storage
  // prefer stored value over consumer-provided initial value. If nothing is stored,
  // persist the consumer's current ref value to storage so both sides stay in sync.
  const _raw = rawGet();
  if (_raw !== null) {
    read();
  } else {
    // no stored value; persist consumer-provided value so storage reflects current state
    try {
      persist(value.value);
    } catch (e) {
      // ignore
    }
  }

  if (
    typeof window !== "undefined" &&
    typeof window.addEventListener === "function"
  ) {
    window.addEventListener("storage", onStorage as EventListener);
  }

  onBeforeUnmount(() => {
    if (writeTimeout) {
      window.clearTimeout(writeTimeout as number);
      writeTimeout = null;
    }
    if (
      typeof window !== "undefined" &&
      typeof window.removeEventListener === "function"
    ) {
      window.removeEventListener("storage", onStorage as EventListener);
    }
  });

  return { value, set, remove, rawGet };
}
