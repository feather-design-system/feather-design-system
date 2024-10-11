import { openBlock, createElementBlock, createStaticVNode } from "vue";
const _export_sfc = (sfc, props) => {
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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M6,6.07l-.7-.7a.51.51,0,0,0-.73,0,10,10,0,0,0,0,13.38.51.51,0,0,0,.73,0l.7-.7a.5.5,0,0,0,0-.69A8,8,0,0,1,6,6.76.5.5,0,0,0,6,6.07Z"></path><circle cx="12" cy="12.07" r="2"></circle><path d="M8.13,8.2a.49.49,0,0,0-.72,0,6,6,0,0,0,0,7.7.49.49,0,0,0,.72,0l.69-.69a.52.52,0,0,0,.06-.68,4,4,0,0,1,0-5,.52.52,0,0,0-.06-.68Z"></path><path d="M15.87,8.2l-.69.69a.52.52,0,0,0-.06.68,4,4,0,0,1,0,5,.52.52,0,0,0,.06.68l.69.69a.49.49,0,0,0,.72,0,6,6,0,0,0,0-7.7A.49.49,0,0,0,15.87,8.2Z"></path><path d="M18.7,5.37l-.7.7a.5.5,0,0,0,0,.69,8,8,0,0,1,0,10.62.5.5,0,0,0,0,.69l.7.7a.51.51,0,0,0,.73,0,10,10,0,0,0,0-13.38A.51.51,0,0,0,18.7,5.37Z"></path>', 5);
const _hoisted_7 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_7);
}
const Connected = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Connected as default
};
