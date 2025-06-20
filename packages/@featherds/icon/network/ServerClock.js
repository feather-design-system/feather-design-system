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
    createElementVNode("path", { d: "M14,19h-1v-2.07h0c3.94-.49,7-3.86,7-7.93,0-4.41-3.59-8-8-8S4,4.59,4,9c0,4.07,3.06,7.44,7,7.93h0v2.07h-1v1h-6v2h6v1h4v-1h6v-2h-6v-1ZM6,9c0-3.31,2.69-6,6-6s6,2.69,6,6-2.69,6-6,6-6-2.69-6-6ZM14,13c.33,0,.65-.16.84-.46.3-.47.17-1.09-.29-1.39l-2.54-1.66v-3.48c0-.56-.45-1.01-1-1.01s-1,.45-1,1.01v4.03c0,.34.17.66.46.84l3,1.96c.17.11.36.16.54.16Z" }, null, -1)
  ]));
}
const ServerClock = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ServerClock as default
};
