import { openBlock, createElementBlock, createElementVNode } from "vue";
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
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12.52,1.15a1,1,0,0,0-1,0L3,6.41A2,2,0,0,0,2,8.12V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V8.12a2,2,0,0,0-.95-1.71ZM12,3l7.89,4.74L12,13,4.11,7.74ZM4,20V9.69l7.48,5.16a1,1,0,0,0,1,0L20,9.69V20Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const EmailDraft = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  EmailDraft as default
};
