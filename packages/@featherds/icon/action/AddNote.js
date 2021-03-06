import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M5,15a1,1,0,0,0,2,0V13H9a1,1,0,0,0,0-2H7V9A1,1,0,0,0,5,9v2H3a1,1,0,0,0,0,2H5Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M20,2H7A2,2,0,0,0,5,4V6H7V4H20V15H15v5H7V18H5v2a2,2,0,0,0,2,2h8.17a2,2,0,0,0,1.42-.59l4.82-4.82A2,2,0,0,0,22,15.17V4A2,2,0,0,0,20,2Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var AddNote = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { AddNote as default };
