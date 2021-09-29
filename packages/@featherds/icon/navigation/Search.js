import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("defs", null, [
  /* @__PURE__ */ createElementVNode("symbol", {
    id: "material_system_icon_border",
    "data-name": "material_system_icon_border",
    viewBox: "0 0 48 48"
  }, [
    /* @__PURE__ */ createElementVNode("rect", {
      width: "48",
      height: "48",
      fill: "none"
    })
  ])
], -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("g", null, [
  /* @__PURE__ */ createElementVNode("use", {
    width: "48",
    height: "48",
    transform: "translate(0 0) scale(0.5)",
    "xlink:href": "#material_system_icon_border"
  }),
  /* @__PURE__ */ createElementVNode("path", { d: "M21.62,20.38l-6.24-6.24A7.43,7.43,0,0,0,17,9.5,7.5,7.5,0,1,0,9.5,17a7.43,7.43,0,0,0,4.64-1.62l6.24,6.24a.88.88,0,0,0,1.24-1.24ZM9.5,15A5.5,5.5,0,1,1,15,9.5,5.5,5.5,0,0,1,9.5,15Z" })
], -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var Search = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Search as default };
