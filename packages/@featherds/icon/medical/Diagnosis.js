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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M22,10a4,4,0,1,0-5,3.86V18a2,2,0,0,1-2,2H10a2,2,0,0,1-2-2V12.87a5.5,5.5,0,0,0,4.55-5.41V5a2,2,0,0,0-2-2h-1a1,1,0,0,0,0,2h1v2.5a3.5,3.5,0,0,1-7,0V5h1a1,1,0,0,0,0-2h-1a2,2,0,0,0-2,2v2.5A5.51,5.51,0,0,0,6,12.86V18a4,4,0,0,0,4,4h5a4,4,0,0,0,4-4V13.82A4,4,0,0,0,22,10Zm-4,2a2,2,0,1,1,2-2A2,2,0,0,1,18,12Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Diagnosis = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Diagnosis as default };
