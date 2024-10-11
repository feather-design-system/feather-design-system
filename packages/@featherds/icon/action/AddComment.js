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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M6,11a1,1,0,0,0,0,2h5a1,1,0,0,0,0-2Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M16,8a1,1,0,0,0-1-1H6A1,1,0,0,0,6,9h9A1,1,0,0,0,16,8Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M3,17V4H18v7h2V4a2,2,0,0,0-2-2H3A2,2,0,0,0,1,4V20.8a.49.49,0,0,0,.5.5.5.5,0,0,0,.35-.15L5,18h8V16H4Z" }, null, -1);
const _hoisted_5 = /* @__PURE__ */ createElementVNode("path", { d: "M22,16H20V14a1,1,0,0,0-2,0v2H16a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2Z" }, null, -1);
const _hoisted_6 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4,
  _hoisted_5
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_6);
}
const AddComment = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  AddComment as default
};
