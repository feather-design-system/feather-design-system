import { createElementBlock, openBlock, createElementVNode } from "vue";
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
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createElementVNode("polygon", { points: "9 10 11 10 11 8 13 8 13 10 15 10 15 12 13 12 13 14 11 14 11 12 9 12 9 10" }, null, -1),
    createElementVNode("path", { d: "M9,16.24l-3-1.74v-7l6-3.5,6,3.5v7l-3,1.74v2.21l4.5-2.54c.31-.18.5-.55.5-.91V7c0-.36-.19-.73-.5-.91l-7-3.96c-.15-.09-.33-.13-.5-.13s-.35.04-.5.13l-7,3.96c-.31.18-.5.55-.5.91v8c0,.36.19.73.5.91l4.5,2.54v-2.21Z" }, null, -1),
    createElementVNode("rect", {
      x: "11",
      y: "16",
      width: "2",
      height: "2"
    }, null, -1),
    createElementVNode("rect", {
      x: "11",
      y: "20",
      width: "2",
      height: "2"
    }, null, -1)
  ]));
}
const AggregationLayerAlt3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  AggregationLayerAlt3 as default
};
