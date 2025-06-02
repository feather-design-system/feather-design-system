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
    createElementVNode("path", { d: "M16,9c-3.87,0-7,3.13-7,7s3.13,7,7,7,7-3.13,7-7-3.13-7-7-7ZM16,21c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM22,2H1v2h21v-2ZM22,6H1v2h21v-2ZM1,12h7v-2H1v2ZM1,16h7v-2H1v2ZM1,20h7v-2H1v2ZM18,16h-2v-2c0-.28-.11-.53-.29-.71s-.43-.29-.71-.29-.53.11-.71.29-.29.43-.29.71v3c0,.28.11.53.29.71s.43.29.71.29h3c.28,0,.53-.11.71-.29s.29-.43.29-.71-.11-.53-.29-.71-.43-.29-.71-.29Z" }, null, -1)
  ]));
}
const LogsAlt = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  LogsAlt as default
};
