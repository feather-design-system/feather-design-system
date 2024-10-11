import { openBlock, createElementBlock, createElementVNode } from "vue";
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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M21,16v-2c0-1.65-1.35-3-3-3h-4c-.55,0-1-.45-1-1v-2h4c1.1,0,2-.9,2-2v-2c0-1.1-.9-2-2-2H7c-1.1,0-2,.9-2,2v2c0,1.1.9,2,2,2h4v2c0,.55-.45,1-1,1h-4c-1.65,0-3,1.35-3,3v2c-1.1,0-2,.9-2,2v2c0,1.1.9,2,2,2h2c1.1,0,2-.9,2-2v-2c0-1.1-.9-2-2-2v-2c0-.55.45-1,1-1h4c.35,0,.69-.07,1-.18v3.18c-.55,0-1.05.22-1.41.59-.37.36-.59.86-.59,1.41v2c0,1.1.9,2,2,2h2c1.1,0,2-.9,2-2v-2c0-1.1-.9-2-2-2v-3.18c.31.11.65.18,1,.18h4c.55,0,1,.45,1,1v2c-1.1,0-2,.9-2,2v2c0,1.1.9,2,2,2h2c1.1,0,2-.9,2-2v-2c0-1.1-.9-2-2-2ZM7,6v-2h10v2H7ZM5,20h-2v-2h2v2ZM13,20h-2v-2h2v2ZM21,20h-2v-2h2v2Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const TreeDiagram = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  TreeDiagram as default
};
