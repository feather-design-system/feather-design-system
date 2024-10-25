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
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M22,20H3V3c0-.55-.45-1-1-1s-1,.45-1,1v18c0,.55.45,1,1,1h20c.55,0,1-.45,1-1s-.45-1-1-1Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M6,18h14c.55,0,1-.45,1-1V4c0-.38-.21-.72-.54-.89-.33-.17-.73-.14-1.04.08l-6.31,4.51-2.4-2.4c-.35-.35-.91-.39-1.31-.09l-4,3c-.25.19-.4.49-.4.8v8c0,.55.45,1,1,1ZM19,5.94v7.64l-4.46-4.46,4.46-3.18ZM7,9.5l2.91-2.18,2.39,2.39,6.29,6.29H7v-6.5Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
const AreaChart = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  AreaChart as default
};
