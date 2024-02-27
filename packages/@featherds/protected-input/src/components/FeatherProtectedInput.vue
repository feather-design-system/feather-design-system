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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  "update:modelValue": (_v: string) => true,
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
    // ts(2769)
    // NOTE:
    const icon = h(PasswordIcon as any, {
      modelValue: this.showPassword,
      hide: this.computedLabels.hideLabel.value,
      show: this.computedLabels.showLabel.value,
      // ts(7006)
      "onUpdate:modelValue": (val: boolean) => {
        this.showPassword = val;
      },
    });
    const attrs = { ...this.$attrs };
    delete attrs.clear; //dont allow clear in password.
    delete attrs.maxlength; //dont allow maxlength in password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { labels, ...inputProps } = this.$props;
    // const { ...inputProps } = this.$props;
    return h(
      FeatherInput as unknown as DefineComponent,
      {
        ...attrs,
        ...inputProps,
        "onUpdate:modelValue": (val: string) => {
          this.$emit("update:modelValue", val);
        },
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
