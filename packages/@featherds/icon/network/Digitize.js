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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M22,13H2v-2h20v2ZM5,18h2v-4h-2v4ZM5,21c0,.55.45,1,1,1h1v-2h-2v1ZM17,14v2h2v-2h-2ZM17,22h1c.55,0,1-.45,1-1v-3h-2v4ZM9,22h2v-4h-2v4ZM9,16h2v-2h-2v2ZM13,22h2v-2h-2v2ZM13,18h2v-4h-2v4ZM14.41,1.8h-7.41c-1.1,0-2,.9-2,2v6.2h2V3.8h6v4.2h4v2h2v-3.61L14.41,1.8Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const Digitize = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Digitize as default
};
