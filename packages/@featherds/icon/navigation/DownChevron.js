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
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M6.71,9.29a1,1,0,0,0,0,1.41l4.59,4.59a1,1,0,0,0,1.41,0L17.3,10.7a1,1,0,0,0-1.41-1.41L12,13.17,8.12,9.29A1,1,0,0,0,6.71,9.29Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var DownChevron = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { DownChevron as default };
