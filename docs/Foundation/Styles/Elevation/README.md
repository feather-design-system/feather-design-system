---
title: "Elevation"
lang: en-US
pre: "styles"
description: "Used to define the distance between any two elements on the z-axis."
tags: ["Foundation", "Elevation"]
menu: foundation
---

## Overview

Elevation is a method of establishing visual hierarchy in a layout using the perception of depth. The Feather Design system utilizes Google Material Design across components to show relationships based on the shadows certain objects cast on other objects and their environment.

## Creating Elevation

Elevation is simulated by the generation of a drop-shadow on component surfaces. The drop shadow is measured as the distance from the background plane to the component surface and is depicted in display pixels, or “dp.” The image below shows 2 examples of component elevations and their corresponding shadows. Each shadow is made up of three distinct elements: a key shadow, a mid shadow and an ambient shadow. These shadows have been carefully created to mimic the soft shadows created from a physical light source as if it was shining down on the component from slightly above the top of the surface.

<ClientOnly>
<picture>

<source :srcset="$withBase('/assets/foundation/elevation/LightModeMobile.png')"
            media="(max-width: 32.5rem)">
<img :src="$withBase('/assets/foundation/elevation/LightMode.png')" alt="Image of elevation progression in light mode" />
</picture>

</ClientOnly>

### Elevations in Dark Mode

Elevation in dark most is calculated differently due to the low contrast of a drop shadow against a dark gray or black background used in dark mode. The surfaces inherit both the application primary color as well as a tint that is meant to emulate the surface of the component interacting with the light being cast onto it. These surface values may be generated procedurally or may be hard-coded depending on your needs.

<ClientOnly>
<picture>

<source :srcset="$withBase('/assets/foundation/elevation/DarkModeMobile.png')"
            media="(max-width: 32.5rem)">
<img :src="$withBase('/assets/foundation/elevation/DarkMode.png')" alt="Image of elevation progression in dark mode" />
</picture>

</ClientOnly>

## Relative Elevation

All objects in the Feather Design System have a resting elevation. Some objects have an active elevation. An active elevation refers to the change in elevation an object undergoes based on a user interaction. Active elevation is usually the result of a state change like a hover state. Some components and surfaces may appear over top of others. This has an affect on the shadows that certain elements cast. The diagram below depicts the elevation for all components in the Feather Design System.

<ClientOnly>

<img :src="$withBase('/assets/foundation/elevation/Relative.png')" alt="Relative elevation layers" />

</ClientOnly>
