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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M8,7h4a1,1,0,0,0,0-2H8A1,1,0,0,0,8,7Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M8,11h4a1,1,0,0,0,0-2H8a1,1,0,0,0,0,2Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M13,14a1,1,0,0,0-1-1H8a1,1,0,0,0,0,2h4A1,1,0,0,0,13,14Z" }, null, -1);
const _hoisted_5 = /* @__PURE__ */ createElementVNode("path", { d: "M19,5H17V3a2,2,0,0,0-2-2H5A2,2,0,0,0,3,3V17a2,2,0,0,0,2,2H7v2a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V7A2,2,0,0,0,19,5ZM5,17V3H15V17Zm14,4H9V19h6a2,2,0,0,0,2-2V7h2Z" }, null, -1);
const _hoisted_6 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4,
  _hoisted_5
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_6);
}
var Documentation = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Documentation as default };
