export default {
  props: {
    highlight: {
      type: String,
      default: "off",
      validator(v) {
        // The value must match either
        return ["off", "ignore-case"].indexOf(v) !== -1;
      },
    },
  },
};
