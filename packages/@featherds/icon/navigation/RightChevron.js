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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M9.29,17.29a1,1,0,0,0,1.41,0l4.59-4.59a1,1,0,0,0,0-1.41L10.7,6.7A1,1,0,1,0,9.29,8.11L13.17,12,9.29,15.88A1,1,0,0,0,9.29,17.29Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var RightChevron = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { RightChevron as default };
