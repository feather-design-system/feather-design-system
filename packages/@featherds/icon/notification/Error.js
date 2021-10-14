import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M11,9v3a1,1,0,1,0,2,0V9a1,1,0,0,0-2,0Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M21.4,10.54l-7.95-8a2.11,2.11,0,0,0-2.9,0l-8,8a2.05,2.05,0,0,0,0,2.9l8,8a2.05,2.05,0,0,0,2.9,0l8-8a2.05,2.05,0,0,0,0-2.9ZM20,12h0l-8,8L4,12l8-8,8,8A0,0,0,0,1,20,12Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("rect", {
  x: "11",
  y: "13.99",
  width: "2",
  height: "2",
  rx: "0.65"
}, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
var _Error = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { _Error as default };
