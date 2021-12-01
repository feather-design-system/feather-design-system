---
title: "Button"
lang: en-US
pre: "@featherds/button"
description: "An interaction point to help users initiate actions or navigate through your application."
tags: ["Button", "component"]
layout: ComponentLayout
---

## Design

There are 4 types of Buttons, each styled to reflect a level in the visual hierarchy;

* **Primary**<br />
  filled shapes with "knockout text" to ensure that they have the most contrast of any Button
* **Secondary**<br />
  consist of a stroked shape with colored text, implying that the button has a parent container without being visually dominant
* **Text button**<br />
  uses an "invisible" shape, relying on the styling of the text to convey the importance of the component
* **Icon button**<br />
  uses an icon to communicate an action to the user


<OverlineLinks title="Related Components">
<OverlineLink href="#icon-button">Icon Button</OverlineLink>
<OverlineLink :href="$withBase('/Components/BackButton/')">Back Button</OverlineLink>
</OverlineLinks>

## Examples

<Button-Examples />

## Usage

Choose the type of Button based on the importance of the action. They can exist as optional interaction points that have an effect on one or more parts of the application, or interaction may be required to proceed farther into the experience. Buttons may be used in the following examples:

1. Dialogs
2. Modal Windows
3. Forms
4. Cards
5. Toolbars

## Button

### Props

| Name      | Description                                                                                                              | Type      | Required | Default |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | --------- | -------- | ------- |
| primary   | applies the primary styling to the Button                                                                                | `Boolean` | `false`  | -       |
| secondary | applies the secondary styling to the Button                                                                              | `Boolean` | `false`  | -       |
| text      | applies the text-only styling to the Button                                                                              | `Boolean` | `false`  | -       |
| icon      | should be set to the label to be given to the icon. This option restricts the size of the Button so only an icon can fit | `String`  | `false`  | -       |
| disabled  | applies the disabled styling to the Button. Note Button can still be interacted with as a normal Button                  | `Boolean` | `false`  | -       |
| asAnchor  | when true will use an `anchor` element instead of a Button. This allows you to set the `href` attribute                  | `Boolean` | `false`  | -       |
| onColor   | changes the colors for use when the background is non-standard                                                           | `Boolean` | `false`  | -       |

### Events

- `click` - emitted when button is clicked. Though if button is disabled then `disabled-click` is emitted.
- `disabled-click` - emitted when button is clicked and disabled.

### Slots

- `default` - content of the button. Place text in here or an icon when `icon` property is set.
- `icon` - icon to be displayed alongside the text content of default. It is a separate slot so we can ensure correct spacing.

## Icon Button
Icon Button is a special configuration of our Button. It only supports text based styling, any other type will be ignored. Utilize the `icon` property to pass in an appropriate label for the Icon Button. In the examples above see the "Icon Button".

```html
<template>
  <FeatherButton icon="Add">
    <FeatherIcon :icon="icon"> </FeatherIcon>
  </FeatherButton>
</template>
<script>
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import icon from "@featherds/icon/action/Add";
export default {
  computed: {
    icon() {
      return icon;
    },
  },
  components: {
    FeatherIcon,
    FeatherButton,
  },
};
</script>

```

## Text Icon Button

When using an icon alongside text you should **always** mark the icon as `aria-hidden="true"`. You may also notice that sometimes the text and icon are out of alignment. Unfortunately due to the different aspect ratios of some of our icons this will happen. Please use the following technique to adjust the vertical align.

```html
<style>
  .backup-button svg {
    margin-bottom: 3px;
  }
</style>
<FeatherButton :disabled="disabled" primary type="submit">
  <template v-slot:icon>
    <FeatherIcon :icon="backup" aria-hidden="true" focusable="false" />
    Submit Primary Button
  </template>
</FeatherButton>
```
