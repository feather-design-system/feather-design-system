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
    createElementVNode("path", { d: "M3,17h18c.55,0,1-.45,1-1V5c0-.55-.45-1-1-1H3c-.55,0-1,.45-1,1v11c0,.55.45,1,1,1ZM4,6h16v9H4V6ZM22.5,18H1.5c-.28,0-.5.22-.5.5v1c0,.28.22.5.5.5h21c.28,0,.5-.22.5-.5v-1c0-.28-.22-.5-.5-.5Z" }, null, -1)
  ]));
}
const Laptop = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Laptop as default
};
