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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm7.61,7.55L16.8,10.68A5,5,0,0,0,13.32,7.2l1.13-2.81A8,8,0,0,1,19.61,9.55ZM12,15a3,3,0,1,1,3-3A3,3,0,0,1,12,15ZM9.55,4.39,10.68,7.2A5,5,0,0,0,7.2,10.68L4.39,9.55A8,8,0,0,1,9.55,4.39ZM4.39,14.45,7.2,13.32a5,5,0,0,0,3.48,3.48L9.55,19.61A8,8,0,0,1,4.39,14.45Zm10.06,5.16L13.32,16.8a5,5,0,0,0,3.48-3.48l2.81,1.13A8,8,0,0,1,14.45,19.61Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const SupportCenter = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  SupportCenter as default
};
