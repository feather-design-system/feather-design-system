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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M21,4H3A2,2,0,0,0,1,6V18a2,2,0,0,0,2,2H21a2,2,0,0,0,2-2V6A2,2,0,0,0,21,4Zm0,14H3V6H21Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M9.75,15.57l5.49-3.14a.49.49,0,0,0,0-.86L9.75,8.43A.5.5,0,0,0,9,8.86v6.28A.5.5,0,0,0,9.75,15.57Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var Video = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Video as default };
