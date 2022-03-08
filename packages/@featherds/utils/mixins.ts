const translateKey = {
  props: {
    translationKey: {
      type: String,
      default: "",
    },
  },
  methods: {
    translate: function (this: IComponent, key: string) {
      return this.$t
        ? this.$t(this.translationKey + key)
        : "Vue i18n is not loaded";
    },
  },
};

interface IComponent {
  translationKey: string;
  $t: (s: string) => void;
}
export { translateKey };
