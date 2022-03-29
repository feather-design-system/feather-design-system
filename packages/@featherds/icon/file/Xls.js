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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M20.41,7.41,15.59,2.59A2,2,0,0,0,14.17,2H7A2,2,0,0,0,5,4V8H7V4h7V9h5V20H7V18H5v2a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V8.83A2,2,0,0,0,20.41,7.41Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M8.29,16.71a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L7.41,13l2.3-2.29A1,1,0,0,0,8.29,9.29L6,11.59,3.71,9.29a1,1,0,0,0-1.42,1.42L4.59,13l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L6,14.41Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var Xls = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Xls as default };
