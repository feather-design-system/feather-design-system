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
  /* @__PURE__ */ createElementVNode("path", { d: "M19,19H5V5h9l2-2H5A2,2,0,0,0,3,5V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V8l-2,2Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M10,12.28V14h1.71a1,1,0,0,0,.7-.29l7.86-7.86L18.16,3.72l-7.85,7.86A1,1,0,0,0,10,12.28Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M21.71,3,21,2.29a1,1,0,0,0-1.41,0L18.87,3,21,5.13l.72-.72A1,1,0,0,0,21.71,3Z" })
], -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Edit as default };
