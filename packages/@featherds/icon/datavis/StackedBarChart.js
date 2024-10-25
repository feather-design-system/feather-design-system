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
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<rect x="5" y="4" width="13" height="2"></rect><rect x="19" y="4" width="3" height="2"></rect><rect x="12" y="8" width="5" height="2"></rect><rect x="17" y="12" width="3" height="2"></rect><rect x="5" y="8" width="6" height="2"></rect><rect x="5" y="12" width="11" height="2"></rect><rect x="5" y="16" width="5" height="2"></rect><path d="M22,20H3V3c0-.55-.45-1-1-1s-1,.45-1,1v18c0,.55.45,1,1,1h20c.55,0,1-.45,1-1s-.45-1-1-1Z"></path><rect x="11" y="16" width="3" height="2"></rect>', 9);
const _hoisted_11 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_11);
}
const StackedBarChart = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  StackedBarChart as default
};
