---
title: "Principles"
lang: en-US
pre: "our story"
description: "Feather DS has been optimized for accessibility and usability to providing an engaging, immersive experience for all users."
tags: ["Foundation", "Principles"]
menu: foundation
---

<style>
  .banner-image{
    max-width:100%;
  }
  .img-container{
    display:flex;
    margin-bottom:32px;
    height:144px;
  }
  .img-container.img-right{
    flex-direction: row-reverse;
  }
  .img-container svg{
    flex:none;
    border-right:2px solid var(--feather-primary);
  }
  .img-container.img-right svg{
    border-left:2px solid var(--feather-primary);
    border-right:none;
  }
  .img-container .img-text{
    flex:1;
    display:flex;
    align-items:center;
    color:var(--feather-primary);
  }
  .img-container .img-text blockquote{
    border:none;
    color:var(--feather-primary);
  }

  @media (max-width:820px){
    .banner-image{
      display:none;
    }
    .img-container{
      justify-content:center;
    }
    .img-container .img-text{
      display:none;
    }
    .img-container svg{
      border:none;
    }
    .img-container.img-right svg{
      border:none;
    }
  }

</style>

<PrinciplesBanner class="banner-image" />

## Simplicity

Feather DS is made up of many different components, each one features a unique set of requirements base don real-world cases. When building an application, a designer should be focused on optimizing usability and reducing cognitive load.

<div class="img-container">
<PrinciplesSimplicity />
<div class="img-text">
<blockquote>The best way to ensure that users can move quickly through the interface is through the reduction of visual clutter and the refinement to only what is essential to meet user needs. </blockquote>
</div>
</div>

Components are designed to leverage certain mechanisms in human perception to create structure from the content - utilizing common alignment, grouping, directionality and many other design considerations tp ensure that users are able to interpret and interact with information without having to figure out which interface elements are important and which are not.

## Consistency

The Feather Design system was designed to provide consistent experience across application screens, platforms, devices, and industries. The Visual Design Team created a flexible color palette, allowing each product to use the same visual hierarchy regardless of the product identity. This allows product teams to build and implement complex workflows with confidence, knowing that the components and styles have been optimized and streamlined.

<div class="img-container img-right">
<PrinciplesConsistency />
<div class="img-text">
<blockquote>Consistency is a key aspect of UX. As brands and products evolve, user needs are always prioritized, ensuring that users have a familiar and intuitive experience. </blockquote>
</div>
</div>

As organizations grow, adding new people and new products, brand identity tends to become more complex, evolving to encapsulate all the new viewpoints and objectives. Feather DS was designed with “theming” in mind to address this need. Themes refer to variable design attributes that components can inherit such as color, shape and elevation. The Feather DS themes can be managed in one location and updated across the entire design system. Whether new brand elements are being created or existing brand elements are being updated, the UI will always reflect the latest brand identity.

## Accessibility

Feather DS is built on the idea that a design system centered around accessibility provides the best possible experience to the widest range of users.

<div class="img-container">
<PrinciplesAccessibility />
<div class="img-text">
<blockquote>Every component in the design system is carefully tested and reviewed to ensure that they may be used with keyboard navigation and assistive technology.</blockquote>
</div>
</div>

As organizations grow, adding new people and new products, brand identity tends to become more complex, evolving to encapsulate all the new viewpoints and objectives. Feather DS was designed with “theming” in mind to address this need. Themes refer to variable design attributes that components can inherit such as color, shape and elevation. The Feather DS themes can be managed in one location and updated across the entire design system. Whether new brand elements are being created or existing brand elements are being updated, the UI will always reflect the latest brand identity.
