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
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", { d: "M12,13A3.5,3.5,0,1,0,8.5,9.5,3.5,3.5,0,0,0,12,13Zm0-5a1.5,1.5,0,1,1-1.5,1.5A1.5017,1.5017,0,0,1,12,8Z" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M19.3331,18.7828a10,10,0,1,0-14.6662,0l.0079.0086a10.0378,10.0378,0,0,0,.7379.7193h0a9.96,9.96,0,0,0,13.1746,0h0a10.0378,10.0378,0,0,0,.7379-.7193ZM12,4a7.9939,7.9939,0,0,1,6.6058,12.5046,9.9492,9.9492,0,0,0-13.2116,0A7.9939,7.9939,0,0,1,12,4ZM6.7323,18.0056a7.8127,7.8127,0,0,1,3.0267-1.688,8.0655,8.0655,0,0,1,4.4821,0,7.813,7.813,0,0,1,3.0266,1.688,7.9538,7.9538,0,0,1-10.5354,0Z" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_4);
}
var AccountCircle = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { AccountCircle as default };
