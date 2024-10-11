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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M21.88,19.53,12.44,1.7a.5.5,0,0,0-.89,0L2.11,19.53h0s0,0,0,.06a1.29,1.29,0,0,0-.08.28V20a1.09,1.09,0,0,0,0,.26s0,.05,0,.07l0,0a.94.94,0,0,0,.17.31h0a1,1,0,0,0,.33.25.38.38,0,0,0,.1,0A1,1,0,0,0,3,21H3A1.19,1.19,0,0,0,3.31,21L9,19l3,3,3-3L20.68,21a1,1,0,0,0,1.08-.3A1,1,0,0,0,21.88,19.53ZM11,7v9.25L5,18.26Zm5.86,10.53h0L13,16.28V7l6,11.23Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const Send = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Send as default
};
