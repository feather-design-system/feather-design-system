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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M7,6H17l-5,6.3ZM4.25,5.57,10,13v6a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V13s3.72-4.8,5.74-7.39A1,1,0,0,0,19,4H5A1,1,0,0,0,4.25,5.57Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Filter = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Filter as default };
