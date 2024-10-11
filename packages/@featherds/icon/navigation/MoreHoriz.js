import { openBlock, createElementBlock, createElementVNode } from "vue";
const _export_sfc = (sfc, props) => {
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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("circle", {
  cx: "6",
  cy: "12",
  r: "2"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("circle", {
  cx: "18",
  cy: "12",
  r: "2"
}, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("circle", {
  cx: "12",
  cy: "12",
  r: "2"
}, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
const MoreHoriz = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  MoreHoriz as default
};
