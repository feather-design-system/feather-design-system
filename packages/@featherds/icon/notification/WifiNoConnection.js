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
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("rect", {
  x: "11",
  y: "13",
  width: "2",
  height: "2",
  rx: "0.65"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M11,9v2a1,1,0,0,0,2,0V9a1,1,0,0,0-2,0Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M23.31,7.91h0a16.6,16.6,0,0,0-22.62,0,1.51,1.51,0,0,0,0,2.16L10.94,20.36a1.5,1.5,0,0,0,1.06.43,1.47,1.47,0,0,0,1.06-.44L23.34,10.07a1.51,1.51,0,0,0,0-2.16ZM12,18.59,2.44,9A14.61,14.61,0,0,1,21.56,9Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
const WifiNoConnection = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  WifiNoConnection as default
};
