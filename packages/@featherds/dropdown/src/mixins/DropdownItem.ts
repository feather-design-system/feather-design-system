import { defineComponent } from "vue";
export const props = {
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
};
export default defineComponent({
  props,
  data() {
    return {
      active: false,
    };
  },
  methods: {
    focus() {
      this.$el.querySelector("[tabindex]:not([tabindex='-1'])").focus();
    },
    blur() { },
  },
  computed: {
    _dropdownItem() {
      return true;
    },
  },
});
