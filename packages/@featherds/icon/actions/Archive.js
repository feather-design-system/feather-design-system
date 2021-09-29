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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M20.54,5.19,19.15,3.51A1.45,1.45,0,0,0,18,3H6a1.49,1.49,0,0,0-1.16.55L3.46,5.19A2,2,0,0,0,3,6.46V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V6.46A2,2,0,0,0,20.54,5.19ZM6.24,5H17.76l.81,1H5.44ZM5,19V8H19V19Zm8.45-9h-2.9v3H8l4,4,4-4H13.45Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Archive = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Archive as default };
