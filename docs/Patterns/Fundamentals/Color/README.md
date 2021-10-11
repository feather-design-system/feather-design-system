---
title: "Color"
lang: en-US
---

# Color

Color is one of the most important elements in any design system. Color is used across the Feather design system to enhance the user experience through careful selection of hue, luminance and saturation attributes to provide “visual scaffolding” — guiding users through the application interface.

<hr/>

## Components

## Package

All color styles are available in the [`@featherds/styles`](/Packages/Styles/) package. See the [theme guide](/Packages/Styles/Components/Colors.html) for live examples and code examples.

## Usage

Colors have been selected to provide two different “modes” for the look and feel of the user interface. The default mode is a “light mode” where most of the surfaces are neutral shades of grey or are completely white. This creates the feeling of a clean and sterile environment where color is carefully chosen to accentuate high priority visual elements. The contrast ratios in this mode have been chosen to ensure WCAG AA compliance which is a contrast ratio of 4.5:1 between foreground and background colors. The secondary mode is a “dark mode” that changes the UI to make most of the surfaces and backgrounds very dark. This gives the UI a “high-tech, futuristic” feel and brings the contrast ratios in-line with WCAG AAA guidelines, ensuring a 7:1 contrast ratio between foreground and ackground elements. Switching to “dark mode” also provides an ergonomic benefit by reducing eye-strain thanks to the lower overall light output and can even reduce power consumption on hardware with OLED or “local dimming” enabled displays.

### Primary Colors

Primary colors are based on the brand-specific color for their respective applications. Primary colors are used to indicate high-priority elements on the screen such as interactive elements or high-value data points. A few examples of components that may use the primary colors are:

- Floating action buttons
- Selection controls, like sliders and switches
- Highlighting selected text
- Progress bars
- links and headlines

## Accessibility

All colors will meet a minimum of AA contrast ratio as set forth by WCAG where appropriate. This means that the contrast ratio between foreground information and background elements is a minimum of 4.5:1. Usage of the “dark mode” palettes will result in a contrast ratio that meets WCAG AAA guidelines which require a 7:1 contrast ratio between background and foreground elements. It should be noted that the foreground elements rely on neutral values with opacity adjustments to denote various levels of hierarchy. These opacities must be applied correctly to ensure contrast requirements are met.

> Disabled Styling
>
> According to WCAG Minimum Contrast requirement SC 1.4.3 controls that are part of an inactive component have no contrast requirement.
>
> It is recommended that an ARIA-status of ‘disabled’ is added to the control. Disabled styling was also raised with the WCAG who responded “If we force stronger contrast on the disabled elements, it will be difficult for all sighted people to distinguish between what is active (and what is disabled)” although they recognised that low vision users may want to see the disabled items clearly so it was not a ‘one-size fits all’ solution.
