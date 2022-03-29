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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M2,3H16v7h2V3a2,2,0,0,0-2-2H2A2,2,0,0,0,0,3v9a2,2,0,0,0,2,2H7v3H5a1,1,0,0,0-1,1v1H14V18a1,1,0,0,0-1-1H11V14h3V12H2Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("rect", {
  x: "8",
  y: "4",
  width: "2",
  height: "2",
  rx: "0.65"
}, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M22,12H18a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V14A2,2,0,0,0,22,12Zm0,2v3H18V14Zm-4,8V19h4v3Z" }, null, -1);
const _hoisted_5 = /* @__PURE__ */ createElementVNode("path", { d: "M9.35,7h-.7A.65.65,0,0,0,8,7.65V10.5a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5V7.65A.65.65,0,0,0,9.35,7Z" }, null, -1);
const _hoisted_6 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4,
  _hoisted_5
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_6);
}
var ApplianceProfiles = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { ApplianceProfiles as default };
