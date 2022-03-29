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
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M5.93,16.37,7,13.69l1.07,2.68A1,1,0,0,0,9,17H9a1,1,0,0,0,.92-.68l2-6a1,1,0,1,0-1.9-.64L8.92,13.09l-1-2.46a1,1,0,0,0-1.86,0l-1,2.46L4,9.68a1,1,0,0,0-1.9.64l2,6A1,1,0,0,0,5,17,1,1,0,0,0,5.93,16.37Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var WordDoc = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { WordDoc as default };
