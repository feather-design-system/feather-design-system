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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M17.29,14.67a1,1,0,0,0,0-1.41L12.7,8.67a1,1,0,0,0-1.41,0L6.7,13.26a1,1,0,1,0,1.41,1.41L12,10.79l3.88,3.88A1,1,0,0,0,17.29,14.67Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var UpChevron = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { UpChevron as default };
