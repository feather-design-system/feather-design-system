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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M6,10A1,1,0,0,0,7,9V8.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L8.41,7H9A1,1,0,0,0,9,5H5V9A1,1,0,0,0,6,10Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M15,5a1,1,0,0,0,0,2h.6L13.33,9.27a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0L17,8.43V9a1,1,0,0,0,2,0V5Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M18,14a1,1,0,0,0-1,1v.58l-2.25-2.24a1,1,0,0,0-1.41,1.41L15.59,17H15a1,1,0,0,0,0,2h4V15A1,1,0,0,0,18,14Z" }, null, -1);
const _hoisted_5 = /* @__PURE__ */ createElementVNode("path", { d: "M9.29,13.29,7,15.59V15a1,1,0,0,0-2,0v4H9a1,1,0,0,0,0-2H8.41l2.3-2.29a1,1,0,0,0-1.42-1.42Z" }, null, -1);
const _hoisted_6 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4,
  _hoisted_5
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_6);
}
const Expand = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Expand as default
};
