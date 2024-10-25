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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M11,16h-2v2h2v-2ZM13,12h-2v2h2v-2ZM15,16h-2v2h2v-2ZM9,20h-2v2h2v-2ZM13,20h-2v2h2v-2ZM17,20h-2v2h2v-2ZM19.5,6.09l-7-3.96c-.15-.09-.33-.13-.5-.13s-.35.04-.5.13l-7,3.96c-.31.18-.5.55-.5.91v8c0,.36.19.73.5.91l2.5,1.41v-2.24l-1-.58v-7l6-3.5,6,3.5v7l-1,.58v2.24l2.5-1.41c.31-.18.5-.55.5-.91V7c0-.36-.19-.73-.5-.91Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const AggregationLayerAlt5 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  AggregationLayerAlt5 as default
};
