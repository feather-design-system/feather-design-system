import { openBlock, createElementBlock, createStaticVNode } from "vue";
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
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path d="M3,14.99v3h2v-3c0-.55-.45-1-1-1s-1,.45-1,1Z"></path><path d="M7,11.99v6.01h2v-6.01c0-.55-.45-1-1-1s-1,.45-1,1Z"></path><path d="M15,12.99v5h2v-5c0-.55-.45-1-1-1s-1,.45-1,1Z"></path><path d="M11,14.99v3h2v-3c0-.55-.45-1-1-1s-1,.45-1,1Z"></path><path d="M19,8.99v9.01h2v-9.01c0-.55-.45-1-1-1s-1,.45-1,1Z"></path><rect x="2" y="20" width="20" height="2"></rect><path d="M3.71,11.69l4.29-4.29,4.29,4.3c.39.39,1.02.39,1.41,0l7.98-7.99c.39-.39.39-1.02,0-1.42-.39-.39-1.02-.39-1.41,0l-7.27,7.28-4.29-4.3c-.39-.39-1.02-.39-1.41,0l-5,5c-.39.39-.39,1.02,0,1.42.39.39,1.02.39,1.41,0Z"></path>', 7);
const _hoisted_9 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_9);
}
const Reporting = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Reporting as default
};
