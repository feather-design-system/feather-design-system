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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M16.72,7.66h0a1,1,0,0,0,0,1.4l1.9,1.9H8a1,1,0,0,0-1,1H7a1,1,0,0,0,1,1H18.62l-1.9,1.9a1,1,0,0,0,0,1.4h0a1,1,0,0,0,1.4,0l3.59-3.59a1,1,0,0,0,0-1.41l-3.59-3.6A1,1,0,0,0,16.72,7.66ZM5,5h7a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H5A2,2,0,0,0,3,5V19a2,2,0,0,0,2,2h7a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H5Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var SignOut = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { SignOut as default };
