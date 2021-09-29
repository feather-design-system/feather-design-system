import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {};
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,2,4,5v6.09C4,16.1,7.41,20.81,12,22c4.59-1.15,8-5.86,8-10.91V5ZM6,11.05V6.35l5-1.87v15A9.48,9.48,0,0,1,6,11.05Zm12,0a9.51,9.51,0,0,1-5,8.41v-15l5,1.87Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Security = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Security as default };
