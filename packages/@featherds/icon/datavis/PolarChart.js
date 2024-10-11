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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M13,11V1h-1C5.93,1,1,5.93,1,12v1h10v10h1c6.07,0,11-4.93,11-11v-1h-10ZM16.9,13c-.4,1.96-1.94,3.5-3.9,3.9v-3.9h3.9ZM11,3.06v2.02c-3.06.44-5.48,2.86-5.92,5.92h-2.02c.46-4.17,3.78-7.48,7.94-7.94ZM7.1,11c.4-1.96,1.94-3.5,3.9-3.9v3.9h-3.9ZM13,20.94v-2.02c3.06-.44,5.48-2.86,5.92-5.92h2.02c-.46,4.17-3.78,7.48-7.94,7.94Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M15,1.26v7.74h7.73c-1.11-3.71-4.02-6.63-7.73-7.74ZM17,7v-2.62c1.03.69,1.92,1.58,2.61,2.62h-2.61Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M9,22.74v-7.74H1.26c1.11,3.71,4.03,6.63,7.74,7.74ZM7,17v2.62c-1.04-.69-1.93-1.58-2.62-2.62h2.62Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
const PolarChart = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PolarChart as default
};
