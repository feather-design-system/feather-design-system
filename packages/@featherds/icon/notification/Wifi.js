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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M9,17l2.65,2.65a.5.5,0,0,0,.7,0L15,17A4.24,4.24,0,0,0,9,17Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M5,13l2,2a7.07,7.07,0,0,1,10,0l2-2A9.91,9.91,0,0,0,5,13Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M22.64,8.64a15.57,15.57,0,0,0-21.26,0,.51.51,0,0,0,0,.73L3,11a12.71,12.71,0,0,1,18,0l1.42-1.42C22.85,9.16,22.84,8.83,22.64,8.64Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
const Wifi = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Wifi as default
};
