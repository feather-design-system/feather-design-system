const _setTimeout = function (callback: Function, timeout: number) {
  if (!window) {
    return setTimeout(callback, timeout);
  } else {
    return window.setTimeout(callback, timeout);
  }
};

const _clearTimeout = function (id: number) {
  if (!window) {
    return clearTimeout(id);
  } else {
    return window.clearTimeout(id);
  }
};

export { _setTimeout, _clearTimeout };
