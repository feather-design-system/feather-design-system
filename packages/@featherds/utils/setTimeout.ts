export const _setTimeout = function (callback: () => void, timeout: number) {
  if (!window) {
    return setTimeout(callback, timeout);
  } else {
    return window.setTimeout(callback, timeout);
  }
};

export type TimeoutResult = ReturnType<typeof _setTimeout>;

export const _clearTimeout = function (id: TimeoutResult) {
  if (!window) {
    return clearTimeout(id as ReturnType<typeof setTimeout>);
  } else {
    return window.clearTimeout(id as ReturnType<typeof window.setTimeout>);
  }
};
