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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M22.3,9.4,16.56,4.48A2,2,0,0,0,15.26,4H14a1,1,0,0,0-1-1H11a1,1,0,0,0-1,1H3A2,2,0,0,0,1,6V16a1,1,0,0,0,1,1H3a3,3,0,0,0,6,0h6a3,3,0,0,0,6,0h1a1,1,0,0,0,1-1V10.92A2,2,0,0,0,22.3,9.4ZM15,6l5,4H14V6Zm6,9h-.78a3,3,0,0,0-4.44,0H8.22a3,3,0,0,0-4.44,0H3V6h9v5a1,1,0,0,0,1,1h8Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("polygon", { points: "8 7 7 7 7 9 5 9 5 10 7 10 7 12 8 12 8 10 10 10 10 9 8 9 8 7" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var Ambulance = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Ambulance as default };
