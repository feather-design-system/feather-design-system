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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M21.41,6.41,16.59,1.59A2,2,0,0,0,15.17,1H8A2,2,0,0,0,6,3V6H8V3h7V8h5V19H14l-2,2h8a2,2,0,0,0,2-2V7.83A2,2,0,0,0,21.41,6.41Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M12.71,14.88a1,1,0,0,0-1.41,0L8,18.17V10a1,1,0,0,0-2,0v8.17L2.71,14.88a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L7,22l5.71-5.71A1,1,0,0,0,12.71,14.88Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var DownloadFile = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { DownloadFile as default };
