import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M15,14.5A3.5,3.5,0,0,0,11.5,11H4v1h7.5a2.5,2.5,0,0,1,0,5h-7a1.5,1.5,0,0,1,0-3h7a.5.5,0,0,1,0,1H4v1h7.5a1.5,1.5,0,0,0,0-3h-7a2.5,2.5,0,0,0,0,5h7A3.5,3.5,0,0,0,15,14.5Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M21.41,7.41,16.59,2.59A2,2,0,0,0,15.17,2H8A2,2,0,0,0,6,4V9H8V4h7V9h5V20H6a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V8.83A2,2,0,0,0,21.41,7.41Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var AttachFile = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { AttachFile as default };
