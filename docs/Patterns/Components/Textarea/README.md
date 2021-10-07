---
title: "Textarea"
lang: en-US
---



# Text Field Area

A text field area is meant to provide users with a suitable field size to accomodate more than a single line of text. Text field areas can be found on forms, dialogs, background and foreground surfaces and sometimes in tables.


## Components

<ComponentCard component="FeatherTextarea" package="textarea" />

## Anatomy

The text field area consists of all the same general elements that the standard text field contains. The primary difference between the two is the omission of any icons inside the text field container.

![MockUp](./Text_Field_Area-web-resources/image/Mockup.png)

## Usage

Use text field area when a user needs to provide more than a single line of input text.

In general, the height of the text field should be determined based on a number of factors such as context, expected input length and available space.

By default text field areas should be static, providing a scrollbar to users if the text falls outside the bounds of the container.

### When to use

-   Use a text field area when the user input required may wrap to a second line.
-   Text field areas may be found in dialogs and forms often and are sometimes used on surfaces and in tables.

### When Not to use

-   Text field areas should never be used when the text input is expected to be shorter than 1 line of text.
-   Never use text field areas where the layout doesn’t support it - text field areas should be wide enough to accomodate at least 40 characters. In some very rare circumstances they may be used with as few as 20 characters, but this should be a last resort.
-   Text field areas should never be used when the input requires a mask. For example, if a user needs to input a series of phone numbers, a text field area with dash characters should not be used.

## Accessibility

Text field area components should follow the standard accessibility patterns for standard text fields. Labels should always be present and aria roles clearly defined.

## Responsive Design

Text field areas must be carefully considered for responsive design. If a text field area exists in an interface, the designer may want to consider showing only a portion of the input, or hiding it alltogether and relying on progressive disclosure to reveal the contents.
