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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM15.54,8.78l-4.95,5L8.47,11.61a1,1,0,0,0-1.41,0h0a1,1,0,0,0,0,1.41l2.83,2.83a1,1,0,0,0,1.41,0L17,10.19a1,1,0,0,0,0-1.41h0A1,1,0,0,0,15.54,8.78Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var DoneCircle = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { DoneCircle as default };
