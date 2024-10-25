import { openBlock, createElementBlock, createElementVNode } from "vue";
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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M19.01,3h-4.18c-.42-1.16-1.52-2-2.82-2s-2.4.84-2.82,2h-4.18c-1.1,0-2,.9-2,2v16c0,1.1.9,2,2,2h14c1.1,0,2-.9,2-2V5c0-1.1-.9-2-2-2ZM12.01,2.67c.35,0,.69.14.94.39s.39.59.39.94-.14.69-.39.94-.59.39-.94.39-.69-.14-.94-.39-.39-.59-.39-.94.14-.69.39-.94.59-.39.94-.39ZM19.01,21H5.01V5h2v1c0,.55.45,1,1,1h8c.55,0,1-.45,1-1v-1h2v16ZM17.01,11h-6v-2h6v2ZM17.01,15h-6v-2h6v2ZM9.01,11h-2v-2h2v2ZM9.01,15h-2v-2h2v2ZM17.01,19h-6v-2h6v2ZM9.01,19h-2v-2h2v2Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const InventoryAlt = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  InventoryAlt as default
};
