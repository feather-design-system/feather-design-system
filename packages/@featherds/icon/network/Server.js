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
    createElementVNode("path", { d: "M7.29,6.71c-.18-.18-.29-.43-.29-.71s.11-.53.29-.71.43-.29.71-.29.53.11.71.29.29.43.29.71-.11.53-.29.71-.43.29-.71.29-.53-.11-.71-.29ZM12,7h4c.28,0,.53-.11.71-.29s.29-.43.29-.71-.11-.53-.29-.71-.43-.29-.71-.29h-4c-.28,0-.53.11-.71.29s-.29.43-.29.71.11.53.29.71.43.29.71.29ZM21,3v12c0,1.1-.9,2-2,2h-6v4h8v2H3v-2h8v-4h-6c-1.1,0-2-.9-2-2V3c0-1.1.9-2,2-2h14c1.1,0,2,.9,2,2ZM19,11H5v4h14v-4ZM19,3H5v6h14V3Z" }, null, -1),
    createElementVNode("rect", {
      width: "24",
      height: "24",
      fill: "none",
      "stroke-width": "0"
    }, null, -1)
  ]));
}
const Server = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Server as default
};
