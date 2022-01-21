export default {
  props: {
    hint: {
      type: String,
    },
    error: {
      type: String,
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      subTextOptions: this.$props,
    };
  },
};
