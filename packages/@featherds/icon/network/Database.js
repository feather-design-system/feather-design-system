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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,2c-.22,0-10-.1-10,3.5v12c0,2.78,5.89,3.5,10,3.5s10-.72,10-3.5V5.5c0-3.6-9.78-3.5-10-3.5ZM12,4c5,0,7.4.99,7.94,1.5-.54.51-2.94,1.5-7.94,1.5s-7.4-.99-7.94-1.5c.54-.51,2.94-1.5,7.94-1.5ZM20,17.43c-.54.51-3.88,1.57-8,1.57s-7.46-1.06-8-1.57v-3.69c.54.51,3,1.26,8,1.26,5.81,0,7.46-.75,8-1.26v3.69ZM20,11.43c-.54.51-3.62,1.57-8,1.57s-7.46-1.06-8-1.57v-3.69c.54.51,3,1.26,8,1.26s7.46-.75,8-1.26v3.69Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const Database = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Database as default
};
