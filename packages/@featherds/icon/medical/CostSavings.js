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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M12.3,11.26c-1.54-.4-2-.82-2-1.46S11,8.56,12.09,8.56c1,0,1.44.37,1.61.95a.62.62,0,0,0,.59.47h.19a.65.65,0,0,0,.62-.86,2.7,2.7,0,0,0-2-1.72V6.93a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v.46A2.63,2.63,0,0,0,8.71,9.83c0,1.55,1.29,2.33,3.17,2.79,1.7.4,2,1,2,1.62,0,.47-.33,1.21-1.82,1.21-1.11,0-1.69-.4-1.91-1A.67.67,0,0,0,9.57,14H9.38a.64.64,0,0,0-.6.88,3,3,0,0,0,2.28,1.7v.46a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1v-.44c1.33-.25,2.37-1,2.38-2.4C15.47,12.31,13.83,11.65,12.3,11.26Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var CostSavings = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { CostSavings as default };
