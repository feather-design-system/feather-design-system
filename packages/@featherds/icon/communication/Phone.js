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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M19.34,15.55,18,14.9a3,3,0,0,0-3.84,1l-1,1.47a15.2,15.2,0,0,1-6.59-6.59l1.47-1A3,3,0,0,0,9.1,6L8.45,4.66A3,3,0,0,0,5.76,3H4A1,1,0,0,0,3,4,17,17,0,0,0,20,21a1,1,0,0,0,1-1V18.24A3,3,0,0,0,19.34,15.55ZM5,5h.73a1,1,0,0,1,.9.55l.66,1.32A1,1,0,0,1,7,8.15l-1.15.76A14.93,14.93,0,0,1,5,5ZM19,19a14.93,14.93,0,0,1-3.91-.8L15.85,17a1,1,0,0,1,1.28-.34l1.32.66a1,1,0,0,1,.55.9Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Phone = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Phone as default };
