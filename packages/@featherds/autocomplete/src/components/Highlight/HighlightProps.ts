export default {
  highlight: {
    type: String,
    default: "off",
    validator(v: string) {
      // The value must match either
      return ["off", "ignore-case"].indexOf(v) !== -1;
    },
  },
};
