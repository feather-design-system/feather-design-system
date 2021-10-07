import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {};
const _hoisted_1 = {
  id: "Icons",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("g", null, [
  /* @__PURE__ */ createElementVNode("circle", {
    cx: "12",
    cy: "6",
    r: "2"
  }),
  /* @__PURE__ */ createElementVNode("circle", {
    cx: "12",
    cy: "12",
    r: "2"
  }),
  /* @__PURE__ */ createElementVNode("circle", {
    cx: "12",
    cy: "18",
    r: "2"
  })
], -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var MoreVert = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { MoreVert as default };
