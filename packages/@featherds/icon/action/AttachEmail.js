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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M20,2H4A2,2,0,0,0,2,4V16a2,2,0,0,0,2,2h9V16H4V6.25l7.48,4.6a1,1,0,0,0,1,0L20,6.25V10h2V4A2,2,0,0,0,20,2ZM12,8.83,4.16,4H19.84Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M21,18.5a2.5,2.5,0,0,1-5,0v-5a1.5,1.5,0,0,1,3,0v5a.5.5,0,0,1-1,0V13H17v5.5a1.5,1.5,0,0,0,3,0v-5a2.5,2.5,0,0,0-5,0v5a3.5,3.5,0,0,0,7,0V13H21Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var AttachEmail = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { AttachEmail as default };
