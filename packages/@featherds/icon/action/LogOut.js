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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M15.3,7.7h0a1,1,0,0,0,0,1.4L17.2,11H8a1,1,0,0,0-1,1H7a1,1,0,0,0,1,1h9.2l-1.9,1.9a1,1,0,0,0,0,1.4h0a1,1,0,0,0,1.4,0L21,12,16.7,7.7A1,1,0,0,0,15.3,7.7ZM5,5h7a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H5A2,2,0,0,0,3,5V19a2,2,0,0,0,2,2h7a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H5Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var LogOut = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { LogOut as default };
