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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M7,13h6a1,1,0,0,0,0-2H7a1,1,0,0,0,0,2Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M7,9H17a1,1,0,0,0,0-2H7A1,1,0,0,0,7,9Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M20,2H4A2,2,0,0,0,2,4V20.8a.49.49,0,0,0,.5.5.5.5,0,0,0,.35-.15L6,18H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2ZM5,16,4,17V4H20V16Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
var Comment = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Comment as default };
