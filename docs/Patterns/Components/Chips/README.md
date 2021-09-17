---
title: "Chips"
lang: en-US
---

# Chips

Chips are compact components that represent input, attribute, or action. Chips allow users to enter information, make selections, fi lter content, or trigger actions. While buttons are expected to appear consistently and with familiar calls to action, chips should appear dynamically as a group of multiple interactive elements.

## Component

<ComponentCard component="FeatherChip" package="Chips" />

## Chips Principles

- **Compact** - compact components that represent discrete information.
- **Relevant** - should have a clear and helpful relationship to the content or task they represent.
- **Focused** - should make tasks easier to complete, or content easier to sort.

## Chips Anatomy

Chips make use of a light fill or stroke to group the related elements using the gestalt principle of common region. Chips may contain a leading icon or image to provide additiona context for the label. Chips generally consist of a container that surrounds a leading icon or image and a label.

![Chips Anatomy](./Chips-web-resources/image/Chips_-_Anatomy.png)

### Chip Container

- A chip container will hold all the elements that make up a chip
- The size of the chip container is determined by the elements and sub-components that make up the chip
- The chip container may be configured with a maximum width that will see chip labels truncated when reached
- The default value for the maximum width is 288px (this will accomodate a 320px screen size)
- If the majority of chips are exceeding the maximum size, different paradigms should be explored such as list components, tables, radio buttons, etc.
- In some cases the chip container may grow to accomodate dynamic interactions - this will shift the horizontal position of any chips that follow the affected chip.
- The padding for chip elements may change depending on the type of chip being used.
- The chip container uses a fi ll color to defi ne the boundary. This color should be light enough to allow su cient contrast between the container background and the chip label. The
- label and and icon elements must meet a mimimum of WCAG AA contast compliance.
- The container makes use of a focus state that appears as a high contrast ring that surrounds the chip boundary

### Media

**THUMBNAIL**

- Thumbnails identify entities (like individuals) by displaying an avatar, logo or icon.
- Thumbnails are used primarily for identifying users or specific groups of users
- Thumbnail images are cropped to appear in a circle with 24px of diameter.
- Thumbnail images should be provided in such a way that they fully cover the circle, so the shortest dimension of the image must at least equal the diameter of the circle.
- If possible, the “image upload” experience should provide users with a way to position a non-square image so that the user-defined region of focus appears within the circle container
- If the implementation of a user-defi ned region of interest isn’t possible in the image upload experience, the image should be center-middle-aligned within the container

**ICONS**

- Icons may be used in lieu of a thumbnail image if the chip is being used to communicate a specific state or a more abstract concept.
  - When dealing with user identity, chips should ideally allow for a user portrait to be provided. This is not a requirement but is strongly encouraged.
- Icons should fit within the 24px “media” container
  - In most cases, an 18px icon should fit within the container
- Icons may be shown with a light grey background or with no background - ViD will provide guidance based on the use case
  - By default icons should use the light grey background (see style guide for specifics)

### Label

- The chip label should be concise and may be any of the following:
  - An entity name
  - a description (short)
  - a tag
  - an action
  - an alpha-numeric identifier
  - Predictive input
  - A selected menu item
  - A filter category
- The chip label may be taken from a single field or may be concatenated from multiple fields
- The style of the chip label size should remain consistent across all states except the disabled state
  - In some cases the chip label may use “bold” character styling, but this is highly discouraged. This character style should be reserved for potential future use-cases such as "activated states"
  - The chip label should never use "strikethrough, italic or underline styling"
  - The color should never change unless explicitly defined in the component, used in a UX prototype, or defined in a visual design specification
- Chip labels should not wrap. They should lie on a single-line only.

## Chips Behavior

### Truncation

**SIMPLE TRUNCATION**

- Truncation should be used when the user needs to enter and display a lengthy value
- The truncated text should be followed by an ellipsis ('...')
  - The ellipsis should be appended to the end of the text string with no space between the last character and the ellipsis
  - The ellipsis should be factored into the overall space requirements for truncation and should be subtracted from the available space for the chip label
- A chip should only display the number of characters that can fit on a single line within the width of the chip
- By default the maximum width of a chip before truncation is 288px
  - This value may be shorter or longer depending on the use case and will be defined by UX and Visual Design in a supplemental application-specific artifact.
  - Truncation at maximum width must also factor in icons, media and padding. With a media element and padding, the effective area for text is 240px

### Interaction

**CHIP CONTAINER**

- Chips support one distinct click point
  - the chip container, or the main body of the chip
- clicking on the main body of the chip will trigger the primary action for that chip (e.g. indicate the chip’s selection)
- While a given chip is in focus, pressing the “Enter” or “Space” key triggers the main body action, emulating a click on the main body click area.
- When clicked, chips will inherit standard state styling and animation for pressed and selected states

## Accessibility

**ACCESSIBILITY CATEGORY**

- Users should be provided a clear description of the purpose of the chip interaction
  - ex: Chip lists and groups should have an associated label describing the expected interaction and the purpose of the group
- Users should be able to easily navigate through groups of chips
- The labels used on chips should be concise and easy to understand
- All chips should meet WCAG AA contrast requirements at a minumum
  - Chip contrast may need to be "fine tuned" depending on the background
  - Chip contrast must meet AA contrast compliance under all states except the transient “pressed” state

## Responsive Design

**LAYOUT**

- Chips are optimized for responsive design and may be used in the place of radio buttons, check boxes and other selection or input scenarios that require a large amount of space.
- Chip groups can wrap individual chips to a second line with far less padding than what is required for radio buttons, check boxes and standard text input.
- In some cases where vertical space is highly constrained, chip groups may be presented within a horizontally scrollable container
