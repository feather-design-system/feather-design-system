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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M6,15h9a1,1,0,0,0,0-2H6a1,1,0,0,0,0,2Z"></path><path d="M6,11h5V9H6a1,1,0,0,0,0,2Z"></path><path d="M13.3,8.59a1,1,0,0,0-.29.7V11h1.7a1,1,0,0,0,.71-.29l5.86-5.86L19.16,2.73Z"></path><path d="M22.71,2,22,1.3a1,1,0,0,0-1.41,0L19.87,2,22,4.14l.72-.72A1,1,0,0,0,22.71,2Z"></path><path d="M18,18H4L3,19V6h9l2-2H3A2,2,0,0,0,1,6V22.8a.49.49,0,0,0,.5.5.5.5,0,0,0,.35-.15L5,20H18a2,2,0,0,0,2-2V10l-2,2Z"></path>', 5);
const _hoisted_7 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_7);
}
var Feedback = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Feedback as default };
