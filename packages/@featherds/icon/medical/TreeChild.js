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
    transform: "translate(0 24) rotate(-90) scale(0.5)",
    "xlink:href": "#material_system_icon_border"
  }),
  /* @__PURE__ */ createElementVNode("path", { d: "M18.29,14.29,13.71,9.71a1,1,0,0,0-1.42,1.42L15.17,14H6V5A1,1,0,0,0,4,5V15a1,1,0,0,0,1,1H15.17l-2.88,2.87a1,1,0,0,0,1.42,1.42l4.58-4.58A1,1,0,0,0,18.29,14.29Z" })
], -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var TreeChild = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { TreeChild as default };
