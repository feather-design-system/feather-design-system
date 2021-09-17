var translateKey = {
  props: {
    translationKey: {
      type: String,
      default: "",
    },
  },
  methods: {
    translate: function (key) {
      return this.$t
        ? this.$t(this.translationKey + key)
        : "Vue i18n is not loaded";
    },
  },
};
export { translateKey };
