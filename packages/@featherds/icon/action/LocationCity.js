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
    createElementVNode("rect", {
      x: "11",
      y: "9",
      width: "2",
      height: "2"
    }, null, -1),
    createElementVNode("rect", {
      x: "11",
      y: "13",
      width: "2",
      height: "2"
    }, null, -1),
    createElementVNode("rect", {
      x: "11",
      y: "17",
      width: "2",
      height: "2"
    }, null, -1),
    createElementVNode("path", { d: "M22,9H17V6L12,1,7,6V9H2a1,1,0,0,0-1,1V23H23V10A1,1,0,0,0,22,9ZM7,21H3V19H5V17H3V15H5V13H3V11H7ZM15,9V21H9V6.83l3-3,3,3Zm6,4H19v2h2v2H19v2h2v2H17V11h4Z" }, null, -1)
  ]));
}
const LocationCity = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  LocationCity as default
};
