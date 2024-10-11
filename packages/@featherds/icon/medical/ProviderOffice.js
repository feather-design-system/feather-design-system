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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M20.5,5H17V7h3V19H4V7H7V5H3.5A1.5,1.5,0,0,0,2,6.5V21H22V6.5A1.51,1.51,0,0,0,20.5,5Z"></path><rect x="6" y="11" width="2" height="2"></rect><rect x="11" y="11" width="2" height="2"></rect><rect x="16" y="11" width="2" height="2"></rect><rect x="6" y="15" width="2" height="2"></rect><rect x="16" y="15" width="2" height="2"></rect><rect x="11" y="15" width="2" height="2"></rect><polygon points="11 9 13 9 13 7 15 7 15 5 13 5 13 3 11 3 11 5 9 5 9 7 11 7 11 9"></polygon>', 8);
const _hoisted_10 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_10);
}
const ProviderOffice = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ProviderOffice as default
};
