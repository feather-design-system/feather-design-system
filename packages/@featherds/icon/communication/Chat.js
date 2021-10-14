import { openBlock, createElementBlock, createElementVNode } from "vue";
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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M14,11H7a1,1,0,0,0,0,2h7a1,1,0,0,0,0-2Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M17,7H7A1,1,0,0,0,7,9H17a1,1,0,0,0,0-2Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M15,2H9.24A8.21,8.21,0,0,0,1,10.08a7.93,7.93,0,0,0,2.3,5.64l7.2,7.19a.29.29,0,0,0,.5-.21V18h3.72A8.18,8.18,0,0,0,23,10.55,8,8,0,0,0,15,2Zm0,14H9v2.59l-4.29-4.3A5.89,5.89,0,0,1,3,10,6,6,0,0,1,9,4h6a6,6,0,0,1,0,12Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
var Chat = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Chat as default };
