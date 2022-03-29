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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M21.74,13.28l-9-9.95A1,1,0,0,0,12,3h0a1,1,0,0,0-.74.33l-9,10a1,1,0,1,0,1.48,1.33L5,13.21V20a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V13.21l1.27,1.4a1,1,0,1,0,1.48-1.33ZM17,19H14V14H10v5H7V11l5-5,5,5Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Home as default };
