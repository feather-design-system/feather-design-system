import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M10.71,8.29A1,1,0,0,0,9.29,9.71L10.59,11l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,12.41l1.29,1.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,11l1.3-1.29a1,1,0,0,0-1.42-1.42L12,9.59Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M23.31,7.91h0a16.6,16.6,0,0,0-22.62,0,1.51,1.51,0,0,0,0,2.16L10.94,20.36a1.5,1.5,0,0,0,1.06.43,1.47,1.47,0,0,0,1.06-.44L23.34,10.07a1.51,1.51,0,0,0,0-2.16ZM12,18.59,2.44,9A14.61,14.61,0,0,1,21.56,9Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var WifiSignalBad = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { WifiSignalBad as default };
