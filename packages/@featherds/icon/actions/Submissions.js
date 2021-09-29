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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M21.06,8.22V3H11V6.89L10.07,6h-6a2,2,0,0,0-2,2V18a2,2,0,0,0,2,2h16a2,2,0,0,0,2-2V10A2,2,0,0,0,21.06,8.22ZM13,5h6.06V8H13ZM20.07,18h-16V8H9.24l2,2h8.83Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Submissions = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Submissions as default };
