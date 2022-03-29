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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M21,13a1,1,0,0,0,0-2H20V8h1a1,1,0,0,0,0-2H20V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V18h1a1,1,0,0,0,0-2H20V13Zm-3,7H4V4H18Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("circle", {
  cx: "11.05",
  cy: "9.5",
  r: "2.5"
}, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M16,15.5a1.7,1.7,0,0,0-.82-1.32,5.43,5.43,0,0,0-1.45-.7l-.41-.13A9.3,9.3,0,0,0,11.69,13,5.76,5.76,0,0,0,11,13c-1.67,0-5,.83-5,2.5V17H16Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
var Contacts = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Contacts as default };
