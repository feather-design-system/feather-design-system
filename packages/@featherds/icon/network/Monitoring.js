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
    createElementVNode("path", { d: "M21.72,3c-.17-.3-.43-.55-.73-.73-.3-.17-.65-.27-1-.27h-12c-.35,0-.69.09-1,.27-.3.17-.55.43-.73.73-.17.3-.27.65-.27,1v2h1.98v-2.01h12.02s0,16.02,0,16.02H7.99v-2.01h-1.98v2c0,.35.09.69.27,1,.17.3.43.55.73.73.3.17.65.27,1,.27h12c.35,0,.69-.09,1-.27.3-.17.55-.43.73-.73.17-.3.27-.65.27-1V4c0-.35-.09-.69-.27-1Z" }, null, -1),
    createElementVNode("path", { d: "M8.78,12.39l1.22-2.43,3.22,6.43c.15.3.45.48.78.48s.63-.19.78-.48l1.76-3.52h1.46c.23,0,.45-.09.62-.26.17-.16.26-.38.26-.62s-.09-.45-.26-.62c-.16-.17-.38-.26-.62-.26h-2c-.33,0-.63.19-.78.48l-1.22,2.43-3.22-6.43c-.14-.27-.44-.44-.78-.44s-.65.17-.78.44l-1.76,3.52H2c-.23,0-.45.09-.62.26-.17.16-.26.38-.26.62s.09.45.26.62c.16.17.38.26.62.26h6c.33,0,.63-.19.78-.48Z" }, null, -1)
  ]));
}
const Monitoring = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Monitoring as default
};
