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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M13,4.07c3.94.49,7,3.86,7,7.93,0,1.85-.63,3.54-1.69,4.9l1.43,1.43c1.41-1.72,2.26-3.93,2.26-6.33,0-5.19-3.95-9.45-9-9.95v2.02Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M4.07,11c.45-3.61,3.32-6.48,6.93-6.93v-2.02C6.28,2.52,2.52,6.28,2.05,11h2.02Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M16.9,18.31c-1.36,1.05-3.05,1.69-4.9,1.69-4.07,0-7.44-3.06-7.93-7h-2.02c.5,5.05,4.76,9,9.95,9,2.4,0,4.6-.85,6.33-2.26l-1.43-1.43Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
const DonutChart = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  DonutChart as default
};
