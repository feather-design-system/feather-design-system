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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M17,3.35A10,10,0,1,0,22,12,10,10,0,0,0,17,3.35ZM12,20A8,8,0,0,1,12,4a6.73,6.73,0,0,1,1,.07,12,12,0,0,0,0,15.86A6.73,6.73,0,0,1,12,20Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var LightDarkMode = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { LightDarkMode as default };
