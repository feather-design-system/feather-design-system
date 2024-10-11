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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M16,20H4V18H2v2a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V18H16Z"></path><path d="M4,4H16V7h2V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V7H4Z"></path><path d="M3,16a1,1,0,0,0,1-1V14H5.5a2.5,2.5,0,0,0,0-5H3a1,1,0,0,0-1,1v5A1,1,0,0,0,3,16Zm1-5H5.5a.5.5,0,0,1,0,1H4Z"></path><path d="M21,9H17a1,1,0,0,0-1,1v5a1,1,0,0,0,2,0V14h2a1,1,0,0,0,0-2H18V11h3a1,1,0,0,0,0-2Z"></path><path d="M10,9a1,1,0,0,0-1,1v5a1,1,0,0,0,1,1h1.5a3.5,3.5,0,0,0,0-7Zm3,3.5A1.5,1.5,0,0,1,11.5,14H11V11h.5A1.5,1.5,0,0,1,13,12.5Z"></path>', 5);
const _hoisted_7 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_7);
}
const Pdf = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Pdf as default
};
