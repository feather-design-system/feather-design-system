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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M19,19H5V5h9l2-2H5A2,2,0,0,0,3,5V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V8l-2,2Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M10,12.28V14h1.71a1,1,0,0,0,.7-.29l7.86-7.86L18.16,3.72l-7.85,7.86A1,1,0,0,0,10,12.28Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M21.71,3,21,2.29a1,1,0,0,0-1.41,0L18.87,3,21,5.13l.72-.72A1,1,0,0,0,21.71,3Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
var Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Edit as default };
