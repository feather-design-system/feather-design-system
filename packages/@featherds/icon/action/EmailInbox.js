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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M22,12V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4v8H1v8a2,2,0,0,0,2,2H21a2,2,0,0,0,2-2V12ZM19.84,4,12,8.83,4.16,4ZM4,6.25l7.48,4.6a1,1,0,0,0,1,0L20,6.25V12H16.56a1,1,0,0,0-.91.6,4,4,0,0,1-7.3,0,1,1,0,0,0-.91-.6H4ZM21,20H3V14H6.82a6,6,0,0,0,10.36,0H21Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var EmailInbox = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { EmailInbox as default };
