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
  viewBox: "0 0 24 24"
};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createElementVNode("circle", {
      cx: "12",
      cy: "6",
      r: "2"
    }, null, -1),
    createElementVNode("circle", {
      cx: "12",
      cy: "12",
      r: "2"
    }, null, -1),
    createElementVNode("circle", {
      cx: "12",
      cy: "18",
      r: "2"
    }, null, -1)
  ]));
}
const MoreVert = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  MoreVert as default
};
