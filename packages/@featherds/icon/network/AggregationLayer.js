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
    createElementVNode("path", { d: "M9.71,12.29l1.29-1.29v10c0,.28.11.53.29.71s.43.29.71.29.53-.11.71-.29.29-.43.29-.71v-10l1.29,1.29c.39.39,1.02.39,1.41,0s.39-1.02,0-1.41l-3.71-3.88-3.71,3.88c-.39.39-.39,1.02,0,1.41s1.02.39,1.41,0Z" }, null, -1),
    createElementVNode("path", { d: "M9,16.24l-3-1.74v-7l6-3.5,6,3.5v7l-3,1.74v2.21l4.5-2.54c.31-.18.5-.55.5-.91V7c0-.36-.19-.73-.5-.91l-7-3.96c-.15-.09-.33-.13-.5-.13s-.35.04-.5.13l-7,3.96c-.31.18-.5.55-.5.91v8c0,.36.19.73.5.91l4.5,2.54v-2.21Z" }, null, -1)
  ]));
}
const AggregationLayer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  AggregationLayer as default
};
