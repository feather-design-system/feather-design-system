## How to use InputWrapper

To make the input wrapper easier to use we have also created a mixin that goes along with it.

```html
<InputWrapper :for="inputId" :raised="isRaised" :focused="focused">
  ....
</InputWrapper>
```

- `for` should be an ID of the input control that the label is for.
- `raised` should be set to true when the label needs to be raised.
- `focused` should be set to true when the wrapper needs to be in a focused state.

## InputSubText

```html
<InputSubText :id="descriptionId"></InputSubText>
```

- `id` should be the ID you want the subText to have. This ID is generally used in an `aria-describedby`.
