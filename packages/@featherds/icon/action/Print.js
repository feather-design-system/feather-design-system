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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M19,7H18V3a1,1,0,0,0-1-1H7A1,1,0,0,0,6,3V7H5a3,3,0,0,0-3,3v8a1,1,0,0,0,1,1H6v3a1,1,0,0,0,1,1H17a1,1,0,0,0,1-1V19h3a1,1,0,0,0,1-1V10A3,3,0,0,0,19,7ZM8,4h8V7H8Zm8,15v2H8V17h8Zm4-2H18V15H6v2H4V10A1,1,0,0,1,5,9H19a1,1,0,0,1,1,1Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M17,11H15a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var Print = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Print as default };
