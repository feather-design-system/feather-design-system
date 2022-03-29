import { openBlock, createElementBlock, createStaticVNode } from "vue";
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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<rect x="9" y="13" width="2" height="2"></rect><rect x="13" y="13" width="2" height="2"></rect><rect x="9" y="9" width="2" height="2"></rect><rect x="13" y="9" width="2" height="2"></rect><rect x="9" y="17" width="2" height="2"></rect><rect x="13" y="17" width="2" height="2"></rect><path d="M10,6.94a1,1,0,0,0,1-1V5h2V6a1,1,0,0,0,2,0V2a1,1,0,0,0-2,0V3H11V2A1,1,0,0,0,9,2V5.94A1,1,0,0,0,10,6.94Z"></path><path d="M22,9H19V4a1,1,0,0,0-1-1H16V5h1V21H7V5H8V3H6A1,1,0,0,0,5,4V9H2a1,1,0,0,0-1,1V23H23V10A1,1,0,0,0,22,9ZM5,21H3V19H5Zm0-4H3V15H5Zm0-4H3V11H5Zm16,8H19V19h2Zm0-4H19V15h2Zm0-4H19V11h2Z"></path>', 8);
const _hoisted_10 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_10);
}
var Hospital = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Hospital as default };
