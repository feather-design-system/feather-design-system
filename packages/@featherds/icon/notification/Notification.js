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
    createElementVNode("path", { d: "M10,21h4c0,1.1-.9,2-2,2s-2-.9-2-2ZM20.93,20H3.07c-.4,0-.64-.45-.42-.78l2.35-3.53v-5.45c0-3.53,2.51-6.68,6-7.17v-1.07c0-.28.11-.53.29-.71s.43-.29.71-.29.53.11.71.29.29.43.29.71v1.08c3.39.49,6,3.4,6,6.92v5.7l2.35,3.53c.22.33-.02.78-.42.78ZM18.13,18l-1.13-1.7v-6.3c0-2.76-2.24-5-5-5s-5,2.24-5,5v6.3l-1.13,1.7h12.26Z" }, null, -1)
  ]));
}
const Notification = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Notification as default
};
