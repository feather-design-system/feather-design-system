<script lang="ts">
import { inject, h, defineComponent, DefineComponent, PropType } from "vue";
import GridChip from "./chips/GridChip.vue";
import ReadonlyChip from "./chips/ReadonlyChip.vue";
import RadioChip from "./chips/RadioChip.vue";
export const props = {
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
  value: {
    type: [String, Object, Number, Array, Boolean] as PropType<
      string | unknown | number | [] | boolean
    >,
  },
} as const;
export default defineComponent({
  props,
  setup() {
    const format = inject("chipListFormat", "");
    return { format };
  },
  render() {
    const renderChip = (component: unknown) => {
      return h(
        component as DefineComponent,
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
});
</script>
