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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M18.3,5.67a1,1,0,0,0-1.41,0L12,10.55,7.11,5.66A1,1,0,0,0,5.7,7.07L10.59,12,5.7,16.85a1,1,0,0,0,1.41,1.41L12,13.37l4.89,4.89a1,1,0,0,0,1.41-1.41L13.41,12,18.3,7.07A1,1,0,0,0,18.3,5.67Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Close = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Close as default };
