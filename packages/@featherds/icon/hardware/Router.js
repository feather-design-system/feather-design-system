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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M20.5,13H9V11a1,1,0,0,0-2,0v2H3.5A1.5,1.5,0,0,0,2,14.5v7A1.5,1.5,0,0,0,3.5,23h17A1.5,1.5,0,0,0,22,21.5v-7A1.5,1.5,0,0,0,20.5,13ZM20,21H4V15H20Z"></path><circle cx="8" cy="18" r="1"></circle><circle cx="12" cy="18" r="1"></circle><circle cx="16" cy="18" r="1"></circle><path d="M2.69,6A8,8,0,0,1,13.31,6,.5.5,0,0,0,14,6l.7-.7a.51.51,0,0,0,0-.73,10,10,0,0,0-13.38,0,.51.51,0,0,0,0,.73L2,6A.5.5,0,0,0,2.69,6Z"></path><path d="M4.15,7.42a.5.5,0,0,0,0,.73l.69.69a.52.52,0,0,0,.68.06,4,4,0,0,1,5,0,.52.52,0,0,0,.68-.06l.69-.69a.5.5,0,0,0,0-.73,6,6,0,0,0-7.7,0Z"></path>', 6);
const _hoisted_8 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_8);
}
var Router = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Router as default };
