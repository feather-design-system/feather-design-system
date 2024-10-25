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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M18.5,3H5.5A2.51,2.51,0,0,0,3,5.5v13A2.51,2.51,0,0,0,5.5,21h13A2.51,2.51,0,0,0,21,18.5V5.5A2.51,2.51,0,0,0,18.5,3ZM19,18.49a.51.51,0,0,1-.5.51h-13A.51.51,0,0,1,5,18.5v-13A.51.51,0,0,1,5.5,5h13a.51.51,0,0,1,.51.5Z"></path><path d="M16,11H14a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"></path><path d="M16,15H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"></path><path d="M16,7H14a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"></path><rect x="7" y="7" width="4" height="6" rx="1"></rect>', 5);
const _hoisted_7 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_7);
}
const BlogArticle = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  BlogArticle as default
};
