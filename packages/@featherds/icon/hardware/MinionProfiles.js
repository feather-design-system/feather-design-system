import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M21,1H3A2,2,0,0,0,1,3V21a2,2,0,0,0,2,2H21a2,2,0,0,0,2-2h0V3h0A2,2,0,0,0,21,1Zm0,20H3V7H21ZM21,5H3V3H21Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M7.17,15.62l1,1.74a.25.25,0,0,0,.31.11L9.72,17a3.39,3.39,0,0,0,.85.48l.17,1.33A.27.27,0,0,0,11,19h2a.25.25,0,0,0,.25-.21l.19-1.33a3.33,3.33,0,0,0,.84-.48l1.24.49a.22.22,0,0,0,.3-.11l1-1.74a.24.24,0,0,0-.07-.31l-1-.82a4,4,0,0,0,0-.49,3.79,3.79,0,0,0,0-.49l1.06-.82a.26.26,0,0,0,.06-.33l-1-1.72a.26.26,0,0,0-.31-.12L14.27,11a3.24,3.24,0,0,0-.84-.49l-.19-1.33A.25.25,0,0,0,13,9H11a.23.23,0,0,0-.23.21l-.19,1.33a3.08,3.08,0,0,0-.84.49l-1.25-.51a.25.25,0,0,0-.3.12l-1,1.72a.26.26,0,0,0,.06.33l1.07.82a2,2,0,0,0-.07.49,4,4,0,0,0,0,.49l-1,.82A.24.24,0,0,0,7.17,15.62ZM12,12.21A1.79,1.79,0,1,1,10.21,14,1.79,1.79,0,0,1,12,12.21Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var MinionProfiles = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { MinionProfiles as default };
