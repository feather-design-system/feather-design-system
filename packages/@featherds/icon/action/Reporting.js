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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M3,15v3H5V15a1,1,0,0,0-2,0Z"></path><path d="M7,12v6H9V12a1,1,0,0,0-2,0Z"></path><path d="M15,13v5h2V13a1,1,0,0,0-2,0Z"></path><path d="M11,15v3h2V15a1,1,0,0,0-2,0Z"></path><path d="M19,9v9h2V9a1,1,0,0,0-2,0Z"></path><rect x="2" y="20" width="20" height="2"></rect><path d="M3.71,11.69,8,7.4l4.29,4.3a1,1,0,0,0,1.42,0l8-8a1,1,0,1,0-1.42-1.42L13,9.57,8.71,5.28a1,1,0,0,0-1.42,0l-5,5a1,1,0,0,0,0,1.41A1,1,0,0,0,3.71,11.69Z"></path>', 7);
const _hoisted_9 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_9);
}
const Reporting = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Reporting as default
};
