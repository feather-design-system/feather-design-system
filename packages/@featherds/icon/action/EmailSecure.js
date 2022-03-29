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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M21.86,16H21V14a3,3,0,1,0-6,0v2h-.86A1.13,1.13,0,0,0,13,17.15v3.71a1.13,1.13,0,0,0,.09.45,1.15,1.15,0,0,0,1.05.69h7.72a1.15,1.15,0,0,0,1.05-.69,1.13,1.13,0,0,0,.09-.45V17.15A1.14,1.14,0,0,0,21.86,16ZM17,14a1,1,0,1,1,2,0v2H17Zm4,6H15V18h6Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M19,9h2V4a2,2,0,0,0-2-2H3A2,2,0,0,0,1,4V16a2,2,0,0,0,2,2h8V16H3V6.25l7.48,4.6a1,1,0,0,0,1,0L19,6.25Zm-8-.17L3.16,4H18.84Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var EmailSecure = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { EmailSecure as default };
