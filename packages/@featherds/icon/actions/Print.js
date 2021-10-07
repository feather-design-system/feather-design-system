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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("g", null, [
  /* @__PURE__ */ createElementVNode("path", { d: "M19,7H18V3a1,1,0,0,0-1-1H7A1,1,0,0,0,6,3V7H5a3,3,0,0,0-3,3v7a1,1,0,0,0,1,1H6v2a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V18h3a1,1,0,0,0,1-1V10A3,3,0,0,0,19,7ZM8,4h8V7H8Zm8,14v2H8V16h8Zm4-2H18V15a1,1,0,0,0-1-1H7a1,1,0,0,0-1,1v1H4V10A1,1,0,0,1,5,9H19a1,1,0,0,1,1,1Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M17.5,11h-2a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.5-.5A.5.5,0,0,0,17.5,11Z" })
], -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Print = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Print as default };
