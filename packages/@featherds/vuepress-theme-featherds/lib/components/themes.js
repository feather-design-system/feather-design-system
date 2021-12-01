const THEMES = ["open-light", "open-dark"].map((x) => ({
  _text: x,
}));
const KEY = "FEATHER_DOCS_CREATED_BY_RIK_RANDOMLY_WHAT_A_GUY"; //lol

const callbacks = [];
const watch = (fn) => {
  callbacks.push(fn);
};
const unwatch = (fn) => {
  const index = callbacks.indexOf(fn);
  callbacks.splice(index, 1);
};
const update = (v) => {
  callbacks.forEach((fn) => fn(v));
};
export { THEMES, KEY, watch, unwatch, update };
