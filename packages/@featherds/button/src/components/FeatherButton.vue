<script>
import { h } from "vue";
import { FeatherRipple } from "@featherds/ripple";
export default {
  inheritAttrs: false,
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    asAnchor: {
      type: Boolean,
      default: false,
    },
    onColor: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    const getClasses = () => {
      let buttonClass = "";
      if (this.primary) {
        buttonClass = "btn-primary";
      }

      if (this.secondary) {
        buttonClass = "btn-secondary";
      }

      if (this.text || this.icon) {
        buttonClass = "btn-text";
      }

      const classArr = ["btn", "hover", "focus", buttonClass];
      if (this.icon) {
        classArr.push("btn-icon");
        classArr.push("btn-icon-table");
      }
      if (this.onColor) {
        classArr.push("on-color");
      }
      return classArr;
    };

    const tag = this.asAnchor ? "a" : "button";
    const data = {};

    const _attrs = JSON.parse(JSON.stringify(this.$attrs));

    data.attrs = _attrs || {};
    if (this.asAnchor) {
      data.attrs.role = "button";
    } else {
      data.attrs.type = data.attrs.type || "button";
    }

    if (this.disabled) {
      data.attrs["aria-disabled"] = "true";
    }
    data.on = {
      onClick: (e) => {
        if (this.disabled) {
          this.$emit("disabled-click", e);
        } else {
          this.$emit("click", e);
        }
      },
    };

    const classes = getClasses();
    data.class = ([this.$attrs.class] || []).concat(classes);

    if (this.$slots.icon) {
      data.class.push("has-icon");
    }

    let ripple = h(FeatherRipple);
    if (this.disabled) {
      ripple = undefined;
    }

    if (this.icon && this.$slots.default) {
      const label = this.icon;
      data.attrs["aria-label"] = label;
      data.attrs["title"] = label;
      return h(tag, { ...data.attrs, ...data.on, class: data.class }, [
        this.$slots.default(),
        h(FeatherRipple, { center: true }),
      ]);
    }

    const content = h("span", { class: ["btn-content"] }, [
      this.$slots.default ? this.$slots.default() : "",
    ]);
    return h(tag, { ...data.attrs, ...data.on, class: data.class }, [
      this.$slots.icon ? this.$slots.icon() : undefined,
      content,
      ripple,
    ]);
  },
};
</script>

<style lang="scss" scoped>
@import "~@featherds/styles/mixins/typography";
@import "~@featherds/styles/mixins/elevation";
@import "~@featherds/styles/mixins/flex";
@import "~@featherds/styles/themes/utils";
@import "~@featherds/styles/themes/variables";

@mixin disabled-styles() {
  &[aria-disabled="true"] {
    cursor: default;
    color: var($shade-2);
    border-color: transparent;
    box-shadow: none;
    @include state-disabled();
    &:focus,
    &:hover,
    &:active,
    &:visited {
      cursor: default;
      color: var($shade-2);
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
    }
  }
}
@mixin disabled-styles-on-color() {
  &[aria-disabled="true"] {
    @include state-disabled();
    color: var($state-color-on-color);
    opacity: 0.5;
  }
}

.btn {
  height: 36px;
  padding: 0 16px;
  border-radius: 4px;
  margin-top: $spacing-xl;
  margin-bottom: $spacing-xl;
  display: inline-block;
  border: none;
  cursor: pointer;
  position: relative;
  @include button();
  line-height: 32px;
  vertical-align: middle;
  min-width: 64px;
  white-space: nowrap;
  &:hover {
    text-decoration: none;
  }
  &:focus {
    outline: none !important;
  }
  &::-moz-focus-inner {
    outline: none;
    border-color: transparent;
  }
  :deep(svg) {
    position: relative;
  }

  + .btn {
    margin-left: $spacing-xs;
  }
}
.btn-content {
  position: relative;
}
.btn-primary {
  background-color: var($primary);
  color: var($primary-text-on-color);
  box-shadow: var($shadow-2);
  border: 2px solid transparent;
  @include button-state-on-color();
  @include disabled-styles();
  &:visited {
    color: var($primary-text-on-color);
  }

  &[aria-disabled="true"] {
    background-color: var($shade-4);
    @include state-disabled($shade-4);
    &:focus,
    &:hover,
    &:active,
    &:visited {
      background-color: var($shade-4);
    }
  }
  + .btn-primary,
  + .btn-secondary {
    margin-left: $spacing-m;
  }
}

.btn-secondary {
  background-color: transparent;
  color: var($primary);
  border: 2px solid var($border-on-surface);
  @include state-on-surface();
  @include disabled-styles();
  &:focus {
    border-color: var($primary);
  }
  &:visited {
    color: var($primary);
  }
  &[aria-disabled="true"] {
    border-color: var($shade-4);
    @include state-disabled();
    &:focus,
    &:hover,
    &:active,
    &:visited {
      border-color: var($shade-4);
    }
  }
  &.on-color {
    color: var($state-color-on-color);
    border: 2px solid var($state-color-on-color);
    @include state-on-color();

    &:focus {
      border-color: var($state-color-on-color);
    }
    &:visited {
      color: var($state-color-on-color);
    }

    &[aria-disabled="true"] {
      @include disabled-styles-on-color();
      border-color: var($state-color-on-color);
      &:focus,
      &:hover,
      &:active,
      &:visited {
        border-color: var($state-color-on-color);
      }
    }
  }
  + .btn-primary,
  + .btn-secondary {
    margin-left: $spacing-m;
  }
}
.btn-text {
  color: var($primary);
  background-color: transparent;
  border: 2px solid transparent;
  padding: 0 8px;
  @include state-on-surface();
  @include disabled-styles();
  &:hover {
    border-color: alpha(
      $state-color-on-surface,
      var($state-opacity-hover-on-surface)
    );
  }
  &:focus {
    border-color: var($primary);
  }

  &:visited {
    color: var($primary);
  }

  &.on-color {
    color: var($state-color-on-color);
    @include state-on-color();
    &:hover {
      border-color: alpha(
        $state-color-on-color,
        var($state-opacity-hover-on-color)
      );
    }
    &:focus {
      border-color: var($state-color-on-color);
    }

    &:visited {
      color: var($state-color-on-color);
    }

    &[aria-disabled="true"] {
      @include disabled-styles-on-color();
      border-color: transparent;
    }
  }
}

.btn.btn-icon {
  padding: 0;
  display: inline-flex;
  height: 36px;
  width: 36px;
  min-width: 36px;
  border-radius: 100%;
  @include center();
  :deep(svg) {
    width: 24px;
    font-size: 24px;
    vertical-align: middle;
  }
}
.btn.has-icon {
  padding: 0 16px 0 12px;
  display: inline-flex;
  align-items: center;
  &.btn-text {
    padding: 0 8px;
  }
}
.btn.has-icon :deep(svg) {
  width: 18px;
  height: 18px;
  font-size: 18px;
  display: inline-block;
  margin-right: 8px;
}
</style>
