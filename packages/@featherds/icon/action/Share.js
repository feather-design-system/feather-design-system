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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M18,16a3,3,0,0,0-1.92.72L8.94,12.55A2.51,2.51,0,0,0,9,12a2.6,2.6,0,0,0-.06-.56l7.13-4.16A3,3,0,1,0,15,5a2.6,2.6,0,0,0,.06.56L7.92,9.72A3,3,0,0,0,6,9a3,3,0,1,0,1.93,5.28l7.13,4.16A2.6,2.6,0,0,0,15,19a3,3,0,1,0,3-3Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const Share = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Share as default
};
