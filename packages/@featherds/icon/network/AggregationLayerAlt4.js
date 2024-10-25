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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("rect", {
  x: "11",
  y: "19",
  width: "2",
  height: "2",
  rx: ".5",
  ry: ".5"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("rect", {
  x: "11",
  y: "9",
  width: "2",
  height: "8",
  rx: ".5",
  ry: ".5"
}, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M9,17.24l-3-1.74v-7l6-3.5,6,3.5v7l-3,1.74v2.21l4.5-2.54c.31-.18.5-.55.5-.91v-8c0-.36-.19-.73-.5-.91l-7-3.96c-.15-.09-.33-.13-.5-.13s-.35.04-.5.13l-7,3.96c-.31.18-.5.55-.5.91v8c0,.36.19.73.5.91l4.5,2.54v-2.21Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
const AggregationLayerAlt4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  AggregationLayerAlt4 as default
};
