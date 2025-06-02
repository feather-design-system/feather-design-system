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
    createElementVNode("path", { d: "M12,1C5.93,1,1,5.93,1,12s4.93,11,11,11,11-4.93,11-11S18.07,1,12,1ZM12,21c-4.96,0-9-4.04-9-9S7.04,3,12,3s9,4.04,9,9-4.04,9-9,9ZM7.47,9.01c-.77,1.43-.56,3.24.64,4.45,1.06,1.06,2.61,1.35,3.93.88l2.52,2.52c.22.22.55.22.77,0l1.52-1.52c.22-.22.22-.55,0-.77l-2.52-2.52c.47-1.33.18-2.87-.88-3.93-1.12-1.12-2.76-1.37-4.13-.78l2.8,2.8-1.77,1.77-2.89-2.89Z" }, null, -1)
  ]));
}
const Utilities = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Utilities as default
};
