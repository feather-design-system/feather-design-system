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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M7.65,8.82l-3.18,3.18,3.18,3.18c.2.2.29.45.29.71s-.1.51-.29.71c-.1.1-.21.17-.33.22s-.25.07-.38.07-.26-.02-.38-.07-.23-.12-.33-.22L1.64,12l4.6-4.6c.2-.2.45-.29.71-.29s.51.1.71.29.29.45.29.71-.1.51-.29.71ZM17.82,7.4c-.2-.2-.45-.29-.71-.29s-.51.1-.71.29-.29.45-.29.71.1.51.29.71l3.18,3.18-3.18,3.18c-.2.2-.29.45-.29.71s.1.51.29.71c.1.1.21.17.33.22s.25.07.38.07.26-.02.38-.07.23-.12.33-.22l4.6-4.6-4.6-4.6ZM14.24,3.03c-.27-.07-.54-.02-.76.11s-.39.35-.46.62l-4,16c-.07.27-.02.54.11.76s.35.39.62.46c.04.01.08.02.12.02s.08,0,.12,0c.22,0,.44-.08.61-.21s.3-.32.36-.55L14.97,4.24c.07-.27.02-.54-.11-.76s-.35-.39-.62-.46Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const ViewCode = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ViewCode as default
};
