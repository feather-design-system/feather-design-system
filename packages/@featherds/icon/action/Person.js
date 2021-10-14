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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,12A4,4,0,1,0,8,8,4,4,0,0,0,12,12Zm0-6.1A2.1,2.1,0,1,1,9.9,8,2.1,2.1,0,0,1,12,5.9Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M12,13c-7.91,0-8,5.94-8,6a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1C20,18.94,19.91,13,12,13ZM6.2,18c.42-1.2,1.72-3,5.8-3s5.39,1.8,5.8,3Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var Person = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Person as default };
