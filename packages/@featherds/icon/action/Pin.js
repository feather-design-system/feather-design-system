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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("polygon", { points: "11 21 12 22 13 21 13 15 11 15 11 21" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M16,9V4h1a1,1,0,0,0,0-2H7A1,1,0,0,0,7,4H8V9a3,3,0,0,1-3,3v1a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V12A3,3,0,0,1,16,9ZM9,12a4.94,4.94,0,0,0,1-3V4h4V9a5,5,0,0,0,1,3Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var Pin = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Pin as default };
