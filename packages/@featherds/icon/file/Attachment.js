import { openBlock, createElementBlock, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,2A5.66,5.66,0,0,0,7,7.74V18a4,4,0,0,0,4.39,4A4.12,4.12,0,0,0,15,17.83V8.52A2.5,2.5,0,0,0,12.24,6,2.61,2.61,0,0,0,10,8.66v8.59a.75.75,0,0,0,1.5,0V8.52a1,1,0,0,1,2,0V18a2.5,2.5,0,0,1-2.76,2.49A2.6,2.6,0,0,1,8.5,17.86V7.51a4,4,0,0,1,4.39-4A4.12,4.12,0,0,1,16.5,7.68V18H18V7.51A5.51,5.51,0,0,0,12,2Z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var Attachment = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Attachment as default };
