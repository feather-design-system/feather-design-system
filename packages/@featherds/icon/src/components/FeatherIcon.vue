<script>
import { h, toRaw } from "vue";
export default {
  props: {
    icon: {
      type: Object,
      required: false,
    },
    flex: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: false,
    },
  },

  render(){
    const attrs = this.$attrs;
    const cls = attrs["class"]
      ? attrs["class"].split(" ").reduce((o, key) => {
          o[key] = true;
          return o;
        }, {})
      : {};
    const _attrs = {};
    cls["feather-icon"] = true;
    if (this.flex) {
      cls["feather-icon-flex"] = true;
    }
    if (this.title) {
      _attrs["aria-label"] = this.title;
      _attrs["aria-hidden"] = "false";
    } else {
      _attrs["aria-hidden"] = "true";
    }
    _attrs["focusable"] = "false";
    _attrs["role"] = "img";

    let icon = toRaw(this.icon);
    if (this.$slots.default) {
      return h("span", { class: "feather-icon-container" }, [
          h(this.$slots.default()[0], {
            class: cls,
            ..._attrs,
          }),
        ]);
    }

    return h(icon, {
        class: cls,
        ..._attrs,
      });
  }
};
</script>

<style lang="scss" scoped>
.feather-icon {
  height: 1em;
  width: 1em;
  color: inherit;
  fill: currentColor;
  display: inline-block;
  overflow: visible;
  vertical-align: -0.125em;
}
.feather-icon-flex {
  vertical-align: baseline;
}

.feather-icon-container {
  :deep(svg) {
    height: 1em;
    width: 1em;
    color: inherit;
    fill: currentColor;
    display: inline-block;
    overflow: visible;
    vertical-align: -0.125em;
  }
  :deep(.feather-icon-flex) {
    vertical-align: baseline;
  }
}
</style>
