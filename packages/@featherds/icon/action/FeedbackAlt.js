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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M16,9.18v-4a.5.5,0,0,0-.72-.45L8.76,8H3a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H5v4.5a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5V16H8.76l6.52,3.26a.5.5,0,0,0,.72-.45v-4a3,3,0,0,0,0-5.64ZM8,14H3V10H8Zm6-5v7.38l-4-2V9.62l4-2Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("rect", {
  x: "20",
  y: "11",
  width: "4",
  height: "2"
}, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M22.53,6.85l-1.06-1.7L17.86,7.41A5.82,5.82,0,0,1,19.16,9Z" }, null, -1);
const _hoisted_5 = /* @__PURE__ */ createElementVNode("path", { d: "M17.86,16.59l3.61,2.26,1.06-1.7-3.37-2.1A5.82,5.82,0,0,1,17.86,16.59Z" }, null, -1);
const _hoisted_6 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4,
  _hoisted_5
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_6);
}
var FeedbackAlt = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { FeedbackAlt as default };
