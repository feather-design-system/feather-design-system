<template>
  <div class="typography-container">
    <div v-for="item in types" :key="item.class" class="typography-example">
      <div class="alpha">
        <div :class="item.class" class="aa">Aa</div>
        <div class="subtext">{{ item.font }}</div>
      </div>
      <div class="example">
        <div :class="item.class" class="name">{{ item.text }}</div>
        <div class="subtext">{{ item.usage }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      types: [
        {
          class: "display1",
          font: "Inter Regular",
          text: "Display 1",
          usage: "Usage: For page titles and headlines. Use sparingly",
        },
        {
          class: "display2",
          font: "Inter Regular",
          text: "Display 2",
          usage: "Usage: For page titles and headlines. Use sparingly",
        },
        {
          class: "display3",
          font: "Inter Medium",
          text: "Display 3",
          usage: "Usage: For page titles and headlines. Use sparingly",
        },

        {
          class: "title",
          font: "Inter Light",
          text: "Title",
          usage:
            "Usage: For titles & short lines of copy for extra emphasis like quotes. Use sparingly.",
        },

        {
          class: "headline1",
          font: "Inter Semibold",
          text: "Headline 1",
          usage: "Usage: For screen titles and page titles. Use in moderation.",
        },
        {
          class: "headline2",
          font: "Inter Medium",
          text: "Headline 2",
          usage: "Usage: For screen titles and page titles. Use in moderation.",
        },
        {
          class: "headline3",
          font: "Inter Bold",
          text: "Headline 3",
          usage: "Usage: For screen titles and page titles. Use in moderation.",
        },
        {
          class: "headline4",
          font: "Inter Semibold",
          text: "Headline 4",
          usage: "Usage: For screen titles. Use in moderation.",
        },
        {
          class: "subtitle1",
          font: "Inter Bold",
          text: "Subtitle 1",
          usage: "Usage: Emphasized subtitle for sections. Use in moderation.",
        },
        {
          class: "subtitle2",
          font: "Inter Bold",
          text: "Subtitle 2",
          usage: "Usage: Emphasized subtitle for sections. Use in moderation.",
        },
        {
          class: "bodyLarge",
          font: "Open Sans Regular",
          text: "Body Large",
          usage: "Usage: for paragraph text and text within components.",
        },
        {
          class: "bodySmall",
          font: "Open Sans Regular",
          text: "Body Small",
          usage: "Usage: for paragraph text and lists.",
        },
        {
          class: "button",
          font: "Inter Bold",
          text: "Button Text",
          usage: "Usage: For buttons only.",
        },
        {
          class: "caption",
          font: "Open Sans Regular",
          text: "Caption Text",
          usage:
            "Usage: for caption text, helper text, counter text and in some cases component text",
        },
        {
          class: "overline",
          font: "Open Sans Semibold",
          text: "Overline Text",
          usage: "Usage: For tags, overline, label or category text.",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/mixins/typography" as typo;
@use "@featherds/styles/mixins/responsive" as resp;

.typography-container {
  margin-bottom: 1.5rem;
  .typography-example {
    display: flex;
    margin-bottom: 2.5rem;
    .alpha {
      width: 12.5rem;
      flex: none;
      .aa {
        border-bottom: 1px solid var(vars.$border-on-surface);
      }
    }
    .example {
      padding-left: 3.75rem;
    }
    .name,
    .aa {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid transparent;
    }
    .subtext {
      color: var(vars.$secondary-text-on-surface);
    }
  }
}

@include resp.media-query-below(m) {
  .typography-container .typography-example {
    .alpha {
      display: none;
    }
    .example {
      padding-left: 0;
    }
  }
}

.display1 {
  @include typo.display1();
}
.display2 {
  @include typo.display2();
}
.display3 {
  @include typo.display3();
}
.title {
  @include typo.title();
}

.headline1 {
  @include typo.headline1();
}
.headline2 {
  @include typo.headline2();
}
.headline3 {
  @include typo.headline3();
}
.headline4 {
  @include typo.headline4();
}

.subtitle1 {
  @include typo.subtitle1();
}
.subtitle2 {
  @include typo.subtitle2();
}

.bodyLarge {
  @include typo.body-large();
}
.bodySmall {
  @include typo.body-small();
}

.button {
  @include typo.button();
}

.caption {
  @include typo.caption();
}
.overline {
  @include typo.overline();
}
</style>
