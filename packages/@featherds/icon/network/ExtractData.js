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
    createElementVNode("path", { d: "M14,20H3V3h7v5h7c0-.53-.21-1.21-.59-1.59L11.59,1.59c-.38-.38-.88-.59-1.41-.59H3c-1.1,0-2,.9-2,2v17c0,1.1.9,2,2,2h11v-2ZM10,16h-2v-2h2v2ZM14,14h-2v-2h2v2ZM14,18h-2v-2h2v2ZM18,20h-2v-2h2v2ZM18,16h-2v-2h2v2ZM18,12h-2v-2h2v2ZM22,14h-2v-2h2v2ZM22,10h-2v-2h2v2ZM22,22h-2v-2h2v2ZM22,18h-2v-2h2v2Z" }, null, -1)
  ]));
}
const ExtractData = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ExtractData as default
};
