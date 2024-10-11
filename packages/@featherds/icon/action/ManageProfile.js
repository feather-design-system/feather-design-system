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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M9,11A4,4,0,1,0,5,7,4,4,0,0,0,9,11ZM9,4.9A2.1,2.1,0,1,1,6.92,7,2.1,2.1,0,0,1,9,4.9Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M3.2,17c.43-1.2,1.74-3,5.83-3H9.1a7.61,7.61,0,0,1,.51-2c-.2,0-.38,0-.58,0-7.94,0-8,5.94-8,6a1,1,0,0,0,1,1h8.11a7.8,7.8,0,0,1-.82-2Z" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M19.92,16.63a2.87,2.87,0,0,0,0-1.26l1-.87a.27.27,0,0,0,0-.32l-.8-1.37a.24.24,0,0,0-.3-.11l-1.26.42a3.65,3.65,0,0,0-1.08-.63l-.26-1.29A.26.26,0,0,0,17,11h-1.6a.24.24,0,0,0-.24.2l-.26,1.29a3.83,3.83,0,0,0-1.09.63l-1.26-.42a.23.23,0,0,0-.29.11l-.8,1.37a.26.26,0,0,0,0,.32l1,.87a4.34,4.34,0,0,0-.06.63,4.34,4.34,0,0,0,.06.63l-1,.87a.26.26,0,0,0,0,.32l.8,1.37a.23.23,0,0,0,.29.11l1.26-.42a3.83,3.83,0,0,0,1.09.63l.26,1.29a.24.24,0,0,0,.24.2H17a.26.26,0,0,0,.25-.2l.26-1.29a3.65,3.65,0,0,0,1.08-.63l1.26.42a.24.24,0,0,0,.3-.11l.8-1.37a.27.27,0,0,0,0-.32ZM16.22,18a2,2,0,1,1,2-2A2,2,0,0,1,16.22,18Z" }, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
const ManageProfile = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ManageProfile as default
};
