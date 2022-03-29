import { openBlock, createElementBlock, createStaticVNode } from "vue";
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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M21,2H3A2,2,0,0,0,1,4V18a2,2,0,0,0,2,2h8V18H3V4H21V18H20v2h1a2,2,0,0,0,2-2V4A2,2,0,0,0,21,2Z"></path><path d="M9,6H6A1,1,0,0,0,6,8H9A1,1,0,0,0,9,6Z"></path><path d="M9,10H6a1,1,0,0,0,0,2H9a1,1,0,0,0,0-2Z"></path><path d="M9,14H6a1,1,0,0,0,0,2H9a1,1,0,0,0,0-2Z"></path><path d="M15.5,6A3.5,3.5,0,1,0,19,9.5,3.5,3.5,0,0,0,15.5,6Zm0,5A1.5,1.5,0,1,1,17,9.5,1.5,1.5,0,0,1,15.5,11Z"></path><path d="M13,22.31a.25.25,0,0,0,.44.16L15.5,20l2.06,2.47a.25.25,0,0,0,.44-.16V15H13Z"></path>', 6);
const _hoisted_8 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_8);
}
var Certificate = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Certificate as default };
