import { createElementBlock, openBlock, createElementVNode } from "vue";
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
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createElementVNode("path", { d: "M21.01,3H3.01c-1.1,0-2,.9-2,2v14c0,1.1.9,2,2,2h18c1.1,0,2-.9,2-2V5c0-1.1-.9-2-2-2ZM3.01,19V5h18v14s-18,0-18,0ZM8.72,7.29c.18.18.29.43.29.71s-.11.53-.29.71-.43.29-.71.29h-2c-.28,0-.53-.11-.71-.29s-.29-.43-.29-.71.11-.53.29-.71.43-.29.71-.29h2c.28,0,.53.11.71.29ZM8.72,11.29c.18.18.29.43.29.71s-.11.53-.29.71-.43.29-.71.29h-2c-.28,0-.53-.11-.71-.29s-.29-.43-.29-.71.11-.53.29-.71.43-.29.71-.29h2c.28,0,.53.11.71.29ZM8.72,15.29c.18.18.29.43.29.71s-.11.53-.29.71-.43.29-.71.29h-2c-.28,0-.53-.11-.71-.29s-.29-.43-.29-.71.11-.53.29-.71.43-.29.71-.29h2c.28,0,.53.11.71.29ZM18.01,10,12.01,11c-.63,0-1,.37-1,1v3.86c0,.63.37,1.14,1,1.14h6c.63,0,1-.37,1-1v-4c0-.63-.37-1-1-1v-1s0-.75-.38-1.5-1.12-1.5-2.62-1.5-2.25.75-2.62,1.5-.38,1.5-.38,1.5v1ZM14.01,10c0-.27.11-.52.29-.71s.43-.29.71-.29.53.11.71.29.29.43.29.71v1h-2v-1ZM17.01,15h-4v-2h4v2Z" }, null, -1)
  ]));
}
const CertificateAlt = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  CertificateAlt as default
};
