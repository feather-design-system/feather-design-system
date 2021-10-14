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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,10A4,4,0,1,0,8,6,4,4,0,0,0,12,10Zm0-6.1A2.1,2.1,0,1,1,9.9,6,2.1,2.1,0,0,1,12,3.9Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M12.86,14.86a.5.5,0,0,0-.86.35V17H9a1,1,0,0,0,0,2h3v1.79a.49.49,0,0,0,.85.35l2.79-2.79a.49.49,0,0,0,0-.7Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M12,11c-2.67,0-8,1.34-8,4v3a1,1,0,0,0,1,1H6a1,1,0,0,0,0-2H6V15c0-.64,3-2.11,6-2.11s6,1.47,6,2.11v2h0a1,1,0,0,0,0,2h1a1,1,0,0,0,1-1V15C20,12.34,14.67,11,12,11Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
var ChangeOwner = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { ChangeOwner as default };
