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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("circle", {
  cx: "9",
  cy: "16",
  r: "1"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("circle", {
  cx: "12",
  cy: "16",
  r: "1"
}, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("path", { d: "M15,17h0a1,1,0,0,0,0-2h0a1,1,0,0,0,0,2Z" }, null, -1);
const _hoisted_5 = /* @__PURE__ */ createElementVNode("path", { d: "M18,11H17V7.64A4.83,4.83,0,0,0,12,3,4.83,4.83,0,0,0,7,7.64V11H6a1,1,0,0,0-1,1v6a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V12A1,1,0,0,0,18,11ZM9,7.64A2.84,2.84,0,0,1,12,5a2.84,2.84,0,0,1,3,2.64V11H9ZM17,18a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V13H17Z" }, null, -1);
const _hoisted_6 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4,
  _hoisted_5
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_6);
}
const LockPasswordProtected = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  LockPasswordProtected as default
};
