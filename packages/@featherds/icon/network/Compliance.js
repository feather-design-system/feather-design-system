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
    createElementVNode("path", { d: "M20,8.92v9.08l-2-2v-7h-6v-5h-6v16h8l2,2H6c-1.1,0-2-.9-2-2V4c0-1.1.9-2,2-2h6.26c.48,0,.94.17,1.3.48l5.74,4.92c.44.38.7.93.7,1.52ZM19.71,20.37c.39.39.39,1.02,0,1.41-.2.2-.45.29-.71.29s-.51-.1-.71-.29l-4.27-4.27c-.59.35-1.28.57-2.02.57-2.21,0-4-1.79-4-4s1.79-4,4-4,4,1.79,4,4c0,.74-.21,1.43-.57,2.02l4.27,4.27ZM14,14.08c0-1.1-.9-2-2-2s-2,.9-2,2,.9,2,2,2,2-.9,2-2Z" }, null, -1)
  ]));
}
const Compliance = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Compliance as default
};
