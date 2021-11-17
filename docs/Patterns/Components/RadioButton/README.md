---
title: "Radio Button/Group"
lang: en-US
---

# Radio Button / Group

Radio buttons allow users to choose one option from a list of mutually exclusive alternatives. A pair of radio buttons will provide a binary choice similar to a checkbox. An important difference between a pair of radio buttons and a checkbox is that the radio button group may start in a state where neither option is selected (neither yes nor no). This can be especially useful when an explicit choice is required of the user, where we cannot make a default assumption about their preference.

## Components

## Radio Button Design

The radio button design has been kept minimal, while the animation during interaction provides another level of visual interest. As the radio button is selected, the inner-circle grows from the center and the radio button may inherit the product color. Radio buttons are closely aligned with Google’s Material Design standards.

## Radio Button Anatomy

The radio button consists of the button element and it’s label. Radio buttons are always presented in groups, never individually. Only one radio button in a group may be selected at any given time. To allow the user to select multiple options, check boxes should be used.

![Radio Button Anatomy](./assets/Radio_Buttons.png)

## Behavior

- Both the icon and text should be clickable. Clicking on either will toggle the current state of the radio button.
- By default, text should be to the right of the radio button
  - there may be scenarios where the text may be to the left, above or below the radio button
- Radio buttons should not generally be presented as disabled, however this may be allowed in the following circumstances
  - an input screen where the ability to select radio buttons is controlled by another control (e.g. a table row does not allow the row to be selected)
- On an output screen only the text associated with a radio button should be displayed (not the radio button itself)
- There should always be at least two radio buttons in a group
- (optional) A label should be provided above the radio buttons giving their usage.
- By default radio buttons should be presented in a single row, however if there are many radio buttons then multiple columns may be used.
  - If using a single row then the spacing between radio buttons can vary (it is dictated by the text length and padding)
  - If using multiple columns then the radio button should align vertically and the click area of the associated text should be consistent.
  - If there are many options (e.g. greater than 20) then a different control should be considered

## Best Practices

- Default State
  - In most cases, a radio button group should not have an option selected by default.
  - Only select an option by default when you are confident that it is in the user’s best interest.
  - If our system knows a user’s preference from a previously saved state, then we should consider allowing a radio button group to be set to that saved state upon page load
- Language and Phrasing
  - The language provided after a radio button should describe the state which the system will be in while that option is selected.
  - The language should be as brief as possible.

## Error Handling

- each group of radio buttons should receive a single error message positioned below the group

## Accessibility

- The text associated with a radio button should make it clear what the selected state will represent
- The user can tab into a group of radio buttons and then use the arrow keys to move around them. Enter or space should select/deselect each radio button (de-selection is only allowed if the group is optional)
- When the user tabs into a group of radio buttons focus is given to the selected radio button or, if none is selected, then focus is given to the first radio button in the grpup.

## Responsive Behavior

- on larger screens the radio buttons should exist in a single row, as the screen narrows these should be collapsed to a single column.
