import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {};
const _hoisted_1 = {
  id: "Icons",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", {
  d: "M-.07,0h24V24h-24Z",
  fill: "none"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("g", null, [
  /* @__PURE__ */ createElementVNode("path", { d: "M6.5,3A4.49,4.49,0,0,0,2,7.5v9a4.49,4.49,0,1,0,9,0v-9A4.49,4.49,0,0,0,6.5,3Zm0,2A2.5,2.5,0,0,1,9,7.5V11H4V7.5A2.5,2.5,0,0,1,6.5,5Zm0,14A2.5,2.5,0,0,1,4,16.5V13H9v3.5A2.5,2.5,0,0,1,6.5,19Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M17.5,15a2,2,0,1,1-2,2,2,2,0,0,1,2-2m0-2a4,4,0,1,0,4,4,4,4,0,0,0-4-4Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M17.5,5a2,2,0,1,1-2,2,2,2,0,0,1,2-2m0-2a4,4,0,1,0,4,4,4,4,0,0,0-4-4Z" })
], -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var DrugGroupId = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { DrugGroupId as default };
