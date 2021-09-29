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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M20.29,18.84l-5.56-5.56A6.48,6.48,0,0,0,10.86,3.1,6.5,6.5,0,0,0,7.58,15.67a6.43,6.43,0,0,0,5.74-1l5.56,5.56a1,1,0,0,0,1.41,0h0A1,1,0,0,0,20.29,18.84ZM5,9.46A4.5,4.5,0,1,1,9.5,14,4.49,4.49,0,0,1,5,9.46Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Search = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Search as default };
