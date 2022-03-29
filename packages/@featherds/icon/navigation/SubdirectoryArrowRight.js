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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M13.71,20.29a1,1,0,0,1-1.42-1.42L15.17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,6,5v9h9.17l-2.88-2.87a1,1,0,0,1,1.42-1.42L19,15Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var SubdirectoryArrowRight = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { SubdirectoryArrowRight as default };
