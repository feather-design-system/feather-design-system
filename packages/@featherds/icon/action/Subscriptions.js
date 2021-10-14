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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M15.29,8.29,10,13.59l-2.3-2.3A1,1,0,0,0,6.29,12.7l3,3a1,1,0,0,0,1.41,0l6-6a1,1,0,0,0,0-1.41A1,1,0,0,0,15.29,8.29Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M23.5,12H22A10,10,0,1,0,12,22V20a8,8,0,1,1,8-8H18.5a.25.25,0,0,0-.2.4L21,16l2.7-3.6A.25.25,0,0,0,23.5,12Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var Subscriptions = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Subscriptions as default };
