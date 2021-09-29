import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("g", null, [
  /* @__PURE__ */ createElementVNode("path", { d: "M19,7V2H8V7H4A2,2,0,0,0,2,9v7a2,2,0,0,0,2,2H8v4H19V18h2a2,2,0,0,0,2-2V11A4,4,0,0,0,19,7ZM6,16H4V9H6ZM10,4h7V7H10Zm7,16H10V16h7Zm4-4H19V14H8V9H19a2,2,0,0,1,2,2Z" }),
  /* @__PURE__ */ createElementVNode("rect", {
    x: "16.02",
    y: "11",
    width: "3",
    height: "1",
    rx: "0.5"
  })
], -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Fax = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Fax as default };
