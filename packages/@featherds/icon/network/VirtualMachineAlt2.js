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
    createElementVNode("path", { d: "M11.96,2.29l.02,1.97,7.02,3.87.04,7.69-7.02,3.93-7.02-3.87-.04-7.7,6.98-3.93s0,0,.02,0v-1.96M11.96,2.29c-.34,0-.68.09-.98.26L3.51,6.75c-.32.18-.51.51-.51.88l.04,8.82c0,.36.2.7.52.87l7.51,4.14c.3.17.63.25.97.25s.68-.09.98-.26l7.47-4.2c.32-.18.51-.51.51-.88l-.04-8.82c0-.36-.2-.7-.52-.87l-7.51-4.14c-.3-.17-.63-.25-.97-.25h0Z" }, null, -1),
    createElementVNode("polyline", {
      points: "20.13 7.45 12.05 12 3.92 7.52",
      fill: "none",
      stroke: "#000",
      "stroke-miterlimit": "10",
      "stroke-width": "1.96"
    }, null, -1),
    createElementVNode("line", {
      x1: "12",
      y1: "21",
      x2: "12",
      y2: "12",
      fill: "none",
      stroke: "#000",
      "stroke-miterlimit": "10",
      "stroke-width": "1.96"
    }, null, -1)
  ]));
}
const VirtualMachineAlt2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  VirtualMachineAlt2 as default
};
