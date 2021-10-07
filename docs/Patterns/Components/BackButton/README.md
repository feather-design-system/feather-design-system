---
title: "Back Button"
lang: en-US
---

# Back Button

This is a generic control that will allow the user to go back to a previous page. This is not intended to be a breadcrumb style of navigation, simply provides a mechanism to return to a logical position within the transaction.

## Component

<ComponentCard component="FeatherBackButton" package="BackButton" />

## Back Button Design

The back button has been designed to provide a persistent control for reverse navigation. The button appears as an outlined button in it’s default, active state and transforms into a solid contained button with elevation when the user hovers over it to elevate it’s priority in the layout.

## Back Button Anatomy

The back button consists of the following components: a container, an icon, and the label text. The label text is hidden until the user hovers over the back button.

![Back Button Anatomy](./assets/Back_Button_Anatomy.png)

## Layout

The back button is composed of the following artifacts

- on page button
- descriptive fly out

This is a simple white icon button in a box with edges rounded to form a circle (36x36px)

The descriptive flyout tell the user where will be taken back to.

## Behavior

- The control should only appear on the page if it is available so does not require a disable state
- When the user mouses over the control the style will change to invert the colour scheme
- If the user long hovers over the button it will expand elegantly to show associated text
  - long hover time approx 500ms (customisable)
  - animation to open 250ms
  - The time before fly out occurs should be such that a user can move the mouse around the screen, including across the top of the control without it flashing on and off the screen. SImilarly a keyboard user should be able to tab through it without the flyout flashing onto the screen
- the text on the button should read as ‘Back to ‘ followed by the page tile of the page they will be taken to (e.g. ‘Back to Patient Search’)
  - Where the page title is not suitable then
- The fly out should be just wide enough to contain the required text plus padding
- When the mouse is removed from the button the flyout should fly back in (slide left) and the button should revert to its default state
  - the animation isn’t quite right in the prototype, the button should retain its hover style until the flyout has fully collapsed. It should then fade back to its default state
- Clicking on the button will trigger the navigation
  - If the page contains unsubmitted input then the user should be warned that they will lose data

## Accessibility

- Appears as a button to a screen reader
- The fly out contents should be read out so that the user knows where they will be takenWhen the user mouses over the control the style will change to invert the colour scheme

## Responsive Behavior

- for mobile devices a long press should display the flyout
