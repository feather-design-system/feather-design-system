import { MenuListEntry } from "@featherds/menu";
import { FeatherIcon } from "@featherds/icon";
import Security from "@featherds/icon/hardware/Security";
import Location from "@featherds/icon/action/Location";
import LogOut from "@featherds/icon/action/LogOut";
import Settings from "@featherds/icon/action/Settings";
import Help from "@featherds/icon/action/Help";
import FeedbackAlt from "@featherds/icon/action/FeedbackAlt";
import ApiConfig from "@featherds/icon/network/ApiConfig";

export const accountMenu: MenuListEntry[] = [
  {
    id: "account-header",
    type: "header",
    title: "My Profile",
  },
  {
    id: "edit-location",
    type: "item",
    title: "Edit Location",
    href: "/edit-location",
    target: "_account",
    icon: Location as typeof FeatherIcon,
  },
  {
    id: "my-security-officer",
    type: "item",
    title: "My Security Officer",
    href: "/security-officer",
    target: "_account",
    icon: Security as typeof FeatherIcon,
  },
  {
    id: "separator",
    type: "separator",
  },
  {
    id: "logout",
    type: "item",
    title: "Logout",
    href: "/logout",
    target: "_account",
    icon: LogOut as typeof FeatherIcon,
  },
];

export const helpMenu: MenuListEntry[] = [
  {
    id: "help-header",
    type: "header",
    title: "Help Center",
  },
  {
    id: "help",
    type: "item",
    title: "Help",
    href: "/help",
    target: "_blank",
    icon: Help as typeof FeatherIcon,
  },
  {
    id: "feedback",
    type: "item",
    title: "Feedback",
    href: "/feedback",
    target: "_blank",
    icon: FeedbackAlt as typeof FeatherIcon,
  },
];
export const settingsMenu: MenuListEntry[] = [
  {
    id: "settings-header",
    type: "header",
    title: "Local Settings",
  },
  {
    id: "settings",
    type: "item",
    title: "Settings",
    href: "/settings",
    target: "_settings",
    icon: Settings as typeof FeatherIcon,
  },
  {
    id: "api-config",
    type: "item",
    title: "API Config",
    href: "/api-config",
    target: "_settings",
    icon: ApiConfig as typeof FeatherIcon,
  },
];
