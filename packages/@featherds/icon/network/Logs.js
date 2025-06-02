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
    createElementVNode("path", { d: "M23.01,5v16c0,1.1-.9,2-2,2H3.01c-1.1,0-2-.9-2-2V5c0-1.1.9-2,2-2v18h18V3c1.1,0,2,.9,2,2ZM14.01,5c.28,0,.53-.11.71-.29s.29-.43.29-.71v-2c0-.28-.11-.53-.29-.71s-.43-.29-.71-.29-.53.11-.71.29-.29.43-.29.71v2c0,.28.11.53.29.71s.43.29.71.29ZM10.01,5c.28,0,.53-.11.71-.29s.29-.43.29-.71v-2c0-.28-.11-.53-.29-.71s-.43-.29-.71-.29-.53.11-.71.29-.29.43-.29.71v2c0,.28.11.53.29.71s.43.29.71.29ZM6.01,5c.28,0,.53-.11.71-.29s.29-.43.29-.71v-2c0-.28-.11-.53-.29-.71s-.43-.29-.71-.29-.53.11-.71.29-.29.43-.29.71v2c0,.28.11.53.29.71s.43.29.71.29ZM18.01,5c.28,0,.53-.11.71-.29s.29-.43.29-.71v-2c0-.28-.11-.53-.29-.71s-.43-.29-.71-.29-.53.11-.71.29-.29.43-.29.71v2c0,.28.11.53.29.71s.43.29.71.29ZM19.01,8H5.01v2h14v-2ZM19.01,12H5.01v2h14v-2ZM16.01,16H5.01v2h11v-2Z" }, null, -1)
  ]));
}
const Logs = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Logs as default
};
