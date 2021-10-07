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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M8.41,10h7.18a1,1,0,0,1,.7,1.71l-3.58,3.58a1,1,0,0,1-1.42,0L7.71,11.71A1,1,0,0,1,8.41,10Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var DropDownArrow = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { DropDownArrow as default };
