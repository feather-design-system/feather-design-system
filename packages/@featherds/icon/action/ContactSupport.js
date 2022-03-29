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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,23.41,8.59,20H5a3,3,0,0,1-3-3V4A3,3,0,0,1,5,1H19a3,3,0,0,1,3,3V17a3,3,0,0,1-3,3H15.41ZM5,3A1,1,0,0,0,4,4V17a1,1,0,0,0,1,1H9.41L12,20.59,14.59,18H19a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("rect", {
  x: "11",
  y: "15",
  width: "2",
  height: "2",
  rx: "0.5"
}, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M12.61,5A4,4,0,0,0,8,8.41a.51.51,0,0,0,.5.59h.9c.34,0,.55-.15.59-.37a2,2,0,0,1,4,.51c-.12,1.73-2.63,1.7-3,4.28a.52.52,0,0,0,.5.58h1a.48.48,0,0,0,.48-.39c.35-2,3.33-2.3,2.93-5.1A4.08,4.08,0,0,0,12.61,5Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
var ContactSupport = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { ContactSupport as default };
