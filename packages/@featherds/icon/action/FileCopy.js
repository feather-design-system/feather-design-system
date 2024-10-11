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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M20.41,10.41,15.59,5.59A2,2,0,0,0,14.17,5H8A2,2,0,0,0,6,7V21a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V11.83A2,2,0,0,0,20.41,10.41ZM19,21H8V7h6v5h5Z"></path><rect x="8" y="1" width="2" height="2"></rect><rect x="2" y="13" width="2" height="2"></rect><rect x="11" y="1" width="2" height="2"></rect><path d="M14,1V3h2A2,2,0,0,0,14,1Z"></path><path d="M4,18V16H2A2,2,0,0,0,4,18Z"></path><path d="M2,3H4V1A2,2,0,0,0,2,3Z"></path><rect x="5" y="1" width="2" height="2"></rect><rect x="2" y="10" width="2" height="2"></rect><rect x="2" y="4" width="2" height="2"></rect><rect x="2" y="7" width="2" height="2"></rect>', 11);
const _hoisted_13 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_13);
}
const FileCopy = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FileCopy as default
};
