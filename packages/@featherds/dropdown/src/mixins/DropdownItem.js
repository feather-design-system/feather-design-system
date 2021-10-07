export default {
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    focus() {
      this.$el.querySelector("[tabindex]:not([tabindex='-1'])").focus();
    },
    blur() {},
  },
  computed: {
    _dropdownItem() {
      return true;
    },
  },
};
