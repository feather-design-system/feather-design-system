import { openBlock, createElementBlock, createStaticVNode } from "vue";
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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M21,4H3A2,2,0,0,0,1,6V18a2,2,0,0,0,2,2H21a2,2,0,0,0,2-2V6A2,2,0,0,0,21,4Zm0,14H3V6H21Z"></path><path d="M15,15h3a1,1,0,0,0,0-2H15a1,1,0,0,0,0,2Z"></path><path d="M15,11h3a1,1,0,0,0,0-2H15a1,1,0,0,0,0,2Z"></path><circle cx="8.5" cy="10" r="2"></circle><path d="M12,15.5c0-1.67-2-2.5-3.5-2.5S5,13.83,5,15.5V16h7Z"></path>', 5);
const _hoisted_7 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_7);
}
var IdCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { IdCard as default };
