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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M19.41,7.41,14.59,2.59A2,2,0,0,0,13.17,2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8.83A2,2,0,0,0,19.41,7.41ZM18,20H6V4h7V9h5Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M15,16H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M8,13a1,1,0,0,0,1,1h6a1,1,0,0,0,0-2H9A1,1,0,0,0,8,13Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
var Text = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Text as default };
