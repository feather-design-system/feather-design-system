import { createElementBlock, openBlock, createElementVNode } from "vue";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createElementVNode("path", { d: "M16.41,9h4.59c.55,0,1-.45,1-1V3c0-.55-.45-1-1-1h-5c-.55,0-1,.45-1,1v4.59l-3,3-3-3V3c0-.55-.45-1-1-1H3c-.55,0-1,.45-1,1v5c0,.55.45,1,1,1h4.59l3,3-3,3H3c-.55,0-1,.45-1,1v5c0,.55.45,1,1,1h5c.55,0,1-.45,1-1v-4.59l3-3,3,3v4.59c0,.55.45,1,1,1h5c.55,0,1-.45,1-1v-5c0-.55-.45-1-1-1h-4.59l-3-3,3-3ZM17,4h3v3h-3v-3ZM7,7h-3v-3h3v3ZM7,20h-3v-3h3v3ZM17,17h3v3h-3v-3Z" }, null, -1)
  ]));
}
const Nodes = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Nodes as default
};
