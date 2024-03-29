---
title: "Atomic Design"
lang: en-US
pre: "our story"
description: "Atomic design draws inspiration from physics and chemistry to provide structure that mirrors the structure of the universe we all live in and experience."
tags: ["Foundation", "Atomic Design"]
menu: foundation
---

Feather DS is comprised of many layers of design and technology. As the design and engineering teams started building Feather, it became evident that the system’s scale would require a way to design and manage the smallest details while simultaneously considering component design and usage in the context of the entire system.

<style>
  .figures{
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, 14.8125rem);
    justify-content: center;
  }
</style>

<div class="figures">
<figure >

![Forces image](./images/FORCES@2x.png)

<figcaption>

### Forces

**Styles**: The basic visual styling of all elements

</figcaption>

</figure>

<figure>

![Atoms image](./images/ATOMS@2x.png)

<figcaption>

### Atoms

**Elements**: The basic building blocks of components

</figcaption>
</figure>

<figure >

![Molecules image](./images/MOLECULES@2x.png)

<figcaption>

### Molecules

**Components**: The basic functional unit of Feather DS

</figcaption>
</figure></div>

## Organizing Feather

The organization of Feather elements, components and patterns follows the concept of “Atomic Design.” This isn’t a new concept, as many design systems are built on a similar model. Feather employs the atomic design concept of organization to ensure that all parts are easy to analyze, organize and discuss. A large part of what makes Feather useful is the thought put into the harmony of the entire system.

## Atomic Design Units

At the most basic level of the universe, fundamental forces exist that dictate the organization and behavior of all structures. Forces like gravity and electromagnetism are analogous to styles and layout in Feather, since changing any of the parameters of these two fundamental theme components can create a huge impact to the entire system.

The next level up from the forces is the atom, the basic building block of all matter. Atoms are equivalent to elements in the Feather Design System, representing things like icons, individual blocks of type and geometry. These are the starting point for most component designs and can be combined to create more complex functional units.

Combining atoms creates molecules, which are represented as components in Feather DS. All components were designed using the fundamentals (styles) and the elements (atoms) required to satisfy real-world use cases. Components can make use of other components, referred to as "sub-components" to create more complex components.

## Systems

The final level of Feather DS revolves around systems and ecosystems, the organization of many different components to create an interactive experience. Systems are represented by pages and containers or frames, while ecosystems are represented by applications and platforms. Forces all act on atoms, which combine to form molecules, leading to development of organisms, eventually ending up coming together as an ecosystem.
