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
  /* @__PURE__ */ createElementVNode("path", { d: "M19,4H18V3a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1V4H8V3A1,1,0,0,0,7,2H7A1,1,0,0,0,6,3V4H5A2,2,0,0,0,3,6V20a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V6A2,2,0,0,0,19,4Zm0,16H5V10H19ZM19,8H5V6H19Z" }),
  /* @__PURE__ */ createElementVNode("rect", {
    x: "12",
    y: "12.96",
    width: "5",
    height: "5",
    rx: "1"
  })
], -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var EndDate = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { EndDate as default };
