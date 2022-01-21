---
title: "Color"
lang: en-US
pre: "styles"
description: "Used to establish tone, identity and impact in a beautiful and accessible manner."
tags: ["Foundation", "Color"]
menu: foundation
---

## Overview

Product colors are selected to adhere to the Feather DS principles. Aiming to comply with AA standards at a minimum, we aim to choose user-focused and meaningful colors that will help pinpoint exactly what people need to see.

## Theming

Extended palettes help to define our color theming for Feather DS. For the example below, two colors were chosen from a brand palette and expanded to include values from 1000 to 50. This ensures consistency from dark to light mode, as well as adhering to AA contrast standards.

<ClientOnly>
<picture>
  <source :srcset="$withBase('/assets/foundation/styles/SkyBlueMobile.png')"
              media="(max-width: 32.5rem)">
  <img :src="$withBase('/assets/foundation/styles/SkyBlue.png')" alt="Image of Sky blue colors" />
</picture>

<figure>
    <picture>
      <source :srcset="$withBase('/assets/foundation/styles/DarkBlueMobile.png')"
                  media="(max-width: 32.5rem)">
      <img :src="$withBase('/assets/foundation/styles/DarkBlue.png')" alt="Image of Dark blue colors" />
    </picture>
    <figcaption>Toggle between dark and light mode to view contrast shifts between all values.</figcaption>
</figure>

</ClientOnly>

Theming will consist of 4 brand centric colors - primary, primary variant, secondary and secondary variant. These colors are derived from the extended palette. Colors are also specified for background, surface, on color, on background, and on surface.

  <ClientOnly>
<picture>

<source :srcset="$withBase('/assets/foundation/styles/DarkModeMobile.png')"
            media="(max-width: 32.5rem)">
<img :src="$withBase('/assets/foundation/styles/DarkMode.png')" alt="image of dark mode colors" />
</picture>

<picture>

<source :srcset="$withBase('/assets/foundation/styles/LightModeMobile.png')"
            media="(max-width: 32.5rem)">
<img :src="$withBase('/assets/foundation/styles/LightMode.png')" alt="image of light mode colors" />
</picture>
</ClientOnly>

## Package

To get started using our theme, import `@featherds/styles` directly. For more information on getting started, visit our guides for [theming section](../../../Components/Themes/).
