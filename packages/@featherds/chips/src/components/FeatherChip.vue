<script>
import { inject, h } from "vue";
import GridChip from "./chips/GridChip";
import ReadonlyChip from "./chips/ReadonlyChip";
import RadioChip from "./chips/RadioChip";

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    labels: {
      type: Object,
    },
    condensed: {
      type: Boolean,
      default: false,
    },
    value: undefined,
  },
  setup() {
    const format = inject("chipListFormat", false);
    return { format };
  },
  render() {
    const renderChip = (component) => {
      return h(
        component,
        {
          ...this.$props,
          ...this.$attrs,
        },
        {
          default: this.$slots.default,
          ...(this.$slots.icon && { icon: this.$slots.icon }),
        }
      );
    };
    if (this.format === "grid") {
      return renderChip(GridChip);
    }
    if (this.format === "radio") {
      return renderChip(RadioChip);
    }
    return renderChip(ReadonlyChip);
  },
};
</script>
