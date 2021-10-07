import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {};
const _hoisted_1 = {
  id: "Icons",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M3,16H8v3h2V14H3a1,1,0,0,0-1,1H2A1,1,0,0,0,3,16ZM8,8H3A1,1,0,0,0,2,9H2a1,1,0,0,0,1,1h7V5H8Zm6,11h2V16h5a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H14ZM16,8V5H14v5h7a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var FullscreenExit = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { FullscreenExit as default };
