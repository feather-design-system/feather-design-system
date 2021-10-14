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
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M13,14h1v1a1,1,0,0,0,2,0V14h1a1,1,0,0,0,0-2H16V11a1,1,0,0,0-2,0v1H13a1,1,0,0,0,0,2Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M20,6H12a2,2,0,0,0-2-2H4A2,2,0,0,0,2,6V18a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V8A2,2,0,0,0,20,6Zm0,12H4V6H9a1,1,0,0,1,1,1,1,1,0,0,0,1,1h9Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var FolderAdd = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { FolderAdd as default };
