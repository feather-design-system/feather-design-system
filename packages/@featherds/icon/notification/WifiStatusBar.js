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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,20.79a1.5,1.5,0,0,1-1.06-.43L.66,10.07a1.51,1.51,0,0,1,0-2.16,16.6,16.6,0,0,1,22.62,0h0a1.51,1.51,0,0,1,0,2.16L13.06,20.35A1.47,1.47,0,0,1,12,20.79ZM2.44,9,12,18.59,21.56,9A14.61,14.61,0,0,0,2.44,9Zm19.5.35Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var WifiStatusBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { WifiStatusBar as default };
