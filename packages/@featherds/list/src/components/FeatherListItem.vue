<script>
import { FeatherRipple } from "@featherds/ripple";
import { h } from "vue";
export default {
  inheritAttrs: false,
  props: {
    asLi: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    highlighted: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    let icon;
    const hasIcon =
      this.$slots.icon &&
      this.$slots
        .icon()
        .findIndex(
          (o) =>
            (o.children && o.children.length !== 0) || (o.type && o.type.render)
        ) !== -1;
    if (hasIcon) {
      icon = h(
        "span",
        { class: ["feather-list-item-icon"] },
        {
          default: this.$slots.icon,
        }
      );
    }
    const text = h(
      "span",
      { class: ["feather-list-item-text"] },
      { default: this.$slots.default }
    );
    const ripple = this.disabled ? undefined : h(FeatherRipple);
    if (this.asLi) {
      return h(
        "li",
        {
          ...this.$attrs,
          class: [
            "feather-list-item hover focus",
            {
              selected: this.selected,
              highlighted: this.highlighted,
              disabled: this.disabled,
            },
            this.$attrs.class || "",
          ],
        },
        [icon, text, ripple]
      );
    }
    const anchor = h(
      "a",
      {
        ...this.$attrs,
        class: [
          "feather-list-item focus hover",
          {
            selected: this.selected,
            disabled: this.disabled,
          },
          this.$attrs.class || "",
        ],
      },
      [icon, text, ripple]
    );
    return h("li", {}, [anchor]);
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/mixins/typography";
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/themes/utils";
@import "../../scss/variables";
li {
  list-style: none;
  white-space: nowrap;
}
.feather-list-item {
  list-style: none;
  @include body-small();
  color: var($secondary-text-on-surface);
  height: $feather-list-height;
  padding: 0 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  @include state-on-surface();
  &.selected .feather-list-item-text {
    color: var($primary-text-on-surface);
  }
  &.disabled {
    cursor: default;
    color: var($disabled-text-on-surface);
    @include state-disabled();
    .feather-list-item-icon {
      color: var($disabled-text-on-surface);
    }
  }
  .feather-list-item-text {
    flex: none;
  }
  .feather-list-item-icon {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    font-size: 18px;
    color: var($secondary-text-on-surface);
    width: 1em;
  }
}

li.feather-list-item.highlighted {
  box-shadow: inset 3px 0 0px 0px var($primary);
  &.disabled {
    outline: 0;
    box-shadow: none;
  }
}
a.feather-list-item {
  &:focus {
    outline: 0;
    box-shadow: inset 0 0 0 1px var($primary);
  }
  &:hover,
  &:focus,
  &:active,
  &:visited {
    text-decoration: none;
    color: var($secondary-text-on-surface);
  }
  &.disabled {
    outline: 0;
    box-shadow: none;
    &:hover,
    &:focus,
    &:active,
    &:visited {
      text-decoration: none;
      color: var($disabled-text-on-surface);
    }
  }
}
</style>
