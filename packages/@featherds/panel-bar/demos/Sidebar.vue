<template>
  <FeatherAppBar :labels="labels" :content="'main'"></FeatherAppBar>
  <FeatherDock :expandedWidth="'20rem'" id="dock">
    <template #docked>
      <FeatherPanelBar
        :id="'sidebar'"
        :items="panels"
        mode="Panel"
        title="Feather Documentation"
        header
        footer
      >
      </FeatherPanelBar>
    </template>
  </FeatherDock>
  <main>
    <div id="content1" class="content-block">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget velit
      ac magna efficitur tincidunt. Sed vehicula tortor vitae diam fermentum,
      vel laoreet eros sollicitudin. Curabitur in sagittis nunc, at fringilla
      orci.
    </div>
    <div id="content2" class="content-block">
      Praesent gravida magna at justo pellentesque, vel lacinia nulla vulputate.
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
      cubilia curae; Donec auctor felis vel eros feugiat commodo.
    </div>
    <div id="content3" class="content-block">
      Suspendisse potenti. Fusce semper magna id lorem convallis, in ultrices
      est aliquam. Nullam scelerisque turpis vel mi finibus, in euismod tellus
      tempor. Aenean dignissim odio at lacus venenatis, id ullamcorper magna
      volutpat.
    </div>
    <div id="content4" class="content-block">
      Cras auctor magna sed dui cursus, at efficitur augue hendrerit. Quisque
      rutrum feugiat dolor, vel consectetur magna facilisis sit amet.
      Pellentesque volutpat lectus in neque mattis dictum.
    </div>
    <div id="content5" class="content-block">
      Aliquam erat volutpat. Sed ac ligula nec nunc efficitur facilisis. Sed
      euismod ligula ut tincidunt fringilla. Nulla facilisi. In hac habitasse
      platea dictumst. Suspendisse potenti.
    </div>
    <div id="content6" class="content-block">
      <p>This could be a serious alert, but it is not.</p>
      <p>
        You can style these scroll targets with a class name. This is a red
        alert animation.
      </p>
      <p>
        You specify the scollTarget in your Panel object. You define the
        animation in your CSS via the scrollTargetClass. The scrollTargetClass
        defaults to .menu-highlight defined in FeatherPanelBarMenu.vue.
      </p>
    </div>
    <div id="content7" class="content-block">
      Phasellus vel risus semper, ultrices tortor at, sodales magna. Sed dapibus
      arcu sed velit hendrerit, nec tempor massa congue. Integer vulputate
      consectetur lacus, quis cursus sapien luctus eu.
    </div>
    <div id="content8" class="content-block">
      Debitis assumenda quidem voluptates possimus iste atque similique, libero
      dolorum? Omnis libero modi fugit, recusandae eligendi laboriosam ea neque
      dolore vero in doloribus optio minus iusto et veritatis nihil placeat
      maxime ex nam assumenda.
    </div>
    <div id="content9" class="content-block">
      Aliquam erat volutpat. Sed ac ligula nec nunc efficitur facilisis. Sed
      euismod ligula ut tincidunt fringilla. Nulla facilisi. In hac habitasse
      platea dictumst. Suspendisse potenti.
    </div>
    <div id="content10" class="content-block">
      Aliquam erat volutpat. Sed ac ligula nec nunc efficitur facilisis. Sed
      euismod ligula ut tincidunt fringilla. Nulla facilisi. In hac habitasse
      platea dictumst. Suspendisse potenti.
    </div>
    <div id="content11" class="content-block">
      Donec ac ligula nec nunc efficitur facilisis. Sed euismod ligula ut
      tincidunt fringilla. Nulla facilisi. In hac habitasse platea dictumst.
      Suspendisse potenti.
    </div>
    <div id="content12" class="content-block">
      Nulla facilisi. In hac habitasse platea dictumst. Suspendisse potenti.
      Donec ac ligula nec nunc efficitur facilisis. Sed euismod ligula ut
      tincidunt fringilla.
    </div>
    <div id="content13" class="content-block">
      Sed ac ligula nec nunc efficitur facilisis. Donec ac ligula nec nunc
      efficitur facilisis. Sed euismod ligula ut tincidunt fringilla. Nulla
      facilisi. In hac habitasse platea dictumst. Suspendisse potenti.
    </div>
    <div id="content14" class="content-block">
      ACME Ship-It wil be offline this weekend for maintenance. Please plan
      accordingly.
    </div>
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import { computed, markRaw } from "vue";
import { FeatherAppBar } from "@featherds/app-bar";
import { FeatherPanelBar, Panel } from "@featherds/panel-bar";
import { FeatherMenuList, MenuListEntry } from "@featherds/menu";
import { FeatherDock } from "@featherds/dock";
import { FeatherIcon } from "@featherds/icon";
import Documentation from "@featherds/icon/communication/Documentation";
import ViewCode from "@featherds/icon/network/ViewCode";
import PlayCircle from "@featherds/icon/action/PlayCircle";
import Warning from "@featherds/icon/notification/Warning";

const labels = { skip: "Skip to main content" };

const demoMenuList = computed((): MenuListEntry[] => {
  return [
    {
      id: "101",
      type: "header",
      title: "Demos",
    },
    {
      id: "102",
      type: "item",
      title: "Panel Bar",
      href: "https://feather.nanthealth.com/demos#/PanelBar-Demo",
      target: "_demos",
      icon: PlayCircle as typeof FeatherIcon,
    },
    {
      id: "103",
      type: "item",
      title: "Panel List",
      href: "https://feather.nanthealth.com/demos#/List-Demo",
      target: "_demos",
      icon: PlayCircle as typeof FeatherIcon,
    },
    {
      id: "104",
      type: "item",
      title: "attention",
      scrollTarget: "#content6",
      scrollTargetClass: "locally-defined-red-alert",
    },
    {
      id: "106",
      type: "separator",
    },
  ];
});
const docsMenuList = computed((): MenuListEntry[] => {
  return [
    {
      id: "1",
      type: "header",
      title: "Guides",
    },
    {
      id: "2",
      type: "item",
      title: "Getting Started",
      href: "https://feather.nanthealth.com/Guides/GettingStarted/",
      target: "_docs",
    },
    {
      id: "3",
      type: "item",
      title: "App Layout",
      href: "https://feather.nanthealth.com/Guides/AppLayout/",
      target: "_docs",
      disabled: true,
    },
    {
      id: "4",
      type: "separator",
    },
    {
      id: "5",
      type: "header",
      title: "Foundation",
    },
    {
      id: "6",
      type: "item",
      title: "Design Philosophy",
      href: "https://feather.nanthealth.com/Foundation/Story/Philosophy/",
      target: "_docs",
    },
    {
      id: "7",
      type: "separator",
    },
    {
      id: "8",
      type: "header",
      title: "Components",
    },
    {
      id: "9",
      type: "item",
      title: "Feather List",
      href: "https://feather.nanthealth.com/Components/List/",
      target: "_docs",
    },
    {
      id: "10",
      type: "item",
      title: "Feather Icons",
      href: "https://feather.nanthealth.com/Components/Icon/",
      target: "_docs",
    },
    {
      id: "11",
      type: "separator",
    },
    {
      id: "12",
      type: "header",
      title: "Source Code",
    },
    {
      id: "13",
      type: "item",
      title: "GitHub",
      href: "https://github.com/feather-design-system/feather-design-system",
      target: "_docs",
      icon: ViewCode as typeof FeatherIcon,
    },
    {
      id: "14",
      type: "separator",
    },
  ];
});

const panels = computed((): Panel[] => {
  return [
    {
      id: "warning",
      title: "Scheduled Maintenance",
      icon: Warning as typeof FeatherIcon,
      content:
        "The system will be down this weekend from 5pm Friday to 11pm Sunday for maintenance. Please plan accordingly.",
      component: markRaw(FeatherMenuList),
      componentProps: {
        items: [
          {
            id: "500",
            type: "item",
            title: "See more",
            // onClick: () => handleInternalLink("#content5", "highlight"),
            onClick: () => console.log("Define your own fn here"),
            scrollTarget: "#content14",
          },
        ],
      },
    },
    {
      id: "docs",
      title: "Feather Documentation",
      icon: Documentation as typeof FeatherIcon,
      content:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      component: markRaw(FeatherMenuList),
      componentProps: { items: docsMenuList.value },
    },
    {
      id: "demos",
      title: "Feather Demos",
      icon: PlayCircle as typeof FeatherIcon,
      component: markRaw(FeatherMenuList),
      componentProps: { items: demoMenuList.value },
      content:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
});
</script>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/themes/utils" as utils;
@use "@featherds/styles/mixins/elevation" as elev;
main {
  display: grid;
  grid-template-columns: repeat(2, 1fr) 2fr;
  gap: 1rem;
  .content-block {
    background-color: var(vars.$elevation-background-24);
    padding: 0.5rem;
    border-radius: 0.25rem;
    scroll-margin-block: 80px;
  }
  .content-block.locally-defined-red-alert {
    animation: locally-defined-red-alert-fade 3s ease-out;
  }
  @keyframes locally-defined-red-alert-fade {
    20% {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      background-color: utils.alpha(vars.$minor, 0.6);
    }
    40% {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      background-color: utils.alpha(vars.$error, 0.6);
    }
    60% {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      background-color: utils.alpha(vars.$major, 0.6);
    }
    80% {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      background-color: utils.alpha(vars.$error, 0.6);
    }
  }
}
</style>
