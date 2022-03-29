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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M19,20H4.89a5.51,5.51,0,0,1,.7-11,8,8,0,0,1,15.23,1.35A5,5,0,0,1,19,20ZM5.06,18H19a3,3,0,0,0,.7-5.91L19,11.93,19,11.25a6,6,0,0,0-11.71-.9L7,11.22l-.89-.16A3.58,3.58,0,0,0,5.5,11a3.51,3.51,0,0,0-.44,7Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Cloud = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Cloud as default };
