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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M13,5v6h1.17L12,13.17,9.83,11H11V5h2m1-2H10A1,1,0,0,0,9,4V9H7.41a1,1,0,0,0-.7,1.71l4.58,4.58a1,1,0,0,0,1.42,0l4.58-4.58A1,1,0,0,0,16.59,9H15V4A1,1,0,0,0,14,3Zm4,15H6a1,1,0,0,0-1,1H5a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1h0A1,1,0,0,0,18,18Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Download = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Download as default };
