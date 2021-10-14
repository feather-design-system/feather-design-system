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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M16.41,9H21a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H16a1,1,0,0,0-1,1V7.59l-3,3-3-3V3A1,1,0,0,0,8,2H3A1,1,0,0,0,2,3V8A1,1,0,0,0,3,9H7.59l3,3-3,3H3a1,1,0,0,0-1,1v5a1,1,0,0,0,1,1H8a1,1,0,0,0,1-1V16.41l3-3,3,3V21a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1V16a1,1,0,0,0-1-1H16.41l-3-3ZM17,4h3V7H17ZM7,7H4V4H7ZM7,20H4V17H7Zm10-3h3v3H17Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Instances = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Instances as default };
