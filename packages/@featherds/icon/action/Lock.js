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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M19,10H17V7A5,5,0,0,0,7,7v3H5a1,1,0,0,0-1,1V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V11A1,1,0,0,0,19,10ZM9,7a3,3,0,0,1,6,0v3H9Zm9,13H6V12H18Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Lock = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Lock as default };
