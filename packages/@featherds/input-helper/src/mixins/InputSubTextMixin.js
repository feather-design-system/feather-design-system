export default {
  props: {
    hint: {
      type: String,
    },
    error: {
      type: String,
    },
  },
  provide() {
    return {
      subTextOptions: this.$props,
    };
  },
};
