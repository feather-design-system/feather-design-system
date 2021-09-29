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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,6l7.53,13H4.47L12,6M10.27,5,2.74,18a2,2,0,0,0,1.73,3H19.53a2,2,0,0,0,1.73-3L13.73,5A2,2,0,0,0,10.27,5ZM13,15H11v2h2Zm-1-5h0a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V11A1,1,0,0,0,12,10Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Warning = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Warning as default };
