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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,9A4,4,0,1,0,8,5,4,4,0,0,0,12,9Zm0-6.06A2.06,2.06,0,1,1,9.94,5,2.06,2.06,0,0,1,12,2.94Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M12,10c-1.88,0-8,.29-8,4v4.5A1.5,1.5,0,0,0,5.5,20h2a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5H6V14c0-.73,1-1.3,2.33-1.66A3.41,3.41,0,0,0,11,15.13v1.13A2.64,2.64,0,0,0,9,19a2.88,2.88,0,0,0,3,3,2.88,2.88,0,0,0,3-3,2.71,2.71,0,0,0-2-2.74V15.13a3.4,3.4,0,0,0,2.67-2.8C17,12.69,18,13.26,18,14v4H16.5a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h2A1.5,1.5,0,0,0,20,18.5V14C20,10.39,14.41,10,12,10Zm1.28,9A1.33,1.33,0,0,1,13,20a1.33,1.33,0,0,1-1,.32A1.33,1.33,0,0,1,11,20,1.6,1.6,0,0,1,11,18a1.33,1.33,0,0,1,1-.32A1.33,1.33,0,0,1,13,18,1.33,1.33,0,0,1,13.28,19ZM12,13.75a2,2,0,0,1-2.2-1.7A15.94,15.94,0,0,1,12,11.9a17.43,17.43,0,0,1,2.2.14A2,2,0,0,1,12,13.75Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var Provider = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Provider as default };
