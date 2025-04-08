<script lang="ts">
import { FeatherRipple } from "@featherds/ripple";
import { defineComponent, h } from "vue";
export const props = {
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
} as const;
export default defineComponent({
  inheritAttrs: false,
  props,
  render() {
    let icon;
    const hasIcon =
      this.$slots.icon &&
      this.$slots
        .icon()
        .findIndex(
          (o) =>
            (o.children && o.children.length !== 0) ||
            (o.type && (o.type as any).render)
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
    let post;
    if (this.$slots.post) {
      post = h("span", { class: "feather-list-item-post" }, this.$slots.post());
    }
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
        [icon, text, post, ripple]
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
      [icon, text, post, ripple]
    );
    return h("li", {}, [anchor]);
  },
});
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;
@use "@featherds/styles/themes/utils" as utils;
@use "../../scss/variables" as list-vars;
li {
  list-style: none;
  white-space: nowrap;
}
.feather-list-item {
  list-style: none;
  @include typo.body-small();
  color: var(vars.$secondary-text-on-surface);
  height: list-vars.$feather-list-height;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  @include utils.state-on-surface();
  &.selected {
    color: var(vars.$primary-text-on-surface);
  }
  &.disabled {
    cursor: default;
    color: var(vars.$disabled-text-on-surface);
    @include utils.state-disabled();
  }
  .feather-list-item-text {
    flex: 1;
  }
  .feather-list-item-icon {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
    font-size: 1.125rem;
    width: 1em;
  }
  .feather-list-item-post {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

li.feather-list-item.highlighted {
  box-shadow: inset 3px 0 0px 0px var(vars.$primary);
  &.disabled {
    outline: 0;
    box-shadow: none;
  }
}
a.feather-list-item {
  text-decoration: none;
  &:focus {
    outline: 0;
    box-shadow: inset 0 0 0 1px var(vars.$primary);
  }
  &:hover,
  &:focus,
  &:active,
  &:visited {
    text-decoration: none;
    color: var(vars.$secondary-text-on-surface);
  }
  &.disabled {
    outline: 0;
    box-shadow: none;
    &:hover,
    &:focus,
    &:active,
    &:visited {
      text-decoration: none;
      color: var(vars.$disabled-text-on-surface);
    }
  }
}
</style>
