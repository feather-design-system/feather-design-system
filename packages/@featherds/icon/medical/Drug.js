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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M19.57,4.43a4.85,4.85,0,0,0-6.88,0L4.43,12.69a4.86,4.86,0,1,0,6.88,6.88l8.26-8.26A4.85,4.85,0,0,0,19.57,4.43ZM9.9,18.16A2.87,2.87,0,0,1,5.84,14.1l3.42-3.42,4.06,4.06ZM18.16,9.9l-3.42,3.42L10.68,9.26,14.1,5.84A2.87,2.87,0,0,1,18.16,9.9Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Drug = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Drug as default };
