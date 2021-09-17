# FeatherMegaMenu

Behaves like a dropdown except menu takes up full width of screen. Typically for use in app-bars and headers

## Props

 - `name` - `String` - `required` - this name is used to populate the large title to the LHS of the mega menu when it is opened.
 - `closeText` - `String` - `required` - text for the close icon.
 - `role` - `String` - determines the role of the content. If there is advanced controls such as `input` can be better to use role `region`. Default `menu`
## Data

 - `open` - `Boolean` - if `true` menu is open
 - `focusEl` - `Object` - the when the menu is opened, this stores a reference to the button that opened it, so focus can be returned when the menu is closed

## Methods

 - `closeMenu` - toggles the menu open when the menu button is clicked.
 - `afterEnter` - after slide down focuses the first anchor.
 - `outsideElementClicked` - takes in an event, if the events target is not within our component set `open` to `false`.
 - `menuButtonClicked` - toggles the menu open or closed.
 - `menuLinkClicked` - closes the menu when a valid link is clicked.
## Events

 - `opened` triggered when menu is opened
 - `closed` triggered when menu is closed

## Slots

 - `default` - content that is put inside the menu, to the right of the menu name. This has a scoped property of open, which will be true when the menu is open and false otherwise.
  - `button` - The button for opening the menu. This is a scoped slot and is passed two scope params - `open` and `clicked`. `open` is a boolean denoting current state. `clicked` is a method to call that will toggle the state

## Localization

*none*

## Example

```html
<mega-menu name="App Workflows" close-text="Close Workflows Menu">
  <template slot="button" slot-scope="slotProps">
    <button @click="slotProps.clicked" :aria-selected="slotProps.open">
      Workflows
    </button>
  </template>
  <menu-flow-layout :open="open">
    <menu-group header="my plans">
      <menu-item>something11111</menu-item>
      <menu-item>something even longer</menu-item>
      <menu-item>something even longers</menu-item>
    </menu-group>
  </menu-flow-layout>
</mega-menu>
```
