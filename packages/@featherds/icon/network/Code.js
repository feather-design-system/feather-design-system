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
    createElementVNode("path", { d: "M9.2,16.4l-4.4-4.4,4.4-4.4c.39-.39.39-1.01,0-1.4h0c-.39-.39-1.01-.39-1.4,0l-5.8,5.8,5.8,5.8c.39.39,1.01.39,1.4,0h0c.39-.39.39-1.01,0-1.4ZM14.8,16.4l4.4-4.4-4.4-4.4c-.39-.39-.39-1.01,0-1.4h0c.39-.39,1.01-.39,1.4,0l5.8,5.8-5.8,5.8c-.39.39-1.01.39-1.4,0h0c-.39-.39-.39-1.01,0-1.4Z" }, null, -1)
  ]));
}
const Code = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Code as default
};
