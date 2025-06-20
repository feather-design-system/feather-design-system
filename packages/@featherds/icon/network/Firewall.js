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
    createElementVNode("path", { d: "M20.5,13H3.5c-.83,0-1.5.67-1.5,1.5v7c0,.83.67,1.5,1.5,1.5h17c.83,0,1.5-.67,1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5ZM20,21H4v-6h16v6ZM8,17c.27,0,.52.11.71.29s.29.44.29.71-.11.52-.29.71-.44.29-.71.29-.52-.11-.71-.29-.29-.44-.29-.71.11-.52.29-.71.44-.29.71-.29ZM12,17c.27,0,.52.11.71.29s.29.44.29.71-.11.52-.29.71-.44.29-.71.29-.52-.11-.71-.29-.29-.44-.29-.71.11-.52.29-.71.44-.29.71-.29ZM16,17c.27,0,.52.11.71.29s.29.44.29.71-.11.52-.29.71-.44.29-.71.29-.52-.11-.71-.29-.29-.44-.29-.71.11-.52.29-.71.44-.29.71-.29ZM20,2H4c-1.1,0-2,.9-2,2v6c0,1.1.9,2,2,2h16c1.1,0,2-.9,2-2v-6c0-1.11-.89-2-2-2ZM4,4h4v2h-4v-2ZM10,10h-6v-2h6v2ZM10,4h6v2h-6v-2ZM20,10h-8v-2h8v2ZM20,6h-2v-2h2v2Z" }, null, -1)
  ]));
}
const Firewall = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Firewall as default
};
