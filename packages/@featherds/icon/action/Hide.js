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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M3.71,2.29A1,1,0,0,0,2.29,3.71l18,18a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M13.59,17.83A8.41,8.41,0,0,1,12,18a9.77,9.77,0,0,1-8.92-6A10.31,10.31,0,0,1,4.94,9.18L3.52,7.76a12.38,12.38,0,0,0-2.45,3.87,1,1,0,0,0,0,.74A11.79,11.79,0,0,0,12,20a11.5,11.5,0,0,0,3.27-.49Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M10.41,6.17A8.41,8.41,0,0,1,12,6a9.77,9.77,0,0,1,8.92,6,10.31,10.31,0,0,1-1.86,2.82l1.42,1.42a12.38,12.38,0,0,0,2.45-3.87,1,1,0,0,0,0-.74A11.79,11.79,0,0,0,12,4a11.5,11.5,0,0,0-3.27.49Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
const Hide = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Hide as default
};
