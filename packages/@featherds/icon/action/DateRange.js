import { openBlock, createElementBlock, createStaticVNode } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<rect x="7" y="12" width="10" height="2" rx="0.4"></rect><rect x="7" y="16" width="2" height="2" rx="0.4"></rect><rect x="11" y="16" width="2" height="2" rx="0.4"></rect><rect x="15" y="16" width="2" height="2" rx="0.4"></rect><path d="M19,4H18V3a1,1,0,0,0-2,0V4H8V3A1,1,0,0,0,6,3V4H5A2,2,0,0,0,3,6V20a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V6A2,2,0,0,0,19,4Zm0,16H5V10H19ZM19,8H5V6H19Z"></path>', 5);
const _hoisted_7 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_7);
}
var DateRange = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { DateRange as default };
