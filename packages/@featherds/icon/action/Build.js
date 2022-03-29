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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M19.09,22.08A3,3,0,0,1,17,21.21L9.46,13.7A6.51,6.51,0,0,1,1,7.5a6.37,6.37,0,0,1,.55-2.61,1,1,0,0,1,1.62-.3L6.29,7.71a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L4.59,3.17a1,1,0,0,1-.28-.89,1,1,0,0,1,.58-.73A6.37,6.37,0,0,1,7.5,1a6.51,6.51,0,0,1,6.2,8.46L21.21,17a3,3,0,0,1-2.12,5.12ZM9.71,11.54a1,1,0,0,1,.7.29l8,8a1,1,0,1,0,1.41-1.41h0l-8-8a1,1,0,0,1-.21-1.11A4.49,4.49,0,0,0,7.5,3H7.25L9.12,4.88A3,3,0,1,1,4.88,9.12L3,7.25A2.09,2.09,0,0,0,3,7.5a4.49,4.49,0,0,0,6.3,4.12A1,1,0,0,1,9.71,11.54Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Build = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Build as default };
