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
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M21,2H3A2,2,0,0,0,1,4V15a2,2,0,0,0,2,2h7v3H7a1,1,0,0,0-1,1v1H18V21a1,1,0,0,0-1-1H14V17h7a2,2,0,0,0,2-2V4A2,2,0,0,0,21,2Zm0,13H3V4H21Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var DesktopWindows = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { DesktopWindows as default };
