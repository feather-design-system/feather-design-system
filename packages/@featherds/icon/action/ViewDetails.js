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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("circle", {
  cx: "12",
  cy: "14",
  r: "1.5"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M12,10a6.45,6.45,0,0,0-6,4,6.5,6.5,0,0,0,12,0A6.45,6.45,0,0,0,12,10Zm0,6.5A4.93,4.93,0,0,1,7.66,14a5,5,0,0,1,8.68,0A4.93,4.93,0,0,1,12,16.5Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M19,3H14.82A3,3,0,0,0,9.18,3H5A2,2,0,0,0,3,5V21a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V5A2,2,0,0,0,19,3Zm-8,.75A.76.76,0,0,1,11.75,3h.5a.76.76,0,0,1,.75.75v.5a.76.76,0,0,1-.75.75h-.5A.76.76,0,0,1,11,4.25ZM19,21H5V5H7V6A1,1,0,0,0,8,7h8a1,1,0,0,0,1-1V5h2Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
var ViewDetails = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { ViewDetails as default };
