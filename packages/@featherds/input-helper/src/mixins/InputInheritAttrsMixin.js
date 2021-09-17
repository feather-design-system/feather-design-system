export default {
  inheritAttrs: false,
  computed: {
    inherittedAttrs() {
      return {
        class: this.$attrs.class,
        "data-ref-id": this.$attrs["data-ref-id"],
      };
    },
  },
};
