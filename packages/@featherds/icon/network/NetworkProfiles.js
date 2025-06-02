import { createElementBlock, openBlock, createElementVNode } from "vue";
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
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createElementVNode("path", { d: "M12.35,8h-.7c-.36,0-.65.29-.65.65v3.85c0,.28.22.5.5.5h1c.28,0,.5-.22.5-.5v-3.85c0-.36-.29-.65-.65-.65ZM12.35,5h-.7c-.36,0-.65.29-.65.65v.7c0,.36.29.65.65.65h.7c.36,0,.65-.29.65-.65v-.7c0-.36-.29-.65-.65-.65ZM14,20v-1h-1v-2.07c3.95-.49,7-3.85,7-7.93,0-4.42-3.58-8-8-8S4,4.58,4,9c0,4.08,3.05,7.44,7,7.93v2.07h-1v1H3v2h7v1h4v-1h7v-2h-7ZM6,9c0-3.31,2.69-6,6-6s6,2.69,6,6-2.69,6-6,6-6-2.69-6-6ZM12.35,8h-.7c-.36,0-.65.29-.65.65v3.85c0,.28.22.5.5.5h1c.28,0,.5-.22.5-.5v-3.85c0-.36-.29-.65-.65-.65ZM12.35,5h-.7c-.36,0-.65.29-.65.65v.7c0,.36.29.65.65.65h.7c.36,0,.65-.29.65-.65v-.7c0-.36-.29-.65-.65-.65ZM12.35,8h-.7c-.36,0-.65.29-.65.65v3.85c0,.28.22.5.5.5h1c.28,0,.5-.22.5-.5v-3.85c0-.36-.29-.65-.65-.65ZM12.35,5h-.7c-.36,0-.65.29-.65.65v.7c0,.36.29.65.65.65h.7c.36,0,.65-.29.65-.65v-.7c0-.36-.29-.65-.65-.65Z" }, null, -1)
  ]));
}
const NetworkProfiles = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  NetworkProfiles as default
};
