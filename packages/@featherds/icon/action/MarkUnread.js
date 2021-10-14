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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<rect x="7" y="13" width="9" height="2" rx="1"></rect><path d="M8,11h4V9H8a1,1,0,0,0-1,1H7A1,1,0,0,0,8,11Z"></path><path d="M12,5H8A1,1,0,0,0,7,6H7A1,1,0,0,0,8,7h4Z"></path><rect x="7" y="17" width="9" height="2" rx="1"></rect><path d="M18,21H5V3h7V1H5A2,2,0,0,0,3,3V21a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8L18,9Z"></path><path d="M15,11a1,1,0,0,0,1-1V7l6-3L14.72.36A.5.5,0,0,0,14,.81V10A1,1,0,0,0,15,11Z"></path>', 6);
const _hoisted_8 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_8);
}
var MarkUnread = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { MarkUnread as default };
