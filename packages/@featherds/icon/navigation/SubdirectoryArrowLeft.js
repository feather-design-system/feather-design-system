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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M9.29,20.29a1,1,0,0,0,1.42-1.42L7.83,16H18a1,1,0,0,0,1-1V5a1,1,0,0,0-2,0v9H7.83l2.88-2.87A1,1,0,0,0,9.29,9.71L4,15Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var SubdirectoryArrowLeft = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { SubdirectoryArrowLeft as default };
