<script lang="ts">
import { FeatherInput, FeatherInputProps } from "@featherds/input";
import PasswordIcon from "./PasswordIcon.vue";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import { toRef, h, defineComponent, PropType, DefineComponent } from "vue";

const LABELS = {
  show: "Show password",
  hide: "Hide password",
};
export const props = {
  ...FeatherInputProps,
  labels: {
    type: Object as PropType<Partial<typeof LABELS>>,
    default: () => {
      return LABELS;
    },
  },
} as const;
export const emits = {
  "update:modelValue": (v: string) => true,
};
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props,
  emits,
  data() {
    return {
      showPassword: false,
    };
  },
  watch: {
    showPassword() {
      (this.$refs.input as HTMLInputElement).focus();
    },
  },
  setup(props) {
    return {
      //wrapping in computed labels to avoid hideLabel conflict from inputwrapper
      computedLabels: useLabelProperty<typeof LABELS>(
        toRef(props, "labels"),
        LABELS
      ),
    };
  },
  render() {
    const icon = h(PasswordIcon, {
      modelValue: this.showPassword,
      hide: this.computedLabels.hideLabel.value,
      show: this.computedLabels.showLabel.value,
      "onUpdate:modelValue": (val) => {
        this.showPassword = val;
      },
    });
    const attrs = { ...this.$attrs };
    delete attrs.clear; //dont allow clear in password.
    delete attrs.maxlength; //dont allow maxlength in password.
    return h(
      FeatherInput as unknown as DefineComponent,
      {
        ...attrs,
        ...this.$props,
        type: this.showPassword ? "input" : "password",
        ref: "input",
      },
      {
        post: () => icon,
      }
    );
  },
});
</script>
