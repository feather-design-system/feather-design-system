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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M21,20H14V19H13V16h4a2,2,0,0,0,2-2V4a2,2,0,0,0-2-2H7A2,2,0,0,0,5,4V14a2,2,0,0,0,2,2h4v3H10v1H3v2h7v1h4V22h7ZM7,14V4H17V14Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Network = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Network as default };
