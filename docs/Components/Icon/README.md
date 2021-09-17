---
title: "Icon"
lang: en-US
tags: ["Icon", "component"]
layout: ComponentLayout

---

`@featherds/icon`



## FeatherIcon

@@@ Icon-ExampleFeatherIcon


### Props

| Name  | Description                                         | Type      | Required | Default |
| ----- | --------------------------------------------------- | --------- | -------- | ------- |
| icon  | Should be icon componet to be rendered              | `Object`  | `true`   | -       |
| flex  | Should be used when icon is inside a flex container | `Boolean` | `false`  | `false` |
| title | Set this when you want to give a label to the icon. | `String`  | `false`  | -       |

### Accessibility

If you are using an icon that is described by the text along side it or the labelling of the icon is taken care of by a parent control (`FeatherButton`) then you don't need to use the `title` property. If there is no text then you must use the `title` property to help describe what the icon is for.


#### Feather import

```js
import AddAlert from "@featherds/icon/alert/AddAlert";
```


## Icons

<Icon-AllIcons />
