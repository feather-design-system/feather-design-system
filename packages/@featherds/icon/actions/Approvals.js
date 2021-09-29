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
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("g", null, [
  /* @__PURE__ */ createElementVNode("path", { d: "M5,21H15a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H5a1,1,0,0,0-1,1H4A1,1,0,0,0,5,21Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M11.78,14,6.12,8.36l-.71.71a2,2,0,0,0,0,2.83l2.83,2.83a2,2,0,0,0,2.83,0Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M16.73,6.24,13.9,3.41a2,2,0,0,0-2.83,0l-.71.71L16,9.78l.71-.71A2,2,0,0,0,16.73,6.24Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M9,5.54,7.54,7,19.88,19.29a1,1,0,0,0,1.41,0h0a1,1,0,0,0,0-1.41Z" })
], -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Approvals = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Approvals as default };
