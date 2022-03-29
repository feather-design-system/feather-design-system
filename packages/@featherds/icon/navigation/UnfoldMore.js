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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M9.53,8.29,12,5.84l2.46,2.45a1,1,0,0,0,1.41-1.41L12,3,8.12,6.88A1,1,0,0,0,9.53,8.29Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M15.88,15.72a1,1,0,0,0-1.41,0L12,18.17,9.54,15.71a1,1,0,1,0-1.41,1.41L12,21l3.88-3.87A1,1,0,0,0,15.88,15.72Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var UnfoldMore = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { UnfoldMore as default };
