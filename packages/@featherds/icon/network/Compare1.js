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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", {
  d: "M19,6.39v3.61h-2v-2.79l-3.41-3.41h-6.59v6.2h-2V3.8c0-1.1.9-2,2-2h7.41l4.59,4.59Z",
  fill: "none",
  "stroke-width": "0"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M22,14H2v-2h20v2ZM7,16h-2v2h2v-2ZM7,20h-2v1c0,.55.45,1,1,1h1v-2ZM19,21v-1h-2v2h1c.55,0,1-.45,1-1ZM19,16h-2v2h2v-2ZM11,20h-2v2h2v-2ZM15,20h-2v2h2v-2ZM14.41,1.8h-7.41c-1.1,0-2,.9-2,2v6.2h2V3.8h6v4.2h4v2h2v-3.61L14.41,1.8Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
const Compare1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Compare1 as default
};
