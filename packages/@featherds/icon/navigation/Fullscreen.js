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
  /* @__PURE__ */ createElementVNode("path", { d: "M9,17H4V14H2v5H9a1,1,0,0,0,0-2Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M9,5H2v5H4V7H9A1,1,0,0,0,9,5Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M20,17H15a1,1,0,0,0,0,2h7V14H20Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M15,5a1,1,0,0,0,0,2h5v3h2V5Z" })
], -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Fullscreen = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Fullscreen as default };
