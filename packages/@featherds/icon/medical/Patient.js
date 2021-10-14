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
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,11c-2.67,0-8,1.36-8,4V19a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V15C20,12.36,14.67,11,12,11Zm-1,7.09H5.9v-3c0-.57,2.47-1.79,5.1-2.06Zm7.1,0H13V13c2.63.27,5.1,1.49,5.1,2.06Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M12,10A4,4,0,1,0,8,6,4,4,0,0,0,12,10Zm0-6.11A2.11,2.11,0,1,1,9.9,6,2.1,2.1,0,0,1,12,3.91Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var Patient = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Patient as default };
