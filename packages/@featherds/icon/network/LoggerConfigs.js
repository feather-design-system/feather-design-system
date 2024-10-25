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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M15.71,12.49c.02-.16.04-.32.04-.49,0-.18-.01-.34-.04-.49l1.06-.83c.1-.08.12-.21.06-.33l-1-1.72c-.06-.11-.2-.15-.31-.11l-1.25.5c-.26-.2-.54-.36-.84-.49l-.19-1.33c-.03-.12-.12-.21-.25-.21h-2c-.12,0-.22.09-.24.21l-.19,1.33c-.3.12-.59.29-.84.49l-1.25-.5c-.11-.04-.25,0-.3.11l-1,1.72c-.06.11-.04.25.06.33l1.06.83c-.04.15-.06.32-.06.49s.01.32.04.49l-1.05.83c-.1.08-.12.21-.06.31l1,1.74c.06.11.19.15.31.11l1.24-.5c.26.2.54.36.85.49l.17,1.33c.03.12.12.21.25.21h2c.12,0,.22-.09.25-.21l.19-1.33c.3-.12.59-.29.84-.49l1.24.5c.11.05.25,0,.3-.11l1-1.74c.06-.11.04-.24-.06-.31l-1.04-.83ZM11.99,10.21c.47,0,.93.19,1.26.52s.52.79.52,1.26-.19.93-.52,1.26-.79.52-1.26.52-.93-.19-1.26-.52-.52-.79-.52-1.26.19-.93.52-1.26.79-.52,1.26-.52ZM19,1H5c-1.1,0-2,.9-2,2v18c0,1.1.9,2,2,2h14c1.1,0,2-.9,2-2V3c0-1.1-.9-2-2-2ZM19,21H5V3h14v18Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const LoggerConfigs = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  LoggerConfigs as default
};
