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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M5,23V21H3A2,2,0,0,0,5,23Z"></path><rect x="9" y="21" width="2" height="2"></rect><rect x="12" y="21" width="2" height="2"></rect><rect x="15" y="21" width="2" height="2"></rect><rect x="18" y="15" width="2" height="2"></rect><path d="M18,23a2,2,0,0,0,2-2H18Z"></path><rect x="18" y="18" width="2" height="2"></rect><rect x="3" y="15" width="2" height="2"></rect><rect x="18" y="12" width="2" height="2"></rect><rect x="3" y="12" width="2" height="2"></rect><rect x="3" y="18" width="2" height="2"></rect><rect x="6" y="21" width="2" height="2"></rect><path d="M18,1H5A2,2,0,0,0,3,3v8H5V3H18v8h2V3A2,2,0,0,0,18,1Z"></path><rect x="7" y="9" width="9" height="2" rx="1"></rect><rect x="7" y="5" width="9" height="2" rx="1"></rect><rect x="7" y="13" width="9" height="2" rx="1"></rect><rect x="7" y="17" width="9" height="2" rx="1"></rect>', 17);
const _hoisted_19 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_19);
}
const MarkIncomplete = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  MarkIncomplete as default
};
