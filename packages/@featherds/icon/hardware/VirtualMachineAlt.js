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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M17.36,8.19,12.64,5.46a1.27,1.27,0,0,0-1.28,0L6.64,8.19A1.29,1.29,0,0,0,6,9.3v5.45a1.29,1.29,0,0,0,.64,1.11l4.72,2.73a1.27,1.27,0,0,0,1.28,0l4.72-2.73A1.29,1.29,0,0,0,18,14.75V9.3A1.29,1.29,0,0,0,17.36,8.19Zm-6.22,8.29-3.43-2v-4l3.43,2ZM12,11l-3.43-2,3.43-2,3.43,2Zm4.29,3.46-3.43,2v-4l3.43-2Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var VirtualMachineAlt = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { VirtualMachineAlt as default };
