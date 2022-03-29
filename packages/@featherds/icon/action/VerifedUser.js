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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M8.7,11.29A1,1,0,1,0,7.29,12.7l3,3a1,1,0,0,0,1.41,0l5.66-5.66a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L11,13.59Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M20.41,4.74,12,1,3.59,4.74A1,1,0,0,0,3,5.65V11c0,5.55,3.84,10.74,9,12,5.16-1.26,9-6.45,9-12V5.65A1,1,0,0,0,20.41,4.74ZM19,11a10.47,10.47,0,0,1-7,9.93A10.47,10.47,0,0,1,5,11V6.3l7-3.11L19,6.3Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var VerifedUser = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { VerifedUser as default };
