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
    createElementVNode("path", { d: "M20,8c0-.36-.19-.73-.5-.91l-7-3.96c-.16-.09-.33-.13-.5-.13s-.35.04-.5.13l-7,3.96c-.31.18-.5.55-.5.91v8c0,.36.19.73.5.91l7,3.96c.15.09.33.13.5.13s.35-.04.5-.13l6.99-3.96c.31-.18.5-.55.5-.91v-8ZM18,15.5l-6,3.5-6-3.5v-7l6-3.5,6,3.5v7ZM15,11v2h-2v2h-2v-2h-2v-2h2v-2h2v2h2Z" }, null, -1)
  ]));
}
const ContainerAdd = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ContainerAdd as default
};
