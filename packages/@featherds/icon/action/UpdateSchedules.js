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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M20,2H19V1a1,1,0,0,0-2,0V2H7V1A1,1,0,0,0,5,1V2H4A2,2,0,0,0,2,4V22a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2Zm0,20H4V8H20ZM20,6H4V4H20Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M9,20h6a2,2,0,0,0,2-2V17H15v1H9V12h6v2H14l2,2,2-2H17V12a2,2,0,0,0-2-2H9a2,2,0,0,0-2,2v6A2,2,0,0,0,9,20Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var UpdateSchedules = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { UpdateSchedules as default };
