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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,18.59,2.44,9a14.34,14.34,0,0,1,1.93-1.4L2.93,6.17A16,16,0,0,0,.69,7.91,1.49,1.49,0,0,0,.22,9a1.47,1.47,0,0,0,.44,1.09L10.94,20.36a1.5,1.5,0,0,0,1.06.43,1.47,1.47,0,0,0,1.06-.44l2-2-1.42-1.42Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M23.31,7.91h0A16.56,16.56,0,0,0,9,3.73l1.77,1.78A14.51,14.51,0,0,1,21.56,9l-3.65,3.65,1.42,1.42,4-4A1.47,1.47,0,0,0,23.78,9,1.51,1.51,0,0,0,23.31,7.91Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M3.71,1.29A1,1,0,0,0,2.29,2.71l18,18a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
const WifiOff = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  WifiOff as default
};
