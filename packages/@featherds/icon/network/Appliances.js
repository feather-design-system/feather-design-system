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
    createElementVNode("path", { d: "M22,12h-4c-1.1,0-2,.9-2,2v8c0,1.1.9,2,2,2h4c1.1,0,2-.9,2-2v-8c0-1.1-.9-2-2-2ZM22,14v3h-4v-3h4ZM18,22v-3h4v3h-4ZM2,12h12v2h-3v3h2c.55,0,1,.45,1,1v1H4v-1c0-.55.45-1,1-1h2v-3H2c-1.1,0-2-.9-2-2V3C0,1.9.9,1,2,1h14c1.1,0,2,.9,2,2v7h-2V3H2v9Z" }, null, -1)
  ]));
}
const Appliances = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Appliances as default
};
