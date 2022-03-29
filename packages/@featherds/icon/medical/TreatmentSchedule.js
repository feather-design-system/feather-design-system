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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M19,4H18V3a1,1,0,0,0-2,0V4H8V3A1,1,0,0,0,6,3V4H5A2,2,0,0,0,3,6V20a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V6A2,2,0,0,0,19,4Zm0,16H5V10H19ZM19,8H5V6H19Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("polygon", { points: "11 18 13 18 13 16 15 16 15 14 13 14 13 12 11 12 11 14 9 14 9 16 11 16 11 18" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var TreatmentSchedule = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { TreatmentSchedule as default };
