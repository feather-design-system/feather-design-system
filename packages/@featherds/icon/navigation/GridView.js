import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", {
  d: "M3,3.5v7a.5.5,0,0,0,.5.5h7a.5.5,0,0,0,.5-.5v-7a.5.5,0,0,0-.5-.5h-7A.5.5,0,0,0,3,3.5ZM9,9H5V5H9ZM3,13.5v7a.5.5,0,0,0,.5.5h7a.5.5,0,0,0,.5-.5v-7a.5.5,0,0,0-.5-.5h-7A.5.5,0,0,0,3,13.5ZM9,19H5V15H9ZM13,3.5v7a.5.5,0,0,0,.5.5h7a.5.5,0,0,0,.5-.5v-7a.5.5,0,0,0-.5-.5h-7A.5.5,0,0,0,13,3.5ZM19,9H15V5h4Zm-6,4.5v7a.5.5,0,0,0,.5.5h7a.5.5,0,0,0,.5-.5v-7a.5.5,0,0,0-.5-.5h-7A.5.5,0,0,0,13,13.5ZM19,19H15V15h4Z",
  "fill-rule": "evenodd"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var GridView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { GridView as default };
