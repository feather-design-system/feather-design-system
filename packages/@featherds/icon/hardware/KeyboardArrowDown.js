import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {};
const _hoisted_1 = {
  id: "Icons",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M17.71,11.88a1,1,0,0,0-1.41,0L13,15.17V6a1,1,0,0,0-2,0v9.17L7.71,11.88a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12,19l5.71-5.71A1,1,0,0,0,17.71,11.88Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var KeyboardArrowDown = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { KeyboardArrowDown as default };
