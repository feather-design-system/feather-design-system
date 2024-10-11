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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M18,11H9V7.64A2.84,2.84,0,0,1,12,5a2.84,2.84,0,0,1,3,2.64V8a1,1,0,0,0,2,0V7.64A4.83,4.83,0,0,0,12,3,4.83,4.83,0,0,0,7,7.64V11H6a1,1,0,0,0-1,1v6a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V12A1,1,0,0,0,18,11Zm-1,7a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V13H17Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const Unlock = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Unlock as default
};
