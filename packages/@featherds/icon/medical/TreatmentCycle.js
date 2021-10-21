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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("polygon", { points: "13 15 13 13 15 13 15 11 13 11 13 9 11 9 11 11 9 11 9 13 11 13 11 15 13 15" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M7.05,17A7,7,0,0,1,12,5V6.4a.25.25,0,0,0,.43.17L15,4,12.43,1.43A.25.25,0,0,0,12,1.6V3A9,9,0,0,0,5.64,18.36a8,8,0,0,0,.93.82,1,1,0,0,0,1.48-.3,1,1,0,0,0-.26-1.29A6.41,6.41,0,0,1,7.05,17Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M18.36,5.64a8,8,0,0,0-.93-.82,1,1,0,0,0-1.48.3,1,1,0,0,0,.26,1.29,6.41,6.41,0,0,1,.74.64A7,7,0,0,1,12,19V17.6a.25.25,0,0,0-.43-.17L9,20l2.57,2.57A.25.25,0,0,0,12,22.4V21A9,9,0,0,0,18.36,5.64Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
var TreatmentCycle = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { TreatmentCycle as default };
