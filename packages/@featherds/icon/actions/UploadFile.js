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
  /* @__PURE__ */ createElementVNode("path", { d: "M21.41,6.41,16.59,1.59A2,2,0,0,0,15.17,1H8A2,2,0,0,0,6,3V6H8V3h7V8h5V19H11v2h9a2,2,0,0,0,2-2V7.83A2,2,0,0,0,21.41,6.41Z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M12.71,16.12a1,1,0,0,0,0-1.41L7,9,1.29,14.71A1,1,0,0,0,2.7,16.12L6,12.83V21a1,1,0,0,0,2,0V12.83l3.29,3.29A1,1,0,0,0,12.71,16.12Z" })
], -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var UploadFile = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { UploadFile as default };
