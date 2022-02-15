---
title: "Form Validation"
pre: "@featherds/input"
description: "Guidance and support for effective forms."
lang: en-US
tags: ["validation", "component"]
menu: components
---

Web applications are often fundamentally a means to consume or present information. When designing forms, aside from having well-designed controls and sensible layouts, forms should always be clear about their validation.
Feather DS controls are designed to work well with common validation paradigms, but we typically like to use;

- Vee-Validate
- Yup

::: tip Recommendation
We really like **Yup** for it's expressive and flexible schemas and so we use it in the examples below
:::

## Examples

<Forms-ValidationExamples />

## Patterns

We encourage you to use best practices for validation like in the example above;

- Use inline validation
- Validate on blur
- Communicate your errors clearly
- Indicate which fields are required
- Summarise errors and link to the field

## Elements

Feather DS elements that you can use in valdiation contexts include;

- `Autocomplete`
- `Checkbox`
- `DateInput`
- `Input`
- `ProtectedInput`
- `Radio`
- `Select`
- `Textarea`

## Setup

See the `Validation Setup` example above for a working implementation of the below.

### Components

Simply add `schema` props to any inputs you need to validate and configure the rules in your code. We provide a basic `ValidationHeader` component from the [Input](/Components/Input/) package for convenience, should you require it.

```html
<ValidationHeader :errorList="errorMessages" />
<FeatherInput label="Email *" :modelValue="email" :schema="emailV" required />
```

### useForm

The crux of the validation is the `useForm` composable. This uses the Vue Provide/Inject pattern to enable validation in any form controls. As long as you instance the `useForm` in your parent component setup method where your form is declared, all components will automatically register if they have a schema supplied to them.

That means all you have to do is simply call the `validate` function when appropriate to validate the entire form. You can pass the output of the function to the `ValidationHeader` component and it will display the errors in a list for extra usability.

```js
import { useForm } from "@featherds/input-helper";

export default {
  setup() {
    const form = useForm();
    //...
    const onSubmit = (e) => {
      e.preventDefault();
      //run validation and assign the error messages to a variable
      errorMessages.value = form.validate();
      //...
    };
  },
};
```
