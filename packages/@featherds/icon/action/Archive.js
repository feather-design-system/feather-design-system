import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M21,2H3A1,1,0,0,0,2,3V7A1,1,0,0,0,3,8V20a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V8a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM4,4H20V6H4ZM19,20H5V8H19Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M12,18l3.15-3.15a.5.5,0,0,0-.36-.85H13V10.5a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5V14H9.21a.5.5,0,0,0-.36.85Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var Archive = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Archive as default };
