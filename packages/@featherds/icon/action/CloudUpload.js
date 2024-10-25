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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M20.82,10.35A8,8,0,0,0,5.59,9a5.51,5.51,0,0,0-.7,11H19a5,5,0,0,0,1.82-9.65ZM19,18H5.06a3.51,3.51,0,0,1,.44-7,3.58,3.58,0,0,1,.6.06l.89.16.25-.87a6,6,0,0,1,11.71.9l.08.68.67.16A3,3,0,0,1,19,18Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M13.71,8.29h0L13,7.59l-.71.7h0l-3,3a1,1,0,0,0,1.42,1.42L12,11.41V15a1,1,0,0,0,2,0V11.41l1.29,1.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
const CloudUpload = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  CloudUpload as default
};
