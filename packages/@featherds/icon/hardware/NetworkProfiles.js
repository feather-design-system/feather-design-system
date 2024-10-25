import { openBlock, createElementBlock, createElementVNode } from "vue";
const _export_sfc = (sfc, props) => {
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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("rect", {
  x: "11",
  y: "5",
  width: "2",
  height: "2",
  rx: "0.65"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M13,12.5V8.65A.65.65,0,0,0,12.35,8h-.7a.65.65,0,0,0-.65.65V12.5a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,13,12.5Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M21,20H14V19H13V16.93a8,8,0,1,0-2,0V19H10v1H3v2h7v1h4V22h7ZM6,9a6,6,0,1,1,6,6A6,6,0,0,1,6,9Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
const NetworkProfiles = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  NetworkProfiles as default
};
