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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M21,20H4V3c0-.55-.45-1-1-1s-1,.45-1,1v18c0,.55.45,1,1,1h18c.55,0,1-.45,1-1s-.45-1-1-1Z"></path><rect x="18" y="3" width="2" height="15"></rect><rect x="14" y="7" width="2" height="11"></rect><rect x="10" y="5" width="2" height="13"></rect><rect x="6" y="11" width="2" height="7"></rect>', 5);
const _hoisted_7 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_7);
}
const ColumnChart = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ColumnChart as default
};
