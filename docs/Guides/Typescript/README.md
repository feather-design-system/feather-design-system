---
title: "Typescript"
pre: "Guide"
description: "Guidance around typescript"
lang: en-US
tags: ["typescript", "guide"]
menu: guides
---

## Plugins

The Volar plugin has been deprecated.  We **strongly** recommend the use of the [Official Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.volar)  For TypeScript vue support, [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) is recommended.  Currently TypeScript v5.6.2 is supported.

## Typechecking

We recommend defining a prebuild step that will compile your project using [vue-tsc](https://www.npmjs.com/package/vue-tsc). We find using the Volar plugin provides us enough feedback for our development builds to fix any typing issues that occur. We then rely on vue-tsc to validate this at build time.

Add a prebuild step and/or augment build step:

```json
{
  "scripts": {
    "prebuild": "vue-tsc --noEmit",
    "build": "vue-tsc -b vite"
  }
}
```

## Best Practices

### Composition API

We previously recommended the use of [defineComponent](https://vuejs.org/api/general.html#definecomponent) for creating components with optimal TypeScript support.  This is no longer true.  [Composition API](https://vuejs.org/api/sfc-script-setup.html#script-setup) has advanced to become the defacto standard for Vue component development and provides optimal TypeScript support.

```vue
<template>
  <div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
</style>
```

### Extensions

- [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)

```snippet
vbase-3-ts-setup
```

### Props

Providing good types for your props allows consumers of your component to ensure they are using it correctly.

Props of a complex type (`Object` or `Array`) should always be properly typed.

#### Example 1: Basic Prop Typing

```vue
<template>
  <div>{{ person.name }}</div>
</template>

<script setup lang="ts">
interface Person {
  name: string;
}

const props = defineProps<{
  person: Person;
}>();
</script>
```

#### Example 2: Array Props with Default Values

```vue
<template>
  <div>
    <div v-for="person in people" :key="person.name">
      {{ person.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Person {
  name: string;
}

// Using withDefaults for props with default values
const props = withDefaults(defineProps<{
  people: Person[];
  defaultName?: string;
}>(), {
  people: () => [],
  defaultName: 'John Doe'
})
</script>
```

#### Example 3: Props with Runtime Validation

```vue
<template>
  <div>{{ person.name }}</div>
</template>

<script setup lang="ts">
interface Person {
  name: string;
  age: number;
}

const props = defineProps<{
  person: Person;
}>()

// Runtime validation can be done using watch or watchEffect
watchEffect(() => {
  if (props.person.age < 0) {
    console.warn('Age cannot be negative')
  }
})
</script>
```

#### Example 4: Generic Props

```vue
<template>
  <div>{{ value }}</div>
</template>

<script setup lang="ts">
interface Props<T> {
  value: T;
  validator?: (value: T) => boolean;
}

const props = defineProps<Props<string>>();

watchEffect(() => {
  if (props.validator && !props.validator(props.value)) {
    console.warn('Validation failed for value:', props.value)
  }
})
</script>
```

These examples demonstrate modern Vue 3 Composition API patterns with TypeScript, including:

- Basic prop typing
- Array props with default values using `withDefaults`
- Runtime validation using watchers
- Generic prop types

The Composition API with `<script setup>` provides better type inference and a more concise syntax compared to the Options API.

### Emits

Type-safe emits in Vue 3's Composition API provide excellent TypeScript support and help ensure correct event handling.

#### Example 1: Basic Event Typing

```vue
<script setup lang="ts">
interface Person {
  name: string;
  age: number;
}

const emit = defineEmits<{
  (e: 'selected', person: Person): void
  (e: 'deleted', id: number): void
}>()

const selectPerson = (person: Person) => {
  emit('selected', person)
}
</script>
```

#### Example 2: Type-Safe Event Validation

```vue
<script setup lang="ts">
interface UpdateEvent {
  id: number;
  value: string;
}

const emit = defineEmits<{
  (e: 'update', payload: UpdateEvent): void
  (e: 'error', message: string): void
}>()

const handleUpdate = (value: string) => {
  if (value.length < 3) {
    emit('error', 'Value must be at least 3 characters')
    return
  }

  emit('update', {
    id: 1,
    value
  })
}
</script>
```

#### Example 3: Generic Event Types

```vue
<script setup lang="ts">
interface DataEvent<T> {
  data: T;
  timestamp: number;
}

const emit = defineEmits<{
  <T>(e: 'data', event: DataEvent<T>): void
  (e: 'ready'): void
}>()

const sendData = <T>(data: T) => {
  emit('data', {
    data,
    timestamp: Date.now()
  })
}
</script>
```

:::tip NOTE
The Composition API's `defineEmits` provides better type inference than the Options API approach. You don't need to use underscore prefixes or return `true` for validation - the type system handles everything.
:::

These examples demonstrate:

- Type-safe event definitions
- Multiple event types with different payloads
- Generic event typing
- Built-in type checking without runtime validation overhead
