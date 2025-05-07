import { FeatherIcon } from "@featherds/icon";
import { MenuListEntry } from "@featherds/menu";
import Documentation from "@featherds/icon/communication/Documentation";
import Location from "@featherds/icon/action/Location";
import Security from "@featherds/icon/hardware/Security";
import CloudUpload from "@featherds/icon/action/CloudUpload";
import SupportCenter from "@featherds/icon/action/SupportCenter";
import Reporting from "@featherds/icon/action/Reporting";
import ApiEndpoints from "@featherds/icon/network/ApiEndpoints";
import ViewDetails from "@featherds/icon/action/ViewDetails";
import ViewCode from "@featherds/icon/network/ViewCode";
import { computed } from "vue";

export const accountMenu: MenuListEntry[] = [
  {
    id: "add-location",
    type: "item",
    title: "Add Location",
    href: "/add-location",
    target: "_account",
    icon: Location as typeof FeatherIcon,
  },
  {
    id: "my-security-office",
    type: "item",
    title: "My Security Office",
    href: "/security-office",
    target: "_account",
    icon: Security as typeof FeatherIcon,
  },
];

export const docsMenu: MenuListEntry[] = [
  {
    id: "docs-header",
    type: "header",
    title: "ACME Widget",
  },
  {
    id: "docs",
    type: "item",
    title: "Documentation",
    href: "/docs",
    target: "_docs",
    icon: Documentation as typeof FeatherIcon,
  },
  {
    id: "sep1",
    type: "separator",
  },
  {
    id: "getting-started",
    type: "item",
    title: "Getting Started w/ Widget",
    href: "/docs/getting-started",
    target: "_docs",
    icon: Documentation as typeof FeatherIcon,
  },
  {
    id: "installation",
    type: "item",
    title: "Widget Installation",
    href: "/docs/installation",
    target: "_docs",
    icon: CloudUpload as typeof FeatherIcon,
  },
  {
    id: "usage",
    type: "item",
    title: "Usage",
    href: "/docs/usage",
    target: "_docs",
    icon: Documentation as typeof FeatherIcon,
  },
  {
    id: "sep2",
    type: "separator",
  },
  {
    id: "api-reference",
    type: "item",
    title: "API Reference",
    href: "/docs/api-reference",
    target: "_docs",
    icon: ApiEndpoints as typeof FeatherIcon,
  },
  {
    id: "reporting",
    type: "item",
    title: "Reporting",
    href: "/docs/reporting",
    target: "_docs",
    icon: Reporting as typeof FeatherIcon,
  },
  {
    id: "sep3",
    type: "separator",
  },
  {
    id: "support",
    type: "item",
    title: "Support",
    href: "/docs/support",
    target: "_docs",
    icon: SupportCenter as typeof FeatherIcon,
  },
  {
    id: "sep4",
    type: "separator",
  },
  {
    id: "about-us",
    type: "item",
    title: "About Us",
    href: "/docs/about-us",
    target: "_docs",
    icon: ViewDetails as typeof FeatherIcon,
  },
];

export const featherdocsMenu = computed((): MenuListEntry[] => {
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

