import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {};
const _hoisted_1 = {
  id: "Icons",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("g", null, [
  /* @__PURE__ */ createElementVNode("path", { d: "M12,13A3.5,3.5,0,1,0,8.5,9.5,3.5,3.5,0,0,0,12,13Zm0-5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12,8Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M19.33,18.78a10,10,0,1,0-14.66,0h0c.24.25.48.49.74.72h0a10,10,0,0,0,13.18,0h0c.26-.23.5-.47.74-.72ZM12,4a8,8,0,0,1,6.61,12.5,10,10,0,0,0-13.22,0A8,8,0,0,1,12,4ZM6.73,18a7.73,7.73,0,0,1,3-1.69,8,8,0,0,1,4.48,0,7.73,7.73,0,0,1,3,1.69A8,8,0,0,1,6.73,18Z" })
], -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var AccountCircle = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { AccountCircle as default };
