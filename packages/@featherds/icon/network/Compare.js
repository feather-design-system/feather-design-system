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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M6,3h3v2h-3v14h3v2h-3c-1.1,0-2-.89-2-2V5c0-1.11.89-2,2-2ZM18,3h-3v2h3v14h-3v2h3c1.11,0,2-.89,2-2V5c0-1.11-.9-2-2-2ZM11,23h2v-2h-2v2ZM11,19h2v-2h-2v2ZM11,15h2v-2h-2v2ZM11,3h2V1h-2v2ZM11,11h2v-2h-2v2ZM11,7h2v-2h-2v2Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const Compare = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Compare as default
};
