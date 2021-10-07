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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M9,16.16l-3.5-3.5a1,1,0,1,0-1.4,1.4l4.19,4.19a1,1,0,0,0,1.41,0L20.3,7.66a1,1,0,1,0-1.4-1.4Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Done = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Done as default };
