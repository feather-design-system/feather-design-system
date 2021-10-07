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
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("g", null, [
  /* @__PURE__ */ createElementVNode("path", { d: "M20,6H16V4a2,2,0,0,0-2-2H10A2,2,0,0,0,8,4V6H4A2,2,0,0,0,2,8V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V8A2,2,0,0,0,20,6ZM10,4h4V6H10ZM20,20H4V8H20Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M12,10h0a1,1,0,0,0-1,1v2H9a1,1,0,0,0-1,1H8a1,1,0,0,0,1,1h2v2a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V15h2a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H13V11A1,1,0,0,0,12,10Z" })
], -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Treatment = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Treatment as default };
