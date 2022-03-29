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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", {
  d: "M14.15,12A3.48,3.48,0,0,0,9.21,7.8l2.37,2.36-1.42,1.42L7.8,9.21A3.48,3.48,0,0,0,12,14.15l2.07,2.07a.49.49,0,0,0,.72,0l1.4-1.4a.49.49,0,0,0,0-.72Z",
  "fill-rule": "evenodd"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M20,14v6H4V4H20V8h2V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V14Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("polygon", { points: "18 8 24 8 21 12 18 8" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
var UpdateUtilities = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { UpdateUtilities as default };
