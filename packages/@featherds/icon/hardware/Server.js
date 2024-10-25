import { openBlock, createElementBlock, createStaticVNode } from "vue";
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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<circle cx="8" cy="14" r="1"></circle><circle cx="12" cy="14" r="1"></circle><circle cx="16" cy="14" r="1"></circle><circle cx="8" cy="6" r="1"></circle><path d="M12,7h4a1,1,0,0,0,0-2H12a1,1,0,0,0,0,2Z"></path><path d="M19,1H5A2,2,0,0,0,3,3V17a2,2,0,0,0,2,2h6v2H3v2H21V21H13V19h6a2,2,0,0,0,2-2V3A2,2,0,0,0,19,1Zm0,16H5V11H19Zm0-8H5V3H19Z"></path>', 6);
const _hoisted_8 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_8);
}
const Server = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Server as default
};
