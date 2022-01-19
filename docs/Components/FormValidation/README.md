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
* Vee-Validate
* Yup

::: tip Recommendation
We really like **Yup** for it's expressive and flexible schemas and so we use it in the examples below
:::

## Examples

<Forms-YupAll />

## Patterns

We encourage you to use best practices for validation like in the example above;
* Use inline validation
* Validate on blur
* Communicate your errors clearly
* Indicate which fields are required
* Summarise errors and link to the field

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
