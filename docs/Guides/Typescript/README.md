---
title: "Typescript"
pre: "Guide"
description: "Guidance around typescript"
lang: en-US
tags: ["typescript", "guide"]
menu: guides
---

## Plugins

Before we start looking at some code we **strongly** recommend the use of the [Volar plugin](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar). Whilst [Vuter](https://marketplace.visualstudio.com/items?itemName=yoyo930021.vuter) also provides typescript support, currently Volar extends that support to typing in the template of a SFC (Single File Component).

## Typechecking

If you are using [Vue CLI v5](https://cli.vuejs.org/guide/) with typescript chances are you are using [Fork TS Checker](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) as this is the default when using Vue CLI. This plugin is great but it does not provide type checking in the template of a SFC. If you want that you will need to delete the Fork TS Checker and define a prebuild step that will compile your project using [vue-tsc](https://www.npmjs.com/package/vue-tsc). A word of caution here; we find using the Volar plugin provides us enough feedback for our development builds to fix any typing issues that occur. We then rely on vue-tsc to validate this at build time. If strict type checking during a development build is important to you then we recommend just continuing to use the Vue CLI default.

Update your `vue.config.js` to remove the plugin:

```js
module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete("fork-ts-checker");
  },
};
```

Add a prebuild step:

```json
{
  "scripts": {
    "prebuild": "vue-tsc --noEmit",
    "build": "vue-cli-service build"
  }
}
```

## Best Practices

### DefineComponent

You _must_ use [defineComponent](https://v3.vuejs.org/api/global-api.html#definecomponent) when creating a component otherwise typing inside the `setup` method will not work. Note you can still use the option API if you wish though we recommend utilizing the `setup` method for the best typescript experience.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  ...
})
```

### Props

Providing good types for your props allows consumers of your component to ensure they are using it correctly.

Props of a complex type (`Object` or `Array`) should always be properly typed.

```ts
import { defineComponent, PropType } from "vue";
export interface IPerson {
  name: string;
}
export default defineComponent({
  props: {
    person: {
      type: Object as PropType<Person>,
    },
    people: {
      type: Array as PropType<Person[]>,
    },
  },
});
```

A prop can have multiple types.

```ts
import { defineComponent, PropType } from "vue";
export interface IPerson {
  name: string;
}
export default defineComponent({
  props: {
    value: {
      type: [Object, Array] as PropType<Person | Person[]>,
    },
  },
});
```

A prop can have a default value. **NOTE** do not use the method definition syntax when defining `default` or `validator` functions, typing will not work, please use anonymous arrow functions as show in these examples.

```ts
import { defineComponent, PropType } from "vue";
export interface IPerson {
  name: string;
}
export default defineComponent({
  props: {
    people: {
      type: Array as PropType<Person[]>,
      default: () => [] as Person[],
    },
  },
});
```

A prop can have a validator function. **NOTE** do not use the method definition syntax when defining `default` or `validator` functions, typing will not work, please use anonymous arrow functions as show in these examples.

```ts
import { defineComponent, PropType } from "vue";
export interface IPerson {
  name: string;
}
export default defineComponent({
  props: {
    person: {
      type: Array as PropType<Person>,
      validator: (v: Person) => {
        return v.name !== "Rik";
      },
    },
  },
});
```

### Emits

Typing emits is not quite as elegant as typing props but it still provides great benefits to consumers who can easily determine what types are being emitted from a component.

Typing an event requires you to pass a typed validation function as the option. In the example below you can see we simply return `true` to skip any validation checking. If you want you can perform validation, but typically we just return `true` to get the typing benefit.

```ts
import { defineComponent } from "vue";
export interface IPerson {
  name: string;
}
export default defineComponent({
  emits: {
    selected: (_v: IPerson) => true,
  },
});
```

:::tip NOTE
When defining the emits object you can prefix the value property with an underscore to avoid the unused parameters error from typescript compliation.
:::
