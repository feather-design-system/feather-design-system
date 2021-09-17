<script>
import { FeatherInput } from "@featherds/input";
import PasswordIcon from "./PasswordIcon";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import { toRef, h } from "vue";

const LABELS = {
  show: "Show password",
  hide: "Hide password",
};

export default {
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props: {
    labels: {
      type: Object,
      default: () => {
        return LABELS;
      },
    },
  },
  data() {
    return {
      showPassword: false,
    };
  },
  watch: {
    showPassword() {
      this.$refs.input.focus();
    },
  },
  setup(props) {
    return useLabelProperty(toRef(props, "labels"), LABELS);
  },
  render() {
    const icon = h(PasswordIcon, {
      modelValue: this.showPassword,
      hide: this.hideLabel,
      show: this.showLabel,
      "onUpdate:modelValue": (val) => {
        this.showPassword = val;
      },
    });
    const attrs = { ...this.$attrs };
    delete attrs.clear; //dont allow clear in password.
    delete attrs.maxlength; //dont allow maxlength in password.
    return h(
      FeatherInput,
      {
        ...attrs,
        type: this.showPassword ? "input" : "password",
        ref: "input",
      },
      {
        post: () => icon,
      }
    );
  },
};
</script>
