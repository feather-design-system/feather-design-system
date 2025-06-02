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
    createElementVNode("path", { d: "M22,13v-2h-9v-3h1c1.1,0,2-.9,2-2v-2c0-1.1-.9-2-2-2h-4c-1.1,0-2,.9-2,2v2c0,1.1.9,2,2,2h1v3H2v2h3v3h-1c-1.1,0-2,.9-2,2v2c0,1.1.9,2,2,2h4c1.1,0,2-.9,2-2v-2c0-1.1-.9-2-2-2h-1v-3h10v3h-1c-1.1,0-2,.9-2,2v2c0,1.1.9,2,2,2h4c1.1,0,2-.9,2-2v-2c0-1.1-.9-2-2-2h-1v-3h3ZM10,4h4v2h-4v-2ZM8,20h-4v-2h4v2ZM20,20h-4v-2h4v2Z" }, null, -1)
  ]));
}
const Instances = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Instances as default
};
