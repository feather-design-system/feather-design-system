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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M9.2,16.4,4.8,12,9.2,7.6a1,1,0,0,0,0-1.4h0a1,1,0,0,0-1.4,0L2,12l5.8,5.8a1,1,0,0,0,1.4,0h0A1,1,0,0,0,9.2,16.4Zm5.6,0L19.2,12,14.8,7.6a1,1,0,0,1,0-1.4h0a1,1,0,0,1,1.4,0L22,12l-5.8,5.8a1,1,0,0,1-1.4,0h0A1,1,0,0,1,14.8,16.4Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const Code = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Code as default
};
